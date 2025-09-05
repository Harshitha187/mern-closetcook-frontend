import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword'
import Emailverify from './pages/Emailverify'
import Navbar from './components/navbar'
import { AppProvider } from "./context/appcontext";
  import { ToastContainer, toast } from 'react-toastify';
import Test from './pages/Test'
const App = () => {

  return (
    <AppProvider>
      <ToastContainer />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          <Route path="/email-verify" element={<Emailverify />} />
          <Route path="/test" element={<Test/>} />

        </Routes>
      </div>
    </AppProvider>
  );
};
export default App;
