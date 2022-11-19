import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar';
import { useDispatch } from 'react-redux';
import { AppThunkType, useAppSelector } from './store';
import { isInitializedAppTC } from './appReducer';
import { CircularProgress } from '@mui/material';
import { NewPassword } from '../features/Login/NewPassword/NewPassword';
import { Header } from '../common/components/Header/Header';
import { CheckEmail } from '../features/Login/CheckEmail/CheckEmail';
import { Error404 } from '../common/pages/404/404';
import { SignUp } from '../features/Registration/SignUp';
import { PasswordRecovery } from '../features/Login/PasswordRecovery/PasswordRecovery';
import { Profile } from '../features/Profile/Profile';
import { Login } from '../features/Login/SignIn/SignIn';

export function App() {
  const dispatch = useDispatch<AppThunkType>();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  useEffect(() => {
    dispatch(isInitializedAppTC());
  }, []);
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', width: '100%', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/passwordRecovery/:token" element={<PasswordRecovery />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/checkEmail" element={<CheckEmail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}
// Общие правила по эстетике кода:
// 1. В reducer ставим возвращаемый тип всегда
// 2. В useState простые типы возвращаемые не типизируем, это выглядит излишне
// 3. Не жалейте enter между участками кода, где необходимо, так код лучше читается
// 4. Все стили убирать из тегов и выводить в css (Валера советует, типо это профессиональнее)
// 5. Аргументы в функциях которые ждут какой-то объект обзываем однотипно (у нас это data)
// 6. Папка idea должна быть занесена в ignore
// 7. Где присутствует тяжелый функционал (глаз сразу не улавливает логику) необходимо оставлять комментарии на английском языке
// 8. type в reducer пишем чере нижний пробел 'profile/ADD_USER_DATA'
// 9. export прописываем перед каждой компонентой, по дефолту экспорта избегать
// 10. Используем при доставании параметров из стейта useAppSelector ( я его достал в store, глянете)
// 11. Если в компоненте требуется какая-то переменная из стейта, то достаём только ее, а не весь объект в котором она лежит (пример в Profile)
// 12.
