import React, {FC, useState} from 'react';
import s from './AddModal.module.css'
import {BasicModal} from "../../BasicModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import {addPackTC} from "../../../../../features/PackList/packsListReducer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SuperButton from "../../../SuperButton/SuperButton";
import {RequestStatusType} from "../../../../../app/appReducer";
import baseCover from "../../../../../assets/img/1647366034_12-gamerwall-pro-p-geim-arti-krasivie-oboi-22 (1) (1).jpg";
import AggFileJpg from "../../AddFileJPG/AggFileJpg";
import TextFieldInModals from "../../TextFieldInModals/TextFieldInModals";
import HeaderInModals from "../../HeaderInModals/HeaderInModals";

type AddModalType = {
  page: number
  status: RequestStatusType
}

export const AddModal: FC<AddModalType> = ({page, status}) => {
  const [name, setName] = useState('')
  const [privateProp, setPrivateProp] = useState(false)
  const [packImg, setPackImg] = useState<string>('')

  const dispatch = useDispatch<AppDispatchType>();
  const disabledButton = status === 'loading'

  const addPackHandler = (handleClose: () => void) => {
    dispatch(addPackTC({name, private: privateProp, deckCover: packImg}, page))
    setName('')
    setPackImg('')
    handleClose()
  }

  return (
    <BasicModal
      children2={<SuperButton disabled={disabledButton}
                              className={disabledButton ? s.wrapper__btnDisabled : s.wrapper__btn}>Add new
        pack</SuperButton>}>
      {(handleClose) => <>
        <HeaderInModals handleClose={handleClose}>
          Add new pack
        </HeaderInModals>
        <div className={s.container}>
          <AggFileJpg callback={setPackImg} id={'input_add_photo'}>
            Cover
          </AggFileJpg>
          <div className={s.packImg}>
            <img src={packImg ? packImg : baseCover} alt="PackImg photo"/>
          </div>
          <div className={s.textField}>
            <TextFieldInModals value={name} callBack={setName} label={'Name Pack'}/>
          </div>
          <div className={s.private}>
            <FormControlLabel
              control={<Checkbox checked={privateProp} onChange={(e) => setPrivateProp(e.currentTarget.checked)}/>}
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