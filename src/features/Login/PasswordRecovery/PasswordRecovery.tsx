import React, { useState } from 'react';
import s from './PasswordRecovery.module.css';
import { Button, FormControl, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { setNewPasswordTC } from '../../Profile/profileReducer';
import { useDispatch } from 'react-redux';
import { AppThunkType } from '../../../app/store';
import { buttonStyles } from '../../../common/themes/themeMaterialUi';
import PasswordForm from '../../../common/components/PasswordForm/PasswordForm';
import { setAppErrorAC } from '../../../app/appReducer';

const PasswordRecovery = () => {
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppThunkType>();
  const { token } = useParams();
  let navigate = useNavigate();

  const tokenChange = () => {
    if (password.length > 7 && token) {
      dispatch(setNewPasswordTC({ password, resetPasswordToken: token }));
      navigate('/login');
    } else {
      dispatch(setAppErrorAC('Password is too short'));
    }
  };
  return (
    <div>
      <div className={s.container}>
        <Paper elevation={1} className={s.paper + ' ' + s.common}>
          <h2 className={s.title}>Create new password</h2>
          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <PasswordForm setPassword={setPassword} />
          </FormControl>
          <div className={s.helperText}>Create new password and we will send you further instructions to email</div>
          <Button variant="contained" sx={buttonStyles} onClick={tokenChange}>
            Create new password
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default PasswordRecovery;
