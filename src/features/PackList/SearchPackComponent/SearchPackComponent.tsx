import React, {ChangeEvent, FC, useCallback} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import {fetchPacksTC} from "../packsListReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../app/store";

type SearchComponentType = {
  value: string
  setSearchValue: (value: string) => void
  rowsPerPage: number
}

const SearchPackComponent: FC<SearchComponentType> = ({value, setSearchValue, rowsPerPage}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
    searchDebounce(e.currentTarget.value.toLowerCase());
  };

  const searchDebounce = useCallback(
    debounce((str: string) => {
      dispatch(fetchPacksTC({packName: str, pageCount: rowsPerPage}))
    }, 750),
    []
  );

  return (
    <TextField
      variant="outlined"
      sx={{width: "415px"}}
      placeholder="Type some text"
      value={value}
      onChange={searchHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchPackComponent;