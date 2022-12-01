import React, {FC} from 'react';
import s from "./DeleteCardModal.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import {BasicModal} from "../../BasicModal";
import {removeCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";
import SuperButton from "../../../SuperButton/SuperButton";

type DeleteModuleType = {
  id: string
  packId?: string
  name: string
  rowsPerPage: number
}

const DeleteCardModal: FC<DeleteModuleType> = ({id, name, packId, rowsPerPage}) => {
  const dispatch = useDispatch<AppDispatchType>();

  const removePack = () => {
    packId && dispatch(removeCardTC(id, {cardsPack_id: packId, pageCount: rowsPerPage}))
  }

  return (
    <BasicModal children2={<DeleteIcon sx={{marginRight: "20px"}}/>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Delete pack</div>
          <div onClick={handleClose}>X</div>
        </div>
        <div>
          <div className={s.text}>
            <div>Do you really want to remove {name}?</div>
            <div>All cards will be deleted.</div>
          </div>
          <div className={s.btnGroup}>
            <SuperButton className={s.cancelBtn} onClick={handleClose}>Cancel</SuperButton>
            <SuperButton className={s.deleteBtn} onClick={removePack}>Delete
            </SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};

export default DeleteCardModal;