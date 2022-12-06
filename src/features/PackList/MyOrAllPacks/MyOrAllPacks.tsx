import React, {FC, useState} from 'react';
import s from "./MyOrAllPacks.module.css";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {RequestStatusType} from "../../../app/appReducer";
import {fetchPacksTC, isUserPacksAC} from "../packsListReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../app/store";

type MyOrAllPacksType = {
  page: number
  value: number[]
  user_Id: string
  searchValue: string
  status: RequestStatusType
  rowsPerPage: number
  btnColor: boolean
  setBtnColor: (btnColor: boolean) => void
}

const MyOrAllPacks: FC<MyOrAllPacksType> = ({ status, page, value, user_Id, rowsPerPage, searchValue, btnColor, setBtnColor}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const filterByUser = () => {
    setBtnColor(true);
    dispatch(isUserPacksAC(true))
    dispatch(fetchPacksTC({
      page: page,
      min: value[0],
      max: value[1],
      packName: searchValue,
      user_id: user_Id,
      pageCount: rowsPerPage
    }))
  };

  const filterByAll = () => {
    setBtnColor(false);
    dispatch(isUserPacksAC(false))
    dispatch(fetchPacksTC({page: page, min: value[0], max: value[1], packName: searchValue, pageCount: rowsPerPage}))
  };

  const disabledButton = status === 'loading'
  return (
    <div className={s.packRender}>
      <div className={s.title}>Show packs cards</div>
      <div className={s.btnGroup}>
        <SuperButton
          disabled={disabledButton}
          className={btnColor ? s.btnOff : s.btnOn}
          onClick={filterByUser}
        >
          My
        </SuperButton>
        <SuperButton
          disabled={disabledButton}
          className={btnColor ? s.btnOn : s.btnOff}
          onClick={filterByAll}
        >
          All
        </SuperButton>
      </div>
    </div>
  );
};

export default MyOrAllPacks;