import React, {ChangeEvent, FC, useState} from 'react';
import s from './EditModal.module.css'
import {BasicModal} from "../../BasicModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {updatePackTC} from "../../../../../features/PackList/packsListReducer";
import SuperButton from "../../../SuperButton/SuperButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import baseCover from "../../../../../assets/img/ava.png";
import {minFileSize} from "../../../../../features/Profile/Profile";
import {convertFileToBase64} from "../../../../utils/convertFileToBase64";
import {setAppErrorAC} from "../../../../../app/appReducer";

type EditModalType = {
  id: string
  packName: string
  deckCover: string
}

export const EditModal: FC<EditModalType> = ({id, packName, deckCover}) => {
  const [name, setName] = useState(packName)
  const [privat, setPrivat] = useState(false)
  const [packImg, setPackImg] = useState<string>(deckCover)
  const dispatch = useDispatch<AppDispatchType>();

  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value)
  }

  const updatePack = (handleClose: () => void, file64: string) => {
    dispatch(updatePackTC({_id: id, name, private: privat, deckCover: file64}))
    setName('')
    setPackImg(file64)
    handleClose()
  }

  const changeHandlerPackImg = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          setPackImg(file64)
        });
      } else {
        dispatch(setAppErrorAC('File is too BIG'));
      }
    }
  };
  return (
    <BasicModal children2={<BorderColorIcon sx={{marginRight: "20px"}}/>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Edit pack</div>
          <div onClick={handleClose}>X</div>
        </div>
        <div className={s.container}>
          <div className={s.packTitle}>
            <div>Cover</div>
            <div>
              <input
                id={'input_add_photo'}
                type={'file'}
                style={{display: 'none'}}
                accept={'image/**'}
                onChange={changeHandlerPackImg}
              />
              <label htmlFor="input_add_photo">
                <AddAPhotoIcon />
              </label>
            </div>
          </div>
          <div className={s.packImg}>
            <img src={packImg ? packImg : baseCover} alt="PackImg photo"/>
          </div>
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
            <SuperButton className={s.saveBtn} onClick={() => updatePack(handleClose, packImg)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};