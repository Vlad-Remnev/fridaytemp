import React, { useState } from 'react';
import s from './SignUp.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../app/store';
import { RegisterDataType } from '../../app/appApi';
import { registerTC } from '../../app/authReducer';

// MUI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';

type FormikErrorType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const buttonStyles = {
    width: '100%',
    background: '#366EFF',
    boxShadow: '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    marginTop: '65px',
    textTransform: 'none',
  };
  const dispatch = useDispatch<AppThunkType>();
  const isRegistered = useSelector<AppRootStateType, boolean>((state) => state.auth.isRegistered);

  const [showPass, setShowPass] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values: RegisterDataType) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= 7) {
        errors.password = 'Password must be more than 7 characters';
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Password not matched';
      }

      return errors;
    },
    onSubmit: (values: RegisterDataType) => {
      dispatch(registerTC(values));
      formik.resetForm();
    },
  });

  if (isRegistered) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <h2 className={s.title}>Sign Up</h2>

            <FormGroup>
              <TextField
                label="Email"
                color="info"
                variant="standard"
                helperText=" "
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  className: s.helperText + ' ' + s.mrg2,
                }}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
              <TextField
                label="Password"
                type={showPass ? 'text' : 'password'}
                color="info"
                variant="standard"
                helperText=" "
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  className: s.helperText + ' ' + s.mrg2,
                }}
                {...formik.getFieldProps('password')}
              />
              {/*<div className={s.passwordControl} onClick={()=>setShowPass(showPass)}></div>*/}
              <span
                className={showPass ? s.passwordControlView : s.passwordControl}
                onClick={() => setShowPass(!showPass)}
              ></span>
              {formik.touched.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
              <TextField
                label="Confirm password"
                type={showPass ? 'text' : 'password'}
                color="info"
                variant="standard"
                helperText=" "
                sx={{ width: '300px' }}
                FormHelperTextProps={{
                  className: s.helperText + ' ' + s.mrg2,
                }}
                {...formik.getFieldProps('confirmPassword')}
              />
              <span
                className={showPass ? s.passwordControlView : s.passwordControl}
                onClick={() => setShowPass(!showPass)}
              ></span>
              {formik.touched.confirmPassword && <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>}
              {/*НЕ ТРОГАТЬ<InputAdornments/>*/}

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

export default SignUp;