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
import { AppDispatchType, useAppSelector } from "../../app/store";
import { Pack } from "./Pack/Pack";
import { useDispatch } from "react-redux";
import { addPackTC, fetchPacksTC, removePackTC, updatePackTC } from './packsListReducer';
import { cardsPackType, UpdateCardsPackType} from '../../app/appApi';

export const PacksList = React.memo(() => {
  const packs = useAppSelector((state) => state.packsList);
  const user_Id = useAppSelector((state) => state.profile.userData._id);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();

  const [searchValue, setSearchValue] = useState("");
  const [btnColor, setBtnColor] = useState(true);

  const [value, setValue] = useState<number[]>([
    packs.minCardsCount,
    packs.maxCardsCount,
  ]);

  const [page, setPage] = useState(packs.page);
  const rowsPerPage = packs.pageCount;

  const pageChangeHandler = (page: number) => {
    dispatch(fetchPacksTC({ page, min: value[0], max: value[1], packName: searchValue }));
    setPage(page);
  };

  //CRUD CARD PACK

  const addNewPack = (cardPack: cardsPackType) => {
    dispatch(addPackTC(cardPack))
  }
  const removePack = (packId: string) => {
    dispatch(removePackTC(packId))
  }
  const updatePack = (updateData:UpdateCardsPackType) => {
    dispatch(updatePackTC(updateData))
  }

  const addNewPackHandler = () => {
    addNewPack({cardsPack: {name: 'New Pack'}})
  }


  //USE EFFECT

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchPacksTC());
  }, [isLoggedIn, dispatch]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    cardsFilterDebounce(newValue as number[]);
  };

  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - packs.cardPacksTotalCount) : 0;

  //main work of filterBar
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

  const resetHandler = () => {
    setValue([packs.minCardsCount, packs.maxCardsCount]);
    setBtnColor(false);
    setSearchValue("");
    dispatch(fetchPacksTC({}))
  };

  //debounces
  const searchDebounce = useCallback(
    debounce((str: string) => {
      dispatch(fetchPacksTC({packName: str}))
    }, 750),
    []
  );

  const cardsFilterDebounce = useCallback(
    debounce((num: number[]) => {
      dispatch(fetchPacksTC({ page, min: num[0], max: num[1], packName: searchValue }))
    }, 750),
    []
  );

  //search, sort tools
  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
    searchDebounce(e.currentTarget.value.toLowerCase());
  };

  const filterByUser = () => {
    setBtnColor(false);
    dispatch(fetchPacksTC({ page, min: value[0], max: value[1], packName: searchValue, user_id: user_Id }))
  };

  const filterByAll = () => {
    dispatch(fetchPacksTC({ page, min: value[0], max: value[1], packName: searchValue}))
    setBtnColor(true);
  };

  const indexOfLastPage = page * rowsPerPage;
  const indexOfFirstPage = indexOfLastPage - rowsPerPage;
  const currentPosts = packs.cardPacks.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>Packs list</h2>
        <button className={s.wrapper__btn} onClick={addNewPackHandler}>Add new pack</button>
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
                  max: packs.maxCardsCount,
                  min: packs.minCardsCount,
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
                  max: packs.maxCardsCount,
                  min: packs.minCardsCount,
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
                    packId={p._id}
                    userId={p.user_id}
                    createdUserName={p.user_name}
                    packName={p.name}
                    cardsCount={p.cardsCount}
                    lastUpdated={p.updated}
                    mainUserId={user_Id}
                    emptyRows={emptyRows}
                    removePack={removePack}
                    updatePack={updatePack}
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
