import React from "react";
import s from "./PasswordRecovery.module.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../Profile/profileReducer";
import {useDispatch} from "react-redux";
import {AppThunkType} from "../../../app/store";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const PasswordRecovery = () => {
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const dispatch = useDispatch<AppThunkType>();
    const {token} = useParams()
    console.log(token)

  let navigate = useNavigate()
  const tokenChange = () => {
      if (token) {
        dispatch(setNewPasswordTC({password: values.password, resetPasswordToken: token}))
      }
    navigate('/login')
  }

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const buttonStyles = {
    width: "100%",
    background: "#366EFF",
    boxShadow:
      "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
    borderRadius: "30px",
    marginTop: "30px",
    textTransform: "none",
  };
  return (
    <div>
      <div className={s.container}>
        <Paper elevation={1} className={s.paper + " " + s.common}>
          <h2 className={s.title}>Create new password</h2>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={s.helperText}>
            Create new password and we will send you further instructions to
            email
          </div>
          <Button variant="contained" sx={buttonStyles} onClick={tokenChange}>
            Create new password
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default PasswordRecovery;
