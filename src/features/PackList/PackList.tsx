import React, { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
import s from './PackList.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Slider, TablePagination, TextField } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from 'lodash.debounce';
import TableFooter from '@mui/material/TableFooter';
import { TablePaginationActions } from './TablePagination/TablePagination';

type DataType = {
  name: string;
  cards: number;
  lastUpdated: string;
  createdBy: string;
  userId: string;
};

export const PackList = React.memo(() => {
  const initialState = [
    { name: 'Pack Name', cards: 4, lastUpdated: '18.03.2021', createdBy: 'Stas', userId: 'friend' },
    { name: 'Name Packs', cards: 30, lastUpdated: '18.03.2021', createdBy: 'Vlad', userId: 'main' },
    {
      name: 'Pickchi Name',
      cards: 18,
      lastUpdated: '18.03.2021',
      createdBy: 'Stas',
      userId: 'friend',
    },
    { name: 'Name Packs', cards: 0, lastUpdated: '19.03.2021', createdBy: 'Vlad', userId: 'main' },
    {
      name: 'Pickchi Name',
      cards: 11,
      lastUpdated: '19.03.2021',
      createdBy: 'Stas',
      userId: 'friend',
    },
    {
      name: 'Pickchi Packs',
      cards: 9,
      lastUpdated: '22.03.2021',
      createdBy: 'Vlad',
      userId: 'main',
    },
    {
      name: 'Pack Name',
      cards: 98,
      lastUpdated: '25.03.2021',
      createdBy: 'Stas',
      userId: 'friend',
    },
    { name: 'Vlad Packs', cards: 56, lastUpdated: '30.03.2021', createdBy: 'Vlad', userId: 'main' },
  ];

  const [rows, setRows] = useState<DataType[]>(initialState);
  const [searchValue, setSearchValue] = useState('');
  const [btnColor, setBtnColor] = useState(true);

  //заглушка, будет приходить с сервера
  const cards: number[] = rows.map((el) => el.cards).sort((a, b) => a - b);

  const [value, setValue] = useState<number[]>([cards[0], cards[cards.length - 1]]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    cardsFilterDebounce(newValue as number[]);
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

  const resetHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRows(initialState);
    setValue([cards[0], cards[cards.length - 1]]);
    setBtnColor(false);
    setSearchValue('');
  };

  //debounces
  const searchDebounce = useCallback(
    debounce((str: string) => {
      const newArr = rows.filter((el) => el.name.toLowerCase().includes(str));
      setRows(newArr);
    }, 750),
    [],
  );

  const cardsFilterDebounce = useCallback(
    debounce((num: number[]) => {
      const newArr = rows.filter((el) =>
        cards.filter((el) => el >= num[0] && el <= num[1]).includes(el.cards),
      );
      setRows(newArr);
    }, 500),
    [],
  );

  //search, sort tools
  const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase().trim());
    searchDebounce(e.currentTarget.value);
  };

  const filterByUser = () => {
    const newArr = rows.filter((el) => el.userId === 'main');
    setRows(newArr);
    setBtnColor(false);
  };

  const filterByAll = () => {
    setRows(initialState);
    setBtnColor(true);
  };

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
            sx={{ width: '415px' }}
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
            <button className={btnColor ? s.btnOn : s.btnOff} onClick={filterByUser}>
              My
            </button>
            <button className={btnColor ? s.btnOff : s.btnOn} onClick={filterByAll}>
              All
            </button>
          </div>
        </div>
        <div className={s.cardsRender}>
          <div className={s.title}>Number of cards</div>
          <div className={s.range}>
            <TextField
              sx={{ maxWidth: '70px' }}
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
              sx={{ maxWidth: '70px' }}
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
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.cards}</TableCell>
                <TableCell align="center">{row.lastUpdated}</TableCell>
                <TableCell align="center">{row.createdBy}</TableCell>
                {row.userId === 'main' ? (
                  <TableCell align="center">
                    <SchoolIcon sx={{ marginRight: '20px' }} />
                    <BorderColorIcon sx={{ marginRight: '20px' }} />
                    <DeleteIcon />
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <SchoolIcon />
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
                align="center"
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Packs per page'}
                page={page}
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
});
