import React from 'react';
import s from './Header.module.css'
import logo from '../../../assets/img/logo.svg'

const Header = () => {
    return (
        <div className={s.container}>
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <div>
                <button className={s.btn}>Sign in</button>
            </div>
        </div>
    );
};

export default Header;