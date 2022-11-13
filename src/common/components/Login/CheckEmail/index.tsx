import React from 'react';
import s from "./CheckEmail.module.css";
import {Button, Paper} from "@mui/material";
import checkEmail from "./../../../../assets/img/emailCheck.svg";

const CheckEmail = () => {
    const buttonStyles = {
        width: '100%',
        background: "#366EFF",
        boxShadow: "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
        borderRadius: "30px",
        marginTop: '40px',
        textTransform: 'none'
    }
    return (
        <div className={s.container}>
            <Paper elevation={1} className={s.paper + ' ' + s.common}>
                <h2 className={s.title}>Check Email</h2>
                <div className={s.logo}>
                    <img src={checkEmail} alt="checkEmail"/>
                </div>
                <div className={s.helperText}>
                    We’ve sent an Email with instructions to example@mail.com
                </div>
                <Button variant="contained" sx={buttonStyles}>
                    Back to login
                </Button>
            </Paper>
        </div>
    );
};

export default CheckEmail;