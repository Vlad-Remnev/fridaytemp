import React, {useEffect} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NewPassword from '../features/Login/NewPassword/NewPassword';
import PasswordRecovery from '../features/Login/PasswordRecovery/PasswordRecovery';
import Profile from '../features/Profile/Profile';
import SignUp from '../features/Registration/SignUp';
import Error404 from '../common/pages/404/404';
import Header from '../common/components/Header/Header';
import CheckEmail from '../features/Login/CheckEmail/CheckEmail';
import Login from '../features/Login/SignIn/SignIn';
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./authReducer";
import {AppThunkType} from "./store";

function App() {
  const dispatch = useDispatch<AppThunkType>()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <div className="App">
      <ErrorSnackbar/>
      <Header />
      <div>
        Links to Project (созданы для удобного перехода)
        <ul>
          <li>
            <Link to="/newPassword"> Форма нового пароля(готова стилистика)</Link>
          </li>
          <li>
            <Link to="/passwordRecovery"> Форма восстановления пароля(готова стилистика)</Link>
          </li>
          <li>
            <Link to="/checkEmail"> Форма проверить почту(готова стилистика)</Link>
          </li>
          <li>
            <Link to="/"> Форма профиля(готова стилистика)</Link>
          </li>
          <li>
            <Link to="/registration"> Форма регистрации</Link>
          </li>
          <li>
            <Link to="/login"> Форма логина</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/passwordRecovery" element={<PasswordRecovery />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/checkEmail" element={<CheckEmail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
