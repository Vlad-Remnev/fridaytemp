import React, {useEffect, useState,} from "react";
import s from "./PacksList.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {AppDispatchType, useAppSelector} from "../../app/store";
import {Pack} from "./Pack/Pack";
import {useDispatch} from "react-redux";
import {fetchPacksTC} from './packsListReducer';
import {AddModal} from "../../common/components/Modals/PacksModals/AddModal/AddModal";
import {TablePackHeadComponent} from "./TablePackHeadComponent/TablePackHeadComponent";
import SearchPackComponent from "./SearchPackComponent/SearchPackComponent";
import MyOrAllPacks from "./MyOrAllPacks/MyOrAllPacks";
import DoubleRange from "./DoubleRange/DoubleRange";
import SuperButton from "../../common/components/SuperButton/SuperButton";
import PacksPaginate from "./PacksPaginate/PacksPaginate";

export type Order = 'asc' | 'desc';

export const PacksList = () => {
  const {cardPacks, maxCardsCount, minCardsCount, cardPacksTotalCount, pageCount, page } = useAppSelector((state) => state.packsList);
  const user_Id = useAppSelector((state) => state.profile.userData._id);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();
  const status = useAppSelector(state => state.app.status)

  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount,]);
  const [rowsPerPage, setRowsPerPage] = useState(pageCount);
  const [btnColor, setBtnColor] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchPacksTC({pageCount: rowsPerPage}));
  }, [isLoggedIn, dispatch]);

  const emptyRows =
    page > 1 ? Math.max(0, page * pageCount - cardPacksTotalCount) : 0;

  const resetHandler = () => {
    setValue([minCardsCount, maxCardsCount]);
    setBtnColor(false);
    setSearchValue("");
    dispatch(fetchPacksTC({}))
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
          <SearchPackComponent value={searchValue} setSearchValue={setSearchValue} rowsPerPage={rowsPerPage}/>
        </div>
        <MyOrAllPacks status={status} searchValue={searchValue} value={value} page={page} rowsPerPage={rowsPerPage} user_Id={user_Id} btnColor={btnColor} setBtnColor={setBtnColor}/>
        <div className={s.cardsRender}>
          <div className={s.title}>Number of cards</div>
          <DoubleRange maxCardsCount={maxCardsCount} minCardsCount={minCardsCount} value={value} setValue={setValue} searchValue={searchValue} page={page} rowsPerPage={rowsPerPage}/>
        </div>
        <div className={s.reset}>
          <SuperButton className={s.btn} onClick={resetHandler}>
            <FilterAltOffIcon/>
          </SuperButton>
        </div>
      </div>
      <TableContainer className={s.container}>
        <Table aria-label="simple table">
          <TablePackHeadComponent
            rowsPerPage={rowsPerPage}
            value={value}
            page={page}
          />
          {cardPacks.length !== 0 ? <TableBody>
            {cardPacks.map((p) => {
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
                  deckCover={p.deckCover}

                />
              );
            })}
          </TableBody>: <h2 className={ searchValue ? s.text : s.visibilityHidden}>Search failed</h2>}
        </Table>
      </TableContainer>
      {cardPacks.length !== 0 &&<PacksPaginate value={value} page={page} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} cardPacksTotalCount={cardPacksTotalCount} searchValue={searchValue}/>}
    </div>
  );
};
