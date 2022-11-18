import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NewPassword from '../features/Login/NewPassword/NewPassword';
import PasswordRecovery from '../features/Login/PasswordRecovery/PasswordRecovery';
import Profile from '../features/Profile/Profile';
import SignUp from '../features/Registration/SignUp';
import Error404 from '../common/pages/404/404';
import Header from '../common/components/Header/Header';
import CheckEmail from '../features/Login/CheckEmail/CheckEmail';
import Login from '../features/Login/SignIn/SignIn';
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkType } from './store';
import { isInitializedAppTC } from './appReducer';
import { CircularProgress } from '@mui/material';

function App() {
  const dispatch = useDispatch<AppThunkType>();
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized);
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
export default App;
