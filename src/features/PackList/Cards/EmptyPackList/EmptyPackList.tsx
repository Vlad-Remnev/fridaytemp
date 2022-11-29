import React from 'react';
import s from './EmptyPackList.module.css'
import SuperButton from "../../../../common/components/SuperButton/SuperButton";
import {RequestStatusType} from "../../../../app/appReducer";

type EmptyPackListType = {
  buttonName: string
  addNewCardHandler: () => void
  packName: string
  status: RequestStatusType
}
export const EmptyPackList = ({buttonName, addNewCardHandler, packName, status}: EmptyPackListType) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>{packName}</h2>
      <div className={s.emptyPack}>
        <p className={s.text}>This pack is empty. Click add new card to fill this pack</p>
        <SuperButton
          disabled={status === 'loading'}
          className={ status === 'loading' ? s.btnDisabled : s.btn}
          onClick={addNewCardHandler}
        >
        {buttonName}
      </SuperButton>
      </div>
    </div>
  );
};

