import React, {ChangeEvent, FC, useState} from 'react';
import s from './EditModal.module.css'
import {BasicModal} from "../BasicModal";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {updatePackTC} from "../../../../features/PackList/packsListReducer";

type EditModalType = {
    id: string
}

export const EditModal:FC<EditModalType> = ({id}) => {
    const [name, setName] = useState('')
    const [privat, setPrivat] = useState(false)
    const dispatch = useDispatch<AppDispatchType>();

    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.currentTarget.value)
    }

    const updatePack = (handleClose: () => void) => {
        dispatch(updatePackTC({_id: id, name, private: privat}))
        setName('')
        handleClose()
    }

    return (
        <BasicModal children2={<BorderColorIcon sx={{ marginRight: "20px" }} />}>
            {(handleClose) => <>
                <div className={s.header}>
                    <div>Edit pack</div>
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
                        <button className={s.cancelBtn} onClick={handleClose}>Cancel</button>
                        <button className={s.saveBtn} onClick={() => updatePack(handleClose)}>Save</button>
                    </div>
                </div>
            </>
            }
        </BasicModal>
    );
};