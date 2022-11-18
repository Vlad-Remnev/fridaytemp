import React, { useState } from 'react';
import { useFormik } from 'formik';
import s from './SigIn.module.css';
import { Link, Navigate } from 'react-router-dom';
import { loginTC } from '../../../app/authReducer';
import { useDispatch } from 'react-redux';
import { AppThunkType, useAppSelector } from '../../../app/store';

// MUI imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { buttonStyles, eyeStyles } from '../../../common/themes/themeMaterialUi';

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const [type, setType] = useState('password');
  const dispatch = useDispatch<AppThunkType>();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Should be more symbols';
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(loginTC(values));
    },
  });
  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Email"
              color="info"
              variant="standard"
              sx={{ width: '300px' }}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
            )}
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
            <FormControlLabel
              label={'Remember me'}
              control={
                <Checkbox
                  checked={formik.values.rememberMe}
                  {...formik.getFieldProps('rememberMe')}
                />
              }
            />
            <Link to="/newPassword" className={s.link + ' ' + s.mrg}>
              Forgot Password?
            </Link>
            <Button type="submit" variant="contained" sx={buttonStyles}>
              Sign In
            </Button>
          </FormGroup>
        </form>
        <div className={s.haveAccount + ' ' + s.mrg3}>Already have an account?</div>
        <Link to="/registration" className={s.link2 + ' ' + s.mrg2}>
          Sign Up
        </Link>
      </Paper>
    </div>
  );
};
