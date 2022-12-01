import React, {FC} from 'react';
import s from './EmptyPackList.module.css'
import {RequestStatusType} from "../../../../app/appReducer";
import AddCardModal from "../../../../common/components/Modals/CardsModals/AddCardModal/AddCardModal";

type EmptyPackListType = {
  buttonName: string
  packName: string
  packId?: string
  status: RequestStatusType
  rowsPerPage: number
}
export const EmptyPackList: FC<EmptyPackListType> = ({buttonName, packName, status, packId, rowsPerPage} ) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>{packName}</h2>
      <div className={s.emptyPack}>
        <p className={s.text}>This pack is empty. Click add new card to fill this pack</p>
        <AddCardModal packId={packId} rowsPerPage={rowsPerPage}/>
      </div>
    </div>
  );
};

