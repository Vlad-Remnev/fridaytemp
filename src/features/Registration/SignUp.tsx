import React, { useState } from 'react';
import s from './SignUp.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppThunkType, useAppSelector } from '../../app/store';
import { registerTC } from '../../app/authReducer';

// MUI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import { buttonStyles, eyeStyles } from '../../common/themes/themeMaterialUi';
import { LoginRegisterDataType } from '../../app/appApi';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';

export const SignUp = () => {
  const dispatch = useDispatch<AppThunkType>();
  const isRegistered = useAppSelector((state) => state.auth.isRegistered);
  const [type, setType] = useState('password');
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
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(7, 'Must be at least 7 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(),
    }),
    onSubmit: (values: LoginRegisterDataType) => {
      dispatch(registerTC(values));
    },
  });

  if (isRegistered) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={s.common}>
            <h2 className={s.title}>Sign Up</h2>
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
                  label="Password"
                  type={type}
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
              <div className={s.password}>
                <TextField
                  label="Confirm password"
                  type={type}
                  color="info"
                  variant="standard"
                  sx={{ width: '300px' }}
                  {...formik.getFieldProps('confirmPassword')}
                />
                {type === 'password' ? (
                  <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle} />
                ) : (
                  <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle} />
                )}
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div style={{ color: 'red', fontSize: '12px' }}>
                  {formik.errors.confirmPassword}
                </div>
              )}
              <Button type={'submit'} variant="contained" sx={buttonStyles}>
                Sign Up
              </Button>
            </FormGroup>
            <div className={s.remember + ' ' + s.mrg3}>Already have an account?</div>
            <Link to="/" className={s.link + ' ' + s.mrg}>
              Sign In
            </Link>
          </FormControl>
        </form>
      </Paper>
    </div>
  );
};
