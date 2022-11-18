import React, { ChangeEvent } from 'react';
import s from './Profile.module.css';
import avatar from '../../assets/img/ava.png';

import EditableSpan from '../../common/components/EditableSpan/EditableSpan';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from '../../app/store';
import { UserDataType } from '../../app/appApi';
import { logoutTC } from '../../app/authReducer';
import { updateUserTC } from './profileReducer';
import { setAppErrorAC } from '../../app/appReducer';

// import MUI
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';

const convertFileToBase64 = (file: File, callback: (value: string) => void): void => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const file64 = reader.result as string;
    callback(file64);
  };
  reader.readAsDataURL(file);
};

const Profile = () => {
  const dispatch = useDispatch<AppThunkType>();
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
  const userData = useSelector<AppRootStateType, UserDataType>((state) => state.profile.userData);

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
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Personal Information</h2>
        <div className={s.avatar}>
          <img src={userData.avatar ? userData.avatar : avatar} alt="Profile photo" />
          <div className={s.addPhoto + ' ' + s.common}>
            <input id={'input_add_photo'} type={'file'} style={{ display: 'none' }} accept={'image/**'} onChange={uploadHandlerAvatar} />
            <label htmlFor="input_add_photo">
              <AddAPhotoIcon />
            </label>
          </div>
        </div>
        <div className={s.addForm + ' ' + s.common + ' ' + s.mrg}>
          <EditableSpan title={userData.name} onChange={(title: string) => dispatch(updateUserTC({ name: title }))} />
        </div>
        <div className={s.mrg}>{userData.email}</div>
        <button className={s.btn + ' ' + s.mrg2} onClick={() => dispatch(logoutTC())}>
          <LogoutIcon /> <span className={s.logOut}>Log out</span>
        </button>
      </Paper>
    </div>
  );
};

export default Profile;
