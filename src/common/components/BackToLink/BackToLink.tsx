import React from 'react';
import {useNavigate} from "react-router-dom";
import {ROUTS} from "../../../app/App";
import s from './BackToLink.module.css'

export const BackToLink = () => {
    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate(ROUTS.PACK_LIST)}} className={s.container}>
            <i className={s.left}></i>
            Back to Pack List
        </div>
    );
};
