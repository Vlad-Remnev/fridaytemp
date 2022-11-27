import React from 'react';
import s from './Add.module.css'
import {BasicModal} from "../BasicModal";
import {FormControlLabel, TextField} from "@mui/material";
import {Checkbox} from '@mui/material';

export const AddModal = () => {
    return (
        <BasicModal>
            <div className={s.header}>
                <div>Add new pack</div>
                <div>X</div>
            </div>
            <div>
                <div>
                    <TextField variant="standard" label="Name Pack" placeholder="Write a name"/>
                </div>
                <div>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Private pack" />
                </div>
            </div>
        </BasicModal>
    );
};