import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import s from "./PacksList.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import debounce from "lodash.debounce";
import PaginateComponent from "../../common/components/PaginateComponent/PaginateComponent";
import {AppDispatchType, useAppSelector} from "../../app/store";
import {Pack} from "./Pack/Pack";
import {useDispatch} from "react-redux";
import {fetchPacksTC, isUserPacksAC, removePackTC, updatePackTC} from './packsListReducer';
import {UpdateCardsPackType} from '../../app/appApi';
import {AddModal} from "../../common/components/Modals/PacksModals/AddModal/AddModal";
import {TablePackHeadComponent} from "./TablePackHeadComponent/TablePackHeadComponent";
import {Order} from "./Cards/Cards";
import SearchPackComponent from "./SearchPackComponent/SearchPackComponent";
import MyOrAllPacks from "./MyOrAllPacks/MyOrAllPacks";
import DoubleRange from "./DoubleRange/DoubleRange";

export const PacksList = () => {
  const packs = useAppSelector((state) => state.packsList);
  const page = useAppSelector((state) => state.packsList.page);
  const user_Id = useAppSelector((state) => state.profile.userData._id);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();
  const status = useAppSelector(state => state.app.status)

  const [searchValue, setSearchValue] = useState("");
  const [btnColor, setBtnColor] = useState(false);
  const [value, setValue] = useState<number[]>([packs.minCardsCount, packs.maxCardsCount,]);
  const [rowsPerPage, setRowsPerPage] = useState(packs.pageCount);
  const [order, setOrder] = React.useState<Order>('asc');
  const orderBy = 'name'

  const pageChangeHandler = (pageNum: number) => {
    dispatch(fetchPacksTC({
      page: pageNum,
      min: value[0],
      max: value[1],
      packName: searchValue,
      pageCount: rowsPerPage
    }));
  };

  //CRUD CARD PACK

  // const addNewPack = (cardPack: cardsPackType) => {
  //     dispatch(addPackTC(cardPack))
  // }
  const removePack = (packId: string) => {
    dispatch(removePackTC(packId))
  }
  const updatePack = (updateData: UpdateCardsPackType) => {
    dispatch(updatePackTC(updateData))
  }
  // const addNewPackHandler = () => {
  //     addNewPack({cardsPack: {name: 'New Pack'}})
  // }


  //USE EFFECT

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchPacksTC({pageCount: rowsPerPage}));
  }, [isLoggedIn, dispatch]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    cardsFilterDebounce(newValue as number[]);
  };

  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - packs.cardPacksTotalCount) : 0;

  //main work of filterBar
  const setRangeOne = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const setRangeTwo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      dispatch(fetchPacksTC({page: page, min: num[0], max: num[1], packName: searchValue}))
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
    setBtnColor(true);
    dispatch(isUserPacksAC(true))
    dispatch(fetchPacksTC({
      page: page,
      min: value[0],
      max: value[1],
      packName: searchValue,
      user_id: user_Id,
      pageCount: rowsPerPage
    }))
  };

  const filterByAll = () => {
    setBtnColor(false);
    dispatch(isUserPacksAC(false))
    dispatch(fetchPacksTC({page: page, min: value[0], max: value[1], packName: searchValue, pageCount: rowsPerPage}))
  };

  const itemsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value)
    dispatch(fetchPacksTC({
      page: page,
      min: value[0],
      max: value[1],
      packName: searchValue,
      pageCount: +e.target.value
    }))
  }

  //===========================SORT BY UPDATE=======================
  const handleRequestSort = (
    id: string,
  ) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (isAsc) {
      dispatch(fetchPacksTC( {page: page, min: value[0], max: value[1], pageCount: rowsPerPage, sortPacks: "1updated" }))
    } else {
      dispatch(fetchPacksTC( {page: page, min: value[0], max: value[1], pageCount: rowsPerPage, sortPacks: "0updated" }))
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>Packs list</h2>
        <AddModal page={page} status={status}/>
      </div>
      <div className={s.header}>
        <div className={s.search}>
          <div className={s.title}>Search</div>
          <SearchPackComponent value={searchValue} onChange={searchHandler}/>
        </div>
        <MyOrAllPacks btnColor={btnColor} filterByAll={filterByAll} filterByUser={filterByUser} status={status}/>
        <div className={s.cardsRender}>
          <div className={s.title}>Number of cards</div>
          <DoubleRange packs={packs} value={value} setRangeOne={setRangeOne} setRangeTwo={setRangeTwo} handleChange={handleChange}/>
        </div>
        <div className={s.reset}>
          <button className={s.btn} onClick={resetHandler}>
            <FilterAltOffIcon/>
          </button>
        </div>
      </div>
      <TableContainer className={s.container}>
        <Table aria-label="simple table">
          <TablePackHeadComponent
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {packs.cardPacks.length !== 0 ? <TableBody>
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
          </TableBody>: <h2 className={ searchValue ? s.text : s.visibilityHidden}>Search failed</h2>}
        </Table>
      </TableContainer>
      <div className={s.pagination}>
        <div className={s.itemsCount}>Items per page</div>
        <select className={s.itemsAmount} onChange={itemsPerPageHandler}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <PaginateComponent
          page={page}
          setPage={pageChangeHandler}
          count={Math.ceil(packs.cardPacksTotalCount / rowsPerPage)}
        />
      </div>
    </div>
  );
};
