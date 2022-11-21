import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import s from './Cards.module.css';
import { InputAdornment, Modal, Rating, TablePagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import TableFooter from '@mui/material/TableFooter';
import { TablePaginationActions } from '../TablePagination/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import { modalStyle } from '../../../common/themes/themeMaterialUi';
import Box from '@mui/material/Box';
import { setCardsTС } from './cardsReducer';
import { useDispatch } from 'react-redux';
import { AppThunkType, useAppSelector } from '../../../app/store';

type DataType = {
  id: number;
  question: string;
  answer: string;
  lastUpdated: string;
  grade: number;
  userId: string;
};

const Cards = () => {
  const dispatch = useDispatch<AppThunkType>();
  // const cards = useAppSelector((state) => state.cards['635761e499daed333072f373'].cards);
  useEffect(() => {
    dispatch(setCardsTС('635761e499daed333072f373'));
  }, []);
  const initialState = [
    {
      id: 1,
      question: 'How "This" works in JavaScript?',
      answer: 'How "This" works in JavaScript?',
      lastUpdated: '18.03.2021',
      grade: 5,
      userId: 'friend',
    },
  ];

  const [rows, setRows] = useState<DataType[]>(initialState);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //modal window settings
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase().trim());
    searchDebounce(e.currentTarget.value);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const searchDebounce = useCallback(
    debounce((str: string) => {
      const newArr = rows.filter((el) => el.question.toLowerCase().includes(str));
      setRows(newArr);
    }, 750),
    [],
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
          sx={{ width: '100%' }}
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
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow
                //исправить ключ, он гавно
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.question}
                </TableCell>
                <TableCell align="center">{row.answer}</TableCell>
                <TableCell align="center">{row.lastUpdated}</TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.grade} precision={0.5} readOnly />
                </TableCell>
                {row.userId === 'main' && (
                  <TableCell align="center">
                    <BorderColorIcon sx={{ marginRight: '20px' }} onClick={handleOpen} />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalStyle}>
                        <h4>Change the question?</h4>
                        <TextField value={''} />
                        <h4>Change the answer?</h4>
                        <TextField value={''} />
                      </Box>
                    </Modal>
                    <DeleteIcon />
                  </TableCell>
                )}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter sx={{ borderTop: '1px solid lightgrey' }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={'Cards per page'}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Cards per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cards;
