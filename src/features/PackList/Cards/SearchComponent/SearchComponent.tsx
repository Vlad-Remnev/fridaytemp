import React, {ChangeEvent} from 'react';
import s from "./SearchComponent.module.css"
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {findStyles} from "../../../../common/themes/themeMaterialUi";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

type SearchComponentType = {
  searchBy: boolean
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value: string
  onClick: () => void
}
const SearchComponent = ({searchBy, value, onChange, onClick}: SearchComponentType) => {
  return (
    <div className={s.password}>
      <TextField
        variant="outlined"
        sx={{width: "100%"}}
        placeholder="Type some text"
        onChange={onChange}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
      {searchBy ? (
        <SupportAgentIcon fontSize="large" sx={findStyles} onClick={onClick}/>
      ) : (
        <NotListedLocationIcon fontSize="large" sx={findStyles} onClick={onClick}/>
      )}
    </div>
  );
};

export default SearchComponent;