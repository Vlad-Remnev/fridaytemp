import React, {FC} from 'react';
import s from "./MyOrAllPacks.module.css";
import SuperButton from "../../../common/components/SuperButton/SuperButton";
import {RequestStatusType} from "../../../app/appReducer";

type MyOrAllPacksType = {
  btnColor: boolean
  filterByUser: () => void
  filterByAll: () => void
  status: RequestStatusType
}

const MyOrAllPacks: FC<MyOrAllPacksType> = ({btnColor, filterByAll, filterByUser, status}) => {
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