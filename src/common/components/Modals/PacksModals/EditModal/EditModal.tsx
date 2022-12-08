import React, {FC, useState} from 'react';
import s from './EditModal.module.css'
import {BasicModal} from "../../BasicModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {updatePackTC} from "../../../../../features/PackList/packsListReducer";
import SuperButton from "../../../SuperButton/SuperButton";
import baseCover from "../../../../../assets/img/ava.png";
import AggFileJpg from "../../AddFileJPG/AggFileJpg";
import TextFieldInModals from "../../TextFieldInModals/TextFieldInModals";
import HeaderInModals from "../../HeaderInModals/HeaderInModals";

type EditModalType = {
  id: string
  packName: string
  deckCover: string
}

export const EditModal: FC<EditModalType> = ({id, packName, deckCover}) => {
  const [name, setName] = useState(packName)
  const [privateProp, setPrivateProp] = useState(false)
  const [packImg, setPackImg] = useState<string>(deckCover)

  const dispatch = useDispatch<AppDispatchType>();

  const updatePack = (handleClose: () => void) => {
    dispatch(updatePackTC({_id: id, name, private: privateProp, deckCover: packImg}))
    setName('')
    handleClose()
  }

  return (
    <BasicModal children2={<BorderColorIcon sx={{marginRight: "20px"}}/>}>
      {(handleClose) => <>
        <HeaderInModals handleClose={handleClose}>
          Edit pack
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
            <SuperButton className={s.saveBtn} onClick={() => updatePack(handleClose)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};