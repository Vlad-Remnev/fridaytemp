import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import s from './EditableSpan.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface IEditableSpan {
  title: string;
  checked?: boolean;
  onChange?: (newTitle: string) => void;
}

const SearchButton = () => (
  <Button variant="contained" size="small" style={{ marginBottom: '5px' }}>
    Save
  </Button>
);

export const EditableSpan: FC<IEditableSpan> = ({ title, onChange, checked }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const onBlur = () => {
    setEditMode(false);
    onChange && onChange(newTitle);
  };

  const changeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      onBlur();
    }
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
  };

  return editMode ? (
    <>
      <TextField
        label="Nickname"
        onKeyDown={changeKeyPress}
        onBlur={onBlur}
        onChange={onChangeTitleHandler}
        value={newTitle}
        autoFocus
        color="info"
        variant="standard"
        InputProps={{ endAdornment: <SearchButton /> }}
      />
    </>
  ) : (
    <>
      <span onDoubleClick={() => setEditMode(true)} className={checked ? s.isDone : s.activeDone}>
        {title}
        <BorderColorIcon style={{ fontSize: '16px', marginLeft: '5px' }} />
      </span>
    </>
  );
};
