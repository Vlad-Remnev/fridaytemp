import React from 'react';
import s from './Header.module.css';
import logo from '../../../assets/img/logo.svg';
import { useAppSelector } from '../../../app/store';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { name, avatar } = useAppSelector((state) => state.profile.userData);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <div className={s.container}>
      {isLoggedIn ? (
        <>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <Link to="/" className={s.profileLink}>
            <div className={s.name}>{name}</div>
            <div>
              <img src={avatar ? avatar : avatar} className={s.avatar} alt="" />
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
