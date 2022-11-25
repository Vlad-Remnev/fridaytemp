import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import s from "./Cards.module.css";
import {InputAdornment, Rating, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import PaginateComponent from "../../../common/components/PaginateComponent/PaginateComponent";
import {AppDispatchType, useAppSelector} from "../../../app/store";
import {useDispatch} from "react-redux";
import {addCardTC, fetchCardsTC, removeCardTC, updateCardTC} from "./cardsPeducer";
import {editDate} from "../../../common/utils/edit-date";
import DeleteIcon from '@mui/icons-material/Delete';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {findStyles} from "../../../common/themes/themeMaterialUi";

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
  const [pageNum, setPage] = useState(page);
  const [searchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    packId && dispatch(fetchCardsTC({cardsPack_id: packId}));
  }, []);

  //modal window settings
  const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true)
  // };
  const handleClose = (cardId: string) => {
    setOpen(false)
    dispatch(updateCardTC({_id: cardId, answer: 'What?', question: 'Ok!'}))
  };

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

  //pagination
  const pageChangeHandler = (page: number) => {
    packId && dispatch(fetchCardsTC({cardsPack_id: packId, page}));
    setPage(page);
  };

  //CRUD
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

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>{packName}</h2>
        <button className={s.wrapper__btn}
                onClick={addNewCardHandler}>{compareIdForDraw ? 'Add new card' : 'Learn to pack'}</button>
      </div>
      <div className={s.search}>
        <div className={s.title}> {searchBy ? 'Searching for the question' : 'Searching for the answer'}</div>
        <div className={s.password}>
          <TextField
            variant="outlined"
            sx={{width: "100%"}}
            placeholder="Type some text"
            onChange={searchHandler}
            value={searchValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
          />
          {searchBy ? (
            <SupportAgentIcon fontSize="large" sx={findStyles} onClick={handleToggle} />
          ) : (
            <NotListedLocationIcon fontSize="large" sx={findStyles} onClick={handleToggle} />
          )}
        </div>
      </div>
      { name === packName ? (cards.length ?  <TableContainer className={s.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={s.mainRow}>
              <TableCell className={s.cell} align="center">
                Question
              </TableCell>
              <TableCell className={s.cell} align="center">
                Answer
              </TableCell>
              <TableCell className={s.cell} align="center">
                Last Updated
              </TableCell>
              <TableCell className={s.cell} align="center">
                Grade
              </TableCell>
            </TableRow>
          </TableHead>
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
                      {/*<Modal*/}
                      {/*  open={open}*/}
                      {/*  onClose={() => {*/}
                      {/*    console.log(card._id)*/}
                      {/*    handleClose(card._id)}*/}
                      {/*}*/}
                      {/*  aria-labelledby="modal-modal-title"*/}
                      {/*  aria-describedby="modal-modal-description"*/}
                      {/*>*/}
                      {/*  <Box sx={modalStyle}>*/}
                      {/*    <h4>Change the question?</h4>*/}
                      {/*    <TextField value={""} />*/}
                      {/*    <h4>Change the answer?</h4>*/}
                      {/*    <TextField value={""} />*/}
                      {/*  </Box>*/}
                      {/*</Modal>*/}
                      {/*<button onClick={() => {*/}
                      {/*  removeCardHandler(card._id)*/}
                      {/*}}></button>*/}
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
          <TableFooter sx={{borderTop: "1px solid lightgrey"}}>
            <TableRow>
              <PaginateComponent
                page={pageNum}
                setPage={pageChangeHandler}
                count={Math.ceil(cardsTotalCount / pageCount)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer> : <h2>Nothing was found</h2>) : <div></div>}
    </div>
  );
};

export default Cards;
