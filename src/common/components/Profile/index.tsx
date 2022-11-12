import React from 'react';
import s from './Profile.module.css'
import avatar from '../../../assets/img/ava.png'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {Button, IconButton, Paper} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import EditableSpan from "../EditableSpan";

const Profile = () => {
    return (
        <div className={s.container + ' ' + s.common}>
            <Paper elevation={1} className={s.paper + ' ' + s.common}>
                <h2>Personal Information</h2>
                <div className={s.avatar}>
                    <img src={avatar} alt="Profile photo"/>
                    <div className={s.addPhoto + ' ' + s.common}>
                        <AddAPhotoIcon/>
                    </div>
                </div>
                <div className={s.addForm + ' ' + s.common + ' ' + s.mrg}>
                    <EditableSpan title='Ivan' onChange={() => {}}/>
                </div>
                <div className={s.mrg}>
                    someEmail@gmail.com
                </div>
                <button className={s.btn + ' ' + s.mrg2}>
                    <LogoutIcon/> <span className={s.logOut}>Log out</span>
                </button>
            </Paper>
        </div>
    );
};

export default Profile;