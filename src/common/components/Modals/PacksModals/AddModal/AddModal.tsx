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
import {RequestStatusType, setAppErrorAC} from "../../../../../app/appReducer";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import baseCover from "../../../../../assets/img/ava.png";
import {convertFileToBase64} from "../../../../utils/convertFileToBase64";
import {minFileSize} from "../../../../../features/Profile/Profile";

type AddModalType = {
  page: number
  status: RequestStatusType
}

export const AddModal: FC<AddModalType> = ({page, status}) => {
  const [name, setName] = useState('')
  const [privat, setPrivat] = useState(false)
  const [packImg, setPackImg] = useState<string>('')

  const dispatch = useDispatch<AppDispatchType>();
  const disabledButton = status === 'loading'

  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.currentTarget.value)
  }

  const addPackHandler = (handleClose: () => void, file64: string) => {
    dispatch(addPackTC({name, private: privat, deckCover: file64}, page))
    setName('')
    setPackImg('')
    handleClose()
  }

  const uploadHandlerPackImg = (e: ChangeEvent<HTMLInputElement>): void => {
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
    <BasicModal
      children2={<SuperButton disabled={disabledButton}
                              className={disabledButton ? s.wrapper__btnDisabled : s.wrapper__btn}>Add new
        pack</SuperButton>}>
      {(handleClose) => <>
        <div className={s.header}>
          <div>Add new pack</div>
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
                onChange={uploadHandlerPackImg}
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
                       sx={{width: '100%'}} onChange={changePackNameHandler}
            />
          </div>
          <div className={s.private}>
            <FormControlLabel
              control={<Checkbox checked={privat} onChange={(e) => setPrivat(e.currentTarget.checked)}/>}
              label="Private pack"/>
          </div>
          <div className={s.btnGroup}>
            <SuperButton className={s.cancelBtn} onClick={handleClose}>Cancel</SuperButton>
            <SuperButton className={s.saveBtn} onClick={() => addPackHandler(handleClose, packImg)}>Save</SuperButton>
          </div>
        </div>
      </>
      }
    </BasicModal>
  );
};