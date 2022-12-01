import React, {ChangeEvent, FC} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchComponentType = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value: string
}

const SearchPackComponent: FC<SearchComponentType> = ({value, onChange}) => {
  return (
    <TextField
      variant="outlined"
      sx={{width: "415px"}}
      placeholder="Type some text"
      value={value}
      onChange={onChange}
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