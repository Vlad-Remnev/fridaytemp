import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import s from "./Cards.module.css";
import debounce from "lodash.debounce";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import PaginateComponent from "../../../common/components/PaginateComponent/PaginateComponent";
import {AppDispatchType, useAppSelector} from "../../../app/store";
import {useDispatch} from "react-redux";
import {addCardTC, fetchCardsTC, setCardTC} from "./cardsPeducer";
import {BackToLink} from "../../../common/components/BackToLink/BackToLink";
import {TableHeadComponent} from "./TableHeadComponent/TableHeadComponent";
import {SearchComponent} from "./SearchComponent/SearchComponent";
import {TableBodyComponent} from "./TableBodyComponent/TableBodyComponent";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {EmptyPackList} from "./EmptyPackList/EmptyPackList";
import AddCardModal from "../../../common/components/Modals/CardsModals/AddCardModal/AddCardModal";


export type Order = 'asc' | 'desc';

const Cards = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();
  const user_Id = useAppSelector((state) => state.profile.userData._id)
  const name = useAppSelector(state => state.cards.packName)
  const {cards, page, pageCount, cardsTotalCount} =
    useAppSelector((state) => state.cards);
  const status = useAppSelector(state => state.app.status)
  const {packId, packName, userId} = useParams()
  const compareIdForDraw = userId === user_Id
  const [order, setOrder] = React.useState<Order>('asc');
  const orderBy = 'name'
  const [draw, setDraw] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(pageCount);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, pageCount: 5}));
  }, []);

  //==========================PAGINATION=====================
  const pageChangeHandler = (page: number) => {
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, page, pageCount: rowsPerPage}));
  };

  const itemsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {

    setRowsPerPage(+e.target.value)
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, pageCount: +e.target.value}))
  }
  //==============================CRUD=======================
  const addNewCardHandler = () => {
    packId && dispatch(addCardTC({
      card: {
        cardsPack_id: packId,
        question: 'What is up?', answer: 'I am fine'
      },
    }, {cardsPack_id: packId, pageCount: rowsPerPage}))
  }

  const emptyRows =
    page > 1 ? Math.max(0, page * pageCount - cardsTotalCount) : 0;

  //==================DEBOUNCE AND SEARCH======================
  const handleToggle = () => {
    setSearchBy(!searchBy)
    setSearchValue('')
    searchDebounce('');
  };

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    searchDebounce(e.currentTarget.value.toLowerCase());
    setSearchValue(e.currentTarget.value.toLowerCase())
  };

  const searchDebounce = useCallback(
    debounce((str: string) => {
      if (searchBy) {
        packId && dispatch(fetchCardsTC({cardsPack_id: packId, cardQuestion: str, pageCount: rowsPerPage}));
      } else {
        packId && dispatch(fetchCardsTC({cardsPack_id: packId, cardAnswer: str, pageCount: rowsPerPage}));
      }
      setDraw(draw + 1)
    }, 750),
    [searchBy]
  );

  //==========================Rating======================
  const setValueRatingHandler = (newValue: number | null, cardId: string) => {
    dispatch(setCardTC({card_id: cardId, grade: newValue}))
  }
  //===========================SORT=======================
  const handleRequestSort = (
    id: string,
  ) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (isAsc) {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "1grade", pageCount: rowsPerPage}))
    } else {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "0grade", pageCount: rowsPerPage}))
    }
  };
  const buttonName = compareIdForDraw ? 'Add new card' : 'Learn to pack'
  return (
    <div className={s.wrapper}>
      <BackToLink/>
      {cards.length || draw ? <>
        <div className={s.wrapper__header}>
          <h2 className={s.wrapper__title}>{packName}</h2>
          {compareIdForDraw
            ? <AddCardModal packId={packId} rowsPerPage={rowsPerPage}/>
            : <SuperButton
              disabled={status === 'loading'}
              onClick={addNewCardHandler}
              className={status === 'loading' ? s.wrapper__btnDisabled : s.wrapper__btn}
            >
              {buttonName}
            </SuperButton>}
        </div>
        <div className={s.search}>
          <div
            className={s.title}> {searchBy ? 'Searching for the question' : 'Searching for the answer'}</div>
          <SearchComponent
            searchBy={searchBy}
            value={searchValue}
            onChange={searchHandler}
            onClick={handleToggle}
          />
        </div>
        <TableContainer className={s.container}>
          <Table aria-label="simple table">
            <TableHeadComponent
              order={order}
              orderBy={orderBy}
              compareIdForDraw={compareIdForDraw}
              onRequestSort={handleRequestSort}
            />
            {cards.length !== 0 ? <TableBodyComponent
              name={name}
              packId={packId}
              packName={packName}
              compareIdForDraw={compareIdForDraw}
              cards={cards}
              emptyRows={emptyRows}
              setValueRating={setValueRatingHandler}
              rowsPerPage={rowsPerPage}
            /> : <h2 className={s.text}>Search failed</h2>}
          </Table>
        </TableContainer>
        {cards.length !== 0 && <div className={s.pagination}>
            <div className={s.itemsCount}>Items per page</div>
            <select className={s.itemsAmount} onChange={itemsPerPageHandler}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <PaginateComponent
                page={page}
                setPage={pageChangeHandler}
                count={Math.ceil(cardsTotalCount / rowsPerPage)}
            />
        </div>}
      </> : packName &&
          <EmptyPackList buttonName={buttonName} packName={packName} rowsPerPage={rowsPerPage} status={status} packId={packId}/>}
    </div>
  );
};

export default Cards;
