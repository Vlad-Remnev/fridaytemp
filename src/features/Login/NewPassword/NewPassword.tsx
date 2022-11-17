import React, {useState} from 'react';
import { Button, Paper, TextField } from '@mui/material';
import s from './NewPassword.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppThunkType} from "../../../app/store";
import {forgotTC} from "../../../app/authReducer";

const NewPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch<AppThunkType>();

    let navigate = useNavigate()

    const buttonStyles = {
        width: '100%',
        background: '#366EFF',
        boxShadow: '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
        borderRadius: '30px',
        marginTop: '65px',
        textTransform: 'none',
    };

    const letterForForgot = `<div style="background-color: lime; padding: 15px">
                                password recovery link: 
                                <a href='http://localhost:3000/#/passwordRecovery/$token$'>
                                Follow the link, to create new password</a>
                                </div>`

    const forgotPassword = () => {
        dispatch(forgotTC({email: email, from: "test-front-admin <ai73a@yandex.by>", message: letterForForgot}))
        navigate('/checkEmail')
    }

  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Forgot your password?</h2>
        <TextField
          label="Email"
          autoFocus
          color="info"
          variant="standard"
          helperText="Enter your email address and we will send you further instructions"
          onChange={(e) => {setEmail(e.currentTarget.value)}}
          sx={{ width: '100%' }}
          FormHelperTextProps={{
            className: s.helperText + ' ' + s.mrg2,
          }}
        />
        <Button variant="contained" sx={buttonStyles} onClick={forgotPassword}>
          Send Instructions
        </Button>
        <div className={s.remember + ' ' + s.mrg3}>Did you remember your password?</div>
        <Link to="/" className={s.link + ' ' + s.mrg}>
          Try logging in
        </Link>
      </Paper>
    </div>
  );
};

export default NewPassword;
