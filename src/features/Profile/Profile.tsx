import React from 'react';
import s from './Profile.module.css';
import avatar from '../../assets/img/ava.png';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Paper } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import EditableSpan from '../../common/components/EditableSpan/EditableSpan';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { UserDataType } from '../../app/appApi';

const Profile = () => {
  const userData = useSelector<AppRootStateType, UserDataType>((state) => state.auth.userData);
  return (
    <div className={s.container}>
      <Link to="/" className={s.link + ' ' + s.mrg2}>
        <ArrowRightAltIcon className={s.arrow} />
        Back to Pack List
      </Link>
      <Paper elevation={1} className={s.paper + ' ' + s.common}>
        <h2 className={s.title}>Personal Information</h2>
        <div className={s.avatar}>
          <img src={avatar} alt="Profile photo" />
          <div className={s.addPhoto + ' ' + s.common}>
            <AddAPhotoIcon />
          </div>
        </div>
        <div className={s.addForm + ' ' + s.common + ' ' + s.mrg}>
          <EditableSpan title={userData.name} onChange={() => {}} />
        </div>
        <div className={s.mrg}>{userData.email}</div>
        <button className={s.btn + ' ' + s.mrg2}>
          <LogoutIcon /> <span className={s.logOut}>Log out</span>
        </button>
      </Paper>
    </div>
  );
};

export default Profile;
