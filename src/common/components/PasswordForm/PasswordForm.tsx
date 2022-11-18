import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import s from './Password.module.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { eyeStyles } from '../../themes/themeMaterialUi';

type PasswordFormType = {
  setPassword: (password: string) => void;
};

export const PasswordForm: FC<PasswordFormType> = ({ setPassword }) => {
  const [type, setType] = useState('password');
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };
  return (
    <>
      <TextField
        label="Password"
        type={type}
        color="info"
        variant="standard"
        helperText=" "
        sx={{ width: '300px' }}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        FormHelperTextProps={{
          className: s.helperText + ' ' + s.mrg2,
        }}
      />
      {type === 'password' ? (
        <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle} />
      ) : (
        <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle} />
      )}
    </>
  );
};
