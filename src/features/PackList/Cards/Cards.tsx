import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import s from "./Cards.module.css";
import {InputAdornment, Modal, Rating, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import {modalStyle} from "../../../common/themes/themeMaterialUi";
import Box from "@mui/material/Box";
import PaginateComponent from "../../../common/components/PaginateComponent/PaginateComponent";
import {AppDispatchType, useAppSelector} from "../../../app/store";
import {useDispatch} from "react-redux";
import {fetchCardsTC} from "./cardsPeducer";
import {editDate} from "../../../common/utils/edit-date";


const Cards = () => {
  const cardsPack_id = "608025300fcbf9096c0b6deb";
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatchType>();
  const { cards, page, pageCount, cardsTotalCount, packUserId } =
    useAppSelector((state) => state.cards);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchCardsTC({ cardsPack_id }));
  }, []);

  // const [rows, setRows] = useState<CardType[]>(cards);
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPage] = useState(page);
  // const rowsPerPage = 5;
  //modal window settings
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.currentTarget.value.toLowerCase().trim());
    searchDebounce(e.currentTarget.value);
  };

  const pageChangeHandler = (page: number) => {
    dispatch(fetchCardsTC({ cardsPack_id, page }));
    setPage(page);
  };

  const emptyRows =
    page > 1 ? Math.max(0, page * pageCount - cardsTotalCount) : 0;

  const searchDebounce = useCallback(
    debounce((str: string) => {
      const newArr = cards.filter((el) =>
        el.question.toLowerCase().includes(str)
      );
      dispatch(fetchCardsTC({ cardsPack_id, page }));
    }, 750),
    []
  );

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>
        <h2 className={s.wrapper__title}>Name by user ID (Friend's or My)</h2>
        <button className={s.wrapper__btn}>Add new card</button>
      </div>
      <div className={s.search}>
        <div className={s.title}>Search</div>
        <TextField
          variant="outlined"
          sx={{ width: "100%" }}
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
      <TableContainer className={s.container}>
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
            {cards.map((card) => (
              <TableRow
                key={card._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                {card.user_id === "main" && (
                  <TableCell align="center">
                    <BorderColorIcon
                      sx={{ marginRight: "20px" }}
                      onClick={handleOpen}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalStyle}>
                        <h4>Change the question?</h4>
                        <TextField value={""} />
                        <h4>Change the answer?</h4>
                        <TextField value={""} />
                      </Box>
                    </Modal>
                    <DeleteIcon />
                  </TableCell>
                )}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 61 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter sx={{ borderTop: "1px solid lightgrey" }}>
            <TableRow>
              <PaginateComponent
                page={pageNum}
                setPage={pageChangeHandler}
                // count={10}
                count={Math.ceil(cardsTotalCount / pageCount)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cards;
