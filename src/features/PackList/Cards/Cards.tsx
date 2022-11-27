import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import s from "./Cards.module.css";
import {Rating} from "@mui/material";
import debounce from "lodash.debounce";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableContainer from "@mui/material/TableContainer";
import PaginateComponent from "../../../common/components/PaginateComponent/PaginateComponent";
import {AppDispatchType, useAppSelector} from "../../../app/store";
import {useDispatch} from "react-redux";
import {addCardTC, fetchCardsTC, removeCardTC, updateCardTC} from "./cardsPeducer";
import {editDate} from "../../../common/utils/edit-date";
import DeleteIcon from '@mui/icons-material/Delete';
import {BackToLink} from "../../../common/components/BackToLink/BackToLink";
import TableHeadComponent from "./TableHeadComponent/TableHeadComponent";
import SearchComponent from "./SearchComponent/SearchComponent";


export type Order = 'asc' | 'desc';

const Cards = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();
  const user_Id = useAppSelector((state) => state.profile.userData._id)
  const name = useAppSelector(state => state.cards.packName)
  console.log(name)
  const {cards, page, pageCount, cardsTotalCount} =
    useAppSelector((state) => state.cards);
  const {packId, packName, userId} = useParams()
  console.log(packName)
  const compareIdForDraw = userId === user_Id
  const [order, setOrder] = React.useState<Order>('asc');
  const orderBy = 'name'
  const [pageNum, setPage] = useState(page);
  const [searchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(pageCount);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, pageCount: 5}));
  }, []);

  //modal window settings
  const [open, setOpen] = useState(false);
  const handleClose = (cardId: string) => {
    setOpen(false)
    dispatch(updateCardTC({_id: cardId, answer: 'What?', question: 'Ok!'}))
  };

  //==========================PAGINATION=====================
  const pageChangeHandler = (page: number) => {
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, page}));
    setPage(page);
  };

  const itemsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+e.target.value)
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, page: pageNum, pageCount: +e.target.value}))
  }
  //==============================CRUD=======================
  const addNewCardHandler = () => {
    packId && dispatch(addCardTC({
      card: {
        cardsPack_id: packId,
        question: 'What is up?', answer: 'I am fine'
      }
    }))
  }

  const removeCardHandler = (cardId: string) => {
    packId && dispatch(removeCardTC(cardId, {cardsPack_id: packId}))
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
        packId && dispatch(fetchCardsTC({cardsPack_id: packId, cardQuestion: str}));
      } else {
        packId && dispatch(fetchCardsTC({cardsPack_id: packId, cardAnswer: str}));
      }
    }, 750),
    [searchBy]
  );

  //===========================SORT=======================
  const handleRequestSort = (
    id: string,
  ) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    if (isAsc) {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "1grade"}))
    } else {
      packId && dispatch(fetchCardsTC({cardsPack_id: packId, sortCards: "0grade"}))
    }
  };

  return (
    <div className={s.wrapper}>
      <BackToLink/>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>{packName}</h2>
        <button className={s.wrapper__btn}
                onClick={addNewCardHandler}>{compareIdForDraw ? 'Add new card' : 'Learn to pack'}</button>
      </div>
      <div className={s.search}>
        <div className={s.title}> {searchBy ? 'Searching for the question' : 'Searching for the answer'}</div>
        <SearchComponent
          searchBy={searchBy}
          value={searchValue}
          onChange={searchHandler}
          onClick={handleToggle}
        />
      </div>
      {name === packName ? (cards.length ? <TableContainer className={s.container}>
        <Table aria-label="simple table">
          <TableHeadComponent
            order={order}
            orderBy={orderBy}
            compareIdForDraw={compareIdForDraw}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {cards.map((card) => {
              return (
                <TableRow
                  key={card._id}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row" align="center">
                    {card.question}
                  </TableCell>
                  <TableCell align="center">{card.answer}</TableCell>
                  <TableCell align="center">{editDate(card.updated)}</TableCell>
                  <TableCell align="center">
                    <Rating
                      name="read-only"
                      value={card.grade}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  {compareIdForDraw && (
                    <TableCell align="center">
                      <BorderColorIcon
                        sx={{marginRight: "20px"}}
                        onClick={() => handleClose(card._id)}
                      />
                      <DeleteIcon onClick={() =>
                        removeCardHandler(card._id)}/>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
            {emptyRows > 0 && (
              <TableRow style={{height: 61 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer> : <h2>Nothing was found</h2>) : <div></div>}
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
          count={Math.ceil(cardsTotalCount / rowsPerPage)}
        />
      </div>
    </div>
  );
};

export default Cards;
