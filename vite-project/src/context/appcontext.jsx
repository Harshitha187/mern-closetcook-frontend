import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_backend_url;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [verifyotp,setverifyotp]=useState(null);
  const getAuthentication=async()=>{
try{
  const {data}=await axios.get(backendUrl+'/api/auth/isAuthenticated')
  data.success?(setIsLoggedin(true),getUserData()):setIsLoggedin(false)
}
catch(error){
  toast.error(error.message)
}
  };
  useEffect(()=>{
getAuthentication();
  },[]);
const getUserData=async()=>{
  try{
    axios.defaults.withCredentials = true;
    const {data}=await axios.get(backendUrl+'/api/user/data')
    data.success?setUserData(data.userData):toast.error(data.message)
  }
  catch(error){
toast.error(error.message)
  }
};
  const value = { backendUrl, isLoggedin, setIsLoggedin, userData, setUserData,getUserData,verifyotp,setverifyotp };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
