import React, {FC} from 'react';
import s from "./DeleteModal.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../../../../app/store";
import {BasicModal} from "../../BasicModal";
import {removePackTC} from "../../../../../features/PackList/packsListReducer";
import SuperButton from "../../../SuperButton/SuperButton";
import {IconButton} from "@mui/material";

type DeleteModuleType = {
  id: string
  name: string
}

const DeleteModal: FC<DeleteModuleType> = ({id, name}) => {
  const dispatch = useDispatch<AppDispatchType>();

  const status = useAppSelector(state => state.app.status)
  const disabledButton = status === 'loading'

  const removePack = () => {
    dispatch(removePackTC(id))
  }

  return (
    <BasicModal children2={<IconButton color={"inherit"} disabled={disabledButton}><DeleteIcon/></IconButton>}>
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

export default DeleteModal;