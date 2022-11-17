import React, {FC, useState} from 'react';
import TextField from "@mui/material/TextField";
import s from "./Password.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordFormType = {
    setPassword: (password: string) => void
}

const PasswordForm: FC<PasswordFormType> = ({setPassword}) => {
    const [type, setType] = useState('password');

    const eyeStyles = {
        position: 'absolute',
        top: '20px',
        right: '10px',
    };

    const handleToggle = () => {
        if (type === 'password') {
            setType('text');
        } else {
            setType('password');
        }
    };


    return (
        <>
            <TextField
                    label="Password"
                    type={type}
                    color="info"
                    variant="standard"
                    helperText=" "
                    sx={{width: '300px'}}
                    onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                    FormHelperTextProps={{
                        className: s.helperText + ' ' + s.mrg2,
                    }}
                />
            {type === 'password' ? (
                <RemoveRedEyeIcon sx={eyeStyles} onClick={handleToggle}/>
            ) : (
                <VisibilityOffIcon sx={eyeStyles} onClick={handleToggle}/>
            )}
        </>
    );
};

export default PasswordForm;