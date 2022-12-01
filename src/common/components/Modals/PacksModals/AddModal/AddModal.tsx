import React, {ChangeEvent, FC, useState} from 'react';
import s from './AddModal.module.css'
import {BasicModal} from "../../BasicModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import {addPackTC} from "../../../../../features/PackList/packsListReducer";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SuperButton from "../../../SuperButton/SuperButton";
import {RequestStatusType} from "../../../../../app/appReducer";

type AddModalType = {
  page: number
  status: RequestStatusType
}

export const AddModal: FC<AddModalType> = ({page, status}) => {
  const [name, setName] = useState('')
  const [privat, setPrivat] = useState(false)
  const dispatch = useDispatch<AppDispatchType>();
  const disabledButton = status === 'loading'
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value)
  }

  const addPackHandler = (handleClose: () => void) => {
    dispatch(addPackTC({name, private: privat}, page))
    setName('')
    handleClose()
  }

  return (
    <BasicModal
      children2={<SuperButton disabled={disabledButton}
                              className={disabledButton ? s.wrapper__btnDisabled : s.wrapper__btn}>Add new
        pack</SuperButton>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Add new pack</div>
          <div onClick={handleClose}>X</div>
        </div>
        <div>
          <div className={s.textField}>
            <TextField value={name} variant="standard" label="Name Pack" placeholder="Write a name"
                       sx={{width: '100%'}} onChange={changePackNameHandler}/>
          </div>
          <div className={s.private}>
            <FormControlLabel
              control={<Checkbox checked={privat} onChange={(e) => setPrivat(e.currentTarget.checked)}/>}
              label="Private pack"/>
          </div>
          <div className={s.btnGroup}>
            <SuperButton className={s.cancelBtn} onClick={handleClose}>Cancel</SuperButton>
            <SuperButton className={s.saveBtn} onClick={() => addPackHandler(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};