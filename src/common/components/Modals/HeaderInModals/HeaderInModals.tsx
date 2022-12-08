import React, {FC, ReactNode} from 'react';
import s from "../CardsModals/AddCardModal/AddCardModal.module.css";

type HeaderInModalsType = {
  children: ReactNode
  handleClose: () => void
}
const HeaderInModals: FC<HeaderInModalsType> = ({children, handleClose}) => {
  return (
    <div className={s.header}>
      <div>{children}</div>
      <div style={{cursor: 'pointer'}} onClick={handleClose}>X</div>
    </div>
  );
};

export default HeaderInModals;