import React, { useState } from 'react';
import s from './PasswordRecovery.module.css';
import { Button, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { setNewPasswordTC } from '../../Profile/profileReducer';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../app/store';
import { buttonStyles, eyeStyles } from '../../../common/themes/themeMaterialUi';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const PasswordRecovery = () => {
  const [type, setType] = useState('password');
  const dispatch = useDispatch<AppDispatchType>();
  const { token } = useParams();
  let navigate = useNavigate();
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(7, 'Must be at least 7 characters').required('Required'),
    }),
    onSubmit: (values) => {
      if (token) {
        dispatch(
          setNewPasswordTC({ password: values.password, resetPasswordToken: token }, navigate),
        );
      }
    },
  });
  return (
    <div>
      <div className={s.container}>
        <Paper elevation={1} className={s.paper + ' ' + s.common}>
          <h2 className={s.title}>Create new password</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <div className={s.password}>
                <TextField
                  type={type}
                  label="Password"
                  color="info"
                  variant="standard"
                  sx={{ width: '300px' }}
                  {...formik.getFieldProps('password')}
                />
                {type === 'password' ? (
                  <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle} />
                ) : (
                  <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle} />
                )}
              </div>
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.password}</div>
              )}
              <div className={s.helperText}>
                Create new password and we will send you further instructions to email
              </div>
              <Button type="submit" variant="contained" sx={buttonStyles}>
                Create new password
              </Button>
            </FormGroup>
          </form>
        </Paper>
      </div>
    </div>
  );
};
