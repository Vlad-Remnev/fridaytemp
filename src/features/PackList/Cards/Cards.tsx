import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import s from "./Cards.module.css";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {AppDispatchType, useAppSelector} from "../../../app/store";
import {useDispatch} from "react-redux";
import {addCardTC, fetchCardsTC} from "./cardsPeducer";
import {BackToLink} from "../../../common/components/BackToLink/BackToLink";
import {TableHeadComponent} from "./TableHeadComponent/TableHeadComponent";
import {SearchComponent} from "./SearchComponent/SearchComponent";
import {TableBodyComponent} from "./TableBodyComponent/TableBodyComponent";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {EmptyPackList} from "./EmptyPackList/EmptyPackList";
import AddCardModal from "../../../common/components/Modals/CardsModals/AddCardModal/AddCardModal";
import CardsPaginate from "./CardsPaginate/CardsPaginate";


const Cards = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user_Id = useAppSelector((state) => state.profile.userData._id)
  const name = useAppSelector(state => state.cards.packName)
  const {cards, page, pageCount, cardsTotalCount} = useAppSelector((state) => state.cards);
  const status = useAppSelector(state => state.app.status)
  const dispatch = useDispatch<AppDispatchType>();

  const {packId, packName, userId} = useParams()
  const compareIdForDraw = userId === user_Id
  const buttonName = compareIdForDraw ? 'Add new card' : 'Learn to pack'

  const [draw, setDraw] = useState(0)
  const [searchBy, setSearchBy] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(pageCount);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, pageCount: 5}));
  }, []);

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
            setSearchBy={setSearchBy}
            setDraw={setDraw}
            rowsPerPage={rowsPerPage}
            packId={packId}
            draw={draw}
          />
        </div>
        <TableContainer className={s.container}>
          <Table aria-label="simple table">
            <TableHeadComponent
              compareIdForDraw={compareIdForDraw}
              packId={packId}
              rowsPerPage={rowsPerPage}
            />
            {cards.length !== 0 ? <TableBodyComponent
              name={name}
              packId={packId}
              packName={packName}
              compareIdForDraw={compareIdForDraw}
              cards={cards}
              emptyRows={emptyRows}
              rowsPerPage={rowsPerPage}
            /> : <h2 className={s.text}>Search failed</h2>}
          </Table>
        </TableContainer>
        {cards.length !== 0 && <CardsPaginate rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} cardsTotalCount={cardsTotalCount} packId={packId}/>}
      </> : packName &&
          <EmptyPackList buttonName={buttonName} packName={packName} rowsPerPage={rowsPerPage} status={status} packId={packId}/>}
    </div>
  );
};

export default Cards;
