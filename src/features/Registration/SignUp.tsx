import React, { useState } from 'react';
import s from './SignUp.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../app/store';
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

type FormikErrorType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const dispatch = useDispatch<AppThunkType>();
  const isRegistered = useSelector<AppRootStateType, boolean>((state) => state.auth.isRegistered);
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
    validate: (values: LoginRegisterDataType) => {
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
    onSubmit: (values: LoginRegisterDataType) => {
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
          <FormControl className={s.common}>
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
              <div className={s.password}>
                <TextField
                  label="Password"
                  type={type}
                  color="info"
                  variant="standard"
                  helperText=" "
                  sx={{ width: '300px' }}
                  FormHelperTextProps={{
                    className: s.helperText + ' ' + s.mrg2,
                  }}
                  {...formik.getFieldProps('password')}
                />
                {type === 'password' ? <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle} /> : <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle} />}
              </div>
              {formik.touched.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
              <div className={s.password}>
                <TextField
                  label="Confirm password"
                  type={type}
                  color="info"
                  variant="standard"
                  helperText=" "
                  sx={{ width: '300px' }}
                  FormHelperTextProps={{
                    className: s.helperText + ' ' + s.mrg2,
                  }}
                  {...formik.getFieldProps('confirmPassword')}
                />
                {type === 'password' ? <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle} /> : <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle} />}
              </div>
              {formik.touched.confirmPassword && <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>}
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
