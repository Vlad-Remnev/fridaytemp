import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Login from "../common/components/Login";
import NewPassword from "../common/components/Login/NewPassword";
import PasswordRecovery from "../common/components/Login/PasswordRecovery";
import Profile from "../common/components/Profile";
import Registration from "../common/components/Registration";
import Error404 from "../common/pages/404";
import Header from "../common/components/Header";
import CheckEmail from "../common/components/Login/CheckEmail";

function App() {
  return (
    <div className="App">
        <Header />
        <div>
            Links to Project
            (созданы для удобного перехода)
            <ul>
                <li><Link to='/newPassword'> Форма нового пароля(готова стилистика)</Link></li>
                <li><Link to='/passwordRecovery'> Форма восстановления пароля(готова стилистика)</Link></li>
                <li><Link to='/checkEmail'> Форма проверить почту(готова стилистика)</Link></li>
                <li><Link to='/profile'> Форма профиля(готова стилистика)</Link></li>
                <li><Link to='/registration'> Форма регистрации</Link></li>
            </ul>
        </div>
        <div>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/newPassword' element={<NewPassword />}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/registration' element={<Registration />}/>
                <Route path='/checkEmail' element={<CheckEmail />}/>
                <Route path='*' element={<Error404 />}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
