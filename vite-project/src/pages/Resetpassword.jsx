import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AppContext } from '../context/appcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resetpassword = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserData } = useContext(AppContext);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [pass, setNewPass] = useState("");
  const [otp, setOtp] = useState("");

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
  const { data } = await axios.post(backendUrl + '/api/auth/resetpassword');
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
      axios.defaults.withCredentials = true;
  const { data } = await axios.post(backendUrl + '/api/auth/verifyreset', { otp });
      if (data.success) {
        toast.success("OTP verified successfully");
        setOtpVerified(true);
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitPass = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
  const { data } = await axios.post(backendUrl + '/api/auth/changepassword', { newpass: pass });
      if (data.success) {
        toast.success("Password reset successfully");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="items-center justify-center min-h-screen bg-[url('/src/assets/bgp.jpg')] bg-cover bg-center flex flex-col">
      <div className="shadow-lg opacity-90 gap-8 flex flex-col items-center justify-center h-90 w-180 bg-slate-900 rounded-lg p-8">
        <form className="items-center mb-4 flex flex-col">
          <h1 className="font-semibold text-md mb-4">
            {!otpVerified
              ? 'Enter the One-Time-Password sent to your registered mail'
              : 'Enter your new password'}
          </h1>

          {/* OTP input */}
          {!otpVerified && (
            <>
              <input
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                placeholder="OTP"
                className="border border-gray-200 mb-4 p-2 rounded"
                disabled={!otpSent}
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={getOtp}
                  className="border-gray-200 p-4 px-10 rounded-full h-15 w-50 bg-indigo-800 font-medium hover:bg-gray-50"
                >
                  Get OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={getverifyotp}
                  className="border-gray-200 p-4 px-10 rounded-full h-15 w-50 bg-indigo-800 font-medium hover:bg-gray-50"
                >
                  Submit OTP
                </button>
              )}
            </>
          )}

          {/* Password input after OTP verification */}
          {otpVerified && (
            <>
              <input
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
                value={pass}
                placeholder="New Password"
                className="border border-gray-200 mb-4 p-2 rounded"
              />
              <button
                type="button"
                onClick={submitPass}
                className="border-gray-200 p-4 px-10 rounded-full h-15 w-50 bg-indigo-800 font-medium hover:bg-gray-50"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
