import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AppContext } from '../context/appcontext';
import { useNavigate } from 'react-router-dom';

const Emailverify = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [otpSent, setOtpSent] = useState(false); 
  const [otp, setOtp] = useState("");

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verifyotp',{},{
  withCredentials: true,
});
      if (data.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getverifyotp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verifyemail', { otp },{
  withCredentials: true,
});
      if (data.success) {
        toast.success("OTP verified successfully");
         setIsLoggedin(true);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="items-center justify-center min-h-screen flex flex-col">
      <div className="shadow-lg opacity-90 gap-8 flex flex-col items-center justify-center h-90 w-180 bg-slate-900 rounded-lg p-8">
        <form className="items-center mb-4 flex flex-col">
          <h1 className="font-semibold text-md mb-4">
            Enter the One-Time-Password sent to your registered mail
          </h1>
          <input
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            placeholder="OTP"
            className="border border-gray-200 mb-4 p-2 rounded"
            disabled={!otpSent} // only allow typing after OTP is sent
          />
          {!otpSent && (
            <button
              type="button" onClick={getOtp}
              className="border-gray-200 p-4 px-10 rounded-full h-15 w-50 bg-indigo-800 font-medium hover:bg-gray-50"
            >
              Get OTP
            </button>
          )}
          {otpSent && (
            <button
              type="button"
              onClick={getverifyotp}
              className="border-gray-200 p-4 px-10 rounded-full h-15 w-50 bg-indigo-800 font-medium hover:bg-gray-50"
            >
              Submit OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Emailverify;
