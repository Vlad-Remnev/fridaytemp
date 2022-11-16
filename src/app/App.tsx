import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NewPassword from '../features/Login/NewPassword/NewPassword';
import PasswordRecovery from '../features/Login/PasswordRecovery/PasswordRecovery';
import Profile from '../features/Profile/Profile';
import SignUp from '../features/Registration/SignUp';
import Error404 from '../common/pages/404/404';
import Header from '../common/components/Header/Header';
import CheckEmail from '../features/Login/CheckEmail/CheckEmail';
import Login from '../features/Login/SignIn/SignIn';

function App() {
  return (
    <div className="App">
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
            <Link to="/profile"> Форма профиля(готова стилистика)</Link>
          </li>
          <li>
            <Link to="/registration"> Форма регистрации</Link>
          </li>
          <li>
            <Link to="/"> Форма логина</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/passwordRecovery/:token" element={<PasswordRecovery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/checkEmail" element={<CheckEmail />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
