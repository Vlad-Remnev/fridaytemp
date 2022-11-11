import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../common/components/Login";
import NewPassword from "../common/components/Login/NewPassword";
import PasswordRecovery from "../common/components/Login/PasswordRecovery";
import Profile from "../common/components/Profile";
import Registration from "../common/components/Registration";
import Error404 from "../common/pages/404";
import Header from "../common/components/Header";

function App() {
  return (
    <div className="App">
        <Header />
        <div>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/newPassword' element={<NewPassword />}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/registration' element={<Registration />}/>
                <Route path='*' element={<Error404 />}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
