import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import s from './NewPassword.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../app/store';
import { forgotTC } from '../../../app/authReducer';
import { buttonStyles } from '../../../common/themes/themeMaterialUi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '@mui/material/FormGroup';

export const NewPassword = () => {
  const dispatch = useDispatch<AppDispatchType>();
  let navigate = useNavigate();
  const letterForForgot = `<div style="background-color: lime; padding: 15px">
                                password recovery link: 
                                <a href='https://vlad-remnev.github.io/fridaytemp/#/passwordRecovery/$token$'>
                                Follow the link, to create new password</a>
                                </div>`;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(
        forgotTC(
          {
            email: values.email.toLowerCase(),
            from: 'test-front-admin <ai73a@yandex.by>',
            message: letterForForgot,
          },
          navigate,
        ),
      );
    },
  });
  return (
    <div className={s.container}>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Forgot your password?</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Email"
              color="info"
              variant="standard"
              helperText={
                formik.touched.email && formik.errors.email ? (
                  <span style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</span>
                ) : (
                  'Enter your email address and we will send you further instructions'
                )
              }
              sx={{ width: '300px' }}
              FormHelperTextProps={{
                className: s.helperText + ' ' + s.mrg2,
              }}
              {...formik.getFieldProps('email')}
            />
            <Button type="submit" variant="contained" sx={buttonStyles}>
              Send Instructions
            </Button>
          </FormGroup>
        </form>
        <div className={s.remember + ' ' + s.mrg3}>Did you remember your password?</div>
        <Link to="/" className={s.link + ' ' + s.mrg}>
          Try logging in
        </Link>
      </Paper>
    </div>
  );
};
