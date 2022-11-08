import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import NewPassword from "./pages/Login/NewPassword";
import PasswordRecovery from "./pages/Login/PasswordRecovery";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Error404 from "./pages/404";

function App() {
  return (
    <div className="App">
      <h1>Friday Project</h1>
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
