import React, {FC} from 'react';
import s from "./MyOrAllPacks.module.css";
import SuperButton from "../../../common/components/SuperButton/SuperButton";

type MyOrAllPacksType = {
  btnColor: boolean
  filterByUser: () => void
  filterByAll: () => void
}

const MyOrAllPacks: FC<MyOrAllPacksType> = ({btnColor, filterByAll, filterByUser}) => {
  return (
    <div className={s.packRender}>
      <div className={s.title}>Show packs cards</div>
      <div className={s.btnGroup}>
        <SuperButton
          className={btnColor ? s.btnOff : s.btnOn}
          onClick={filterByUser}
        >
          My
        </SuperButton>
        <SuperButton
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