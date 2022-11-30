import React, {FC} from 'react';
import s from "./DeleteCardModal.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../../app/store";
import {BasicModal} from "../../BasicModal";
import {removeCardTC} from "../../../../../features/PackList/Cards/cardsPeducer";

type DeleteModuleType = {
    id: string
    packId?: string
    name: string
}

const DeleteCardModal: FC<DeleteModuleType> = ({id, name, packId}) => {
    const dispatch = useDispatch<AppDispatchType>();

    const removePack = () => {
        packId && dispatch(removeCardTC(id, {cardsPack_id: packId}))
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
                        <button className={s.cancelBtn} onClick={handleClose}>Cancel</button>
                        <button className={s.deleteBtn} onClick={removePack}>Delete
                        </button>
                    </div>
                </div>
            </>
            }
        </BasicModal>
    );
};

export default DeleteCardModal;