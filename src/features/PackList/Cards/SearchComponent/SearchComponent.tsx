import React, {ChangeEvent, useCallback, useState} from 'react';
import s from "./SearchComponent.module.css"
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {findStyles} from "../../../../common/themes/themeMaterialUi";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import debounce from "lodash.debounce";
import {fetchCardsTC} from "../cardsPeducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";

type SearchComponentType = {
  searchBy: boolean
  setSearchBy: (searchBy: boolean) => void
  setDraw: (draw: number) => void
  packId: string | undefined
  rowsPerPage: number
  draw: number
}
export const SearchComponent = ({searchBy, setSearchBy, packId, rowsPerPage, draw, setDraw}: SearchComponentType) => {
  const dispatch = useDispatch<AppDispatchType>();

  const [searchValue, setSearchValue] = useState('')

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
  return (
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
        <SupportAgentIcon fontSize="large" sx={findStyles} onClick={handleToggle}/>
      ) : (
        <NotListedLocationIcon fontSize="large" sx={findStyles} onClick={handleToggle}/>
      )}
    </div>
  );
};
