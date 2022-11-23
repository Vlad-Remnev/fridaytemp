import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import s from "./PacksList.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Slider, TextField } from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import debounce from "lodash.debounce";
import PaginateComponent from "../../common/components/PaginateComponent/PaginateComponent";
import { AppThunkType, useAppSelector } from "../../app/store";
import { Pack } from "./Pack/Pack";
import { useDispatch } from "react-redux";
import { fetchPacksTC } from "./packsListReducer";

export const PacksList = React.memo(() => {
  const packs = useAppSelector((state) => state.packsList);
  const user_Id = useAppSelector((state) => state.profile.userData._id);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppThunkType>();

  const [searchValue, setSearchValue] = useState("");
  const [btnColor, setBtnColor] = useState(true);

  //заглушка, будет приходить с сервера
  const cards: number[] = packs.cardPacks
    .map((el) => el.cardsCount)
    .sort((a, b) => a - b);

  const [value, setValue] = useState<number[]>([
    cards[0],
    cards[cards.length - 1],
  ]);
  const [page, setPage] = useState(packs.page);
  const rowsPerPage = packs.pageCount;

  const pageChangeHandler = (page: number) => {
    dispatch(fetchPacksTC({ page }));
    setPage(page);
  };
  console.log(page);
  console.log(rowsPerPage);

  //USE EFFECT

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchPacksTC());
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    cardsFilterDebounce(newValue as number[]);
  };

  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - packs.cardPacksTotalCount) : 0;
  //main work of filterBar
  console.log(emptyRows);
  const setRangeOne = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value[0] <= value[1]) {
      setValue([+e.currentTarget.value, value[1]]);
      cardsFilterDebounce([+e.currentTarget.value, value[1]]);
    } else if (value[0] > 100) {
      setValue([100, value[1]]);
    } else if (value[0] < 0) {
      setValue([0, value[1]]);
    } else {
      setValue([value[1], value[1]]);
    }
  };

  const setRangeTwo = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value[1] >= value[0]) {
      setValue([value[0], +e.currentTarget.value]);
      cardsFilterDebounce([value[0], +e.currentTarget.value]);
    } else if (value[1] > 100) {
      setValue([value[0], 100]);
    } else if (value[0] < 0) {
      setValue([value[0], 0]);
    } else {
      setValue([value[0], value[0]]);
    }
  };

  const resetHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //setRows(initialState);
    setValue([cards[0], cards[cards.length - 1]]);
    setBtnColor(false);
    setSearchValue("");
  };

  //debounces
  const searchDebounce = useCallback(
    debounce((str: string) => {
      const newArr = packs.cardPacks.filter((el) =>
        el.name.toLowerCase().includes(str)
      );
      //setRows(newArr);
    }, 750),
    []
  );

  const cardsFilterDebounce = useCallback(
    debounce((num: number[]) => {
      const newArr = packs.cardPacks.filter((el) =>
        cards
          .filter((el) => el >= num[0] && el <= num[1])
          .includes(el.cardsCount)
      );
      //setRows(newArr);
    }, 500),
    []
  );

  //search, sort tools
  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.currentTarget.value.toLowerCase().trim());
    searchDebounce(e.currentTarget.value);
  };

  const filterByUser = () => {
    const newArr = packs.cardPacks.filter((el) => el.user_id === "main");
    //setRows(newArr);
    setBtnColor(false);
  };

  const filterByAll = () => {
    //setRows(initialState);
    setBtnColor(true);
  };

  const indexOfLastPage = page * rowsPerPage;
  const indexOfFirstPage = indexOfLastPage - rowsPerPage;
  const currentPosts = packs.cardPacks.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>Packs list</h2>
        <button className={s.wrapper__btn}>Add new pack</button>
      </div>
      <div className={s.header}>
        <div className={s.search}>
          <div className={s.title}>Search</div>
          <TextField
            variant="outlined"
            sx={{ width: "415px" }}
            placeholder="Type some text"
            value={searchValue}
            onChange={searchHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={s.packRender}>
          <div className={s.title}>Show packs cards</div>
          <div className={s.btnGroup}>
            <button
              className={btnColor ? s.btnOn : s.btnOff}
              onClick={filterByUser}
            >
              My
            </button>
            <button
              className={btnColor ? s.btnOff : s.btnOn}
              onClick={filterByAll}
            >
              All
            </button>
          </div>
        </div>
        <div className={s.cardsRender}>
          <div className={s.title}>Number of cards</div>
          <div className={s.range}>
            <TextField
              sx={{ maxWidth: "70px" }}
              type="number"
              value={value[0]}
              onChange={setRangeOne}
              InputProps={{
                inputProps: {
                  max: cards[cards.length - 1],
                  min: cards[0],
                },
              }}
            />
            <div className={s.slider}>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                color="primary"
                disableSwap
              />
            </div>
            <TextField
              sx={{ maxWidth: "70px" }}
              type="number"
              value={value[1]}
              onChange={setRangeTwo}
              InputProps={{
                inputProps: {
                  max: cards[cards.length - 1],
                  min: cards[0],
                },
              }}
            />
          </div>
        </div>
        <div className={s.reset}>
          <button className={s.btn} onClick={resetHandler}>
            <FilterAltOffIcon />
          </button>
        </div>
      </div>
      <TableContainer className={s.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={s.mainRow}>
              <TableCell className={s.cell} align="center">
                Name
              </TableCell>
              <TableCell className={s.cell} align="center">
                Cards
              </TableCell>
              <TableCell className={s.cell} align="center">
                Last Updated
              </TableCell>
              <TableCell className={s.cell} align="center">
                Created By
              </TableCell>
              <TableCell className={s.cell} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.cardPacks.map((p) => {
              return (
                <Pack
                  key={p._id}
                  userId={p.user_id}
                  createdUserName={p.user_name}
                  packName={p.name}
                  cardsCount={p.cardsCount}
                  lastUpdated={p.updated}
                  mainUserId={user_Id}
                  emptyRows={emptyRows}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={s.pagination}>
        <PaginateComponent
          page={page}
          setPage={pageChangeHandler}
          count={Math.ceil(packs.cardPacksTotalCount / rowsPerPage)}
        />
      </div>
    </div>
  );
});
