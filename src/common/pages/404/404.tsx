import React from 'react';
import s from './Error404.module.css';

function Error404() {
  return (
    <div className={s.screen}>
      <div className={s.container}>
        <h1 className={s.error}>
          <span>Error - 404</span>
        </h1>
        <p className={s.text}>To solve the error take the following measures:</p>
        <ul className={s.ul}>
          <li>Check your network connection</li>
          <li>Enter the correct address</li>
          <li>Try to come back later</li>
        </ul>
      </div>
    </div>
  );
}

export default Error404;
