import React, { ChangeEvent } from 'react';
import s from './Profile.module.css';
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatchType, useAppSelector } from '../../app/store';
import { logoutTC } from '../../app/authReducer';
import { updateUserTC } from './profileReducer';
import { setAppErrorAC } from '../../app/appReducer';

// import MUI
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan';
import {ROUTS} from "../../app/App";

const convertFileToBase64 = (file: File, callback: (value: string) => void): void => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const file64 = reader.result as string;
    callback(file64);
  };
  reader.readAsDataURL(file);
};

export const Profile = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { avatar, name, email } = useAppSelector((state) => state.profile.userData);
  const status = useAppSelector((state) => state.app.status);
  const navigate = useNavigate()

  // нужно добавить проверку на размер аватара
  const minFileSize = 400000;

  const uploadHandlerAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateUserTC({ avatar: file64 }));
        });
      } else {
        dispatch(setAppErrorAC('File is too BIG'));
      }
    }
  };

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div className={s.container}>
      <div onClick={() => {navigate(ROUTS.PACK_LIST)}}>Back to Pack list</div>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Personal Information</h2>
        <div className={s.avatar}>
          <img src={avatar ? avatar : avatar} alt="Profile photo" />
          <div className={s.addPhoto + ' ' + s.common}>
            <input
              id={'input_add_photo'}
              type={'file'}
              style={{ display: 'none' }}
              accept={'image/**'}
              onChange={uploadHandlerAvatar}
            />
            <label htmlFor="input_add_photo">
              <AddAPhotoIcon />
            </label>
          </div>
        </div>
        <div className={s.addForm + ' ' + s.common + ' ' + s.mrg}>
          <EditableSpan
            title={name}
            onChange={(title: string) => dispatch(updateUserTC({ name: title }))}
          />
        </div>
        <div className={s.mrg}>{email}</div>
        <button
          className={s.btn + ' ' + s.mrg2}
          onClick={() => dispatch(logoutTC())}
          disabled={status === 'loading'}
        >
          <LogoutIcon /> <span className={s.logOut}>Log out</span>
        </button>
      </Paper>
    </div>
  );
};
