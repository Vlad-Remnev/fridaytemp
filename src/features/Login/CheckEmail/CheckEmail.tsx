import React from 'react';
import s from './CheckEmail.module.css';
import { Button, Paper } from '@mui/material';
import checkEmail from '../../../assets/img/emailCheck.svg';
import { buttonStyles } from '../../../common/themes/themeMaterialUi';
import { Link } from 'react-router-dom';

export const CheckEmail = () => {
  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Check Email</h2>
        <div className={s.logo}>
          <img src={checkEmail} alt="checkEmail" />
        </div>
        <div className={s.helperText}>
          We’ve sent an Email with instructions to example@mail.com
        </div>
        <Button variant="contained" sx={buttonStyles}>
          <Link to="/login"> Back to login</Link>
        </Button>
      </Paper>
    </div>
  );
};
