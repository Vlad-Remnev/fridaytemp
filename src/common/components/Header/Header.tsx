import React from 'react';
import s from './Header.module.css';
import logo from '../../../assets/img/logo.svg';
import avatar from '../../../assets/img/ava.png';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { UserDataType } from '../../../app/appApi';
import { Link } from 'react-router-dom';

const Header = () => {
  const userData = useSelector<AppRootStateType, UserDataType>((state) => state.profile.userData);
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
  return (
    <div className={s.container}>
      {isLoggedIn ? (
        <>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <Link to="/" className={s.profileLink}>
            <div className={s.name}>{userData.name}</div>
            <div>
              <img src={userData.avatar ? userData.avatar : avatar} className={s.avatar} alt="" />
            </div>
          </Link>
        </>
      ) : (
        <>
          <div>
            <Link to="/login">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <button className={s.btn}>
            <Link to="/login" className={s.name}>
              Sign in
            </Link>
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
