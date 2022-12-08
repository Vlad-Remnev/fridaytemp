import React, {ChangeEvent, FC} from 'react';
import TextField from "@mui/material/TextField";

type TextFieldInModalsType = {
  value: string
  callBack: (value: string) => void
  label: string
}

const TextFieldInModals: FC<TextFieldInModalsType> = ({value, callBack, label}) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    callBack(e.currentTarget.value)
  }

  return (
    <TextField value={value} variant="standard" label={label} placeholder="Write a name"
               sx={{width: '100%', margin: '10px 0'}} helperText={`Write a ${label}`}
               onChange={onChangeHandler}/>
  );
};

export default TextFieldInModals;