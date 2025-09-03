import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appcontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { backendUrl, userData, setIsLoggedin, setUserData } = useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        toast.success('Logged out successfully');
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center sm:p-6 sm:px-24 absolute top-0 left-0">
      <img
        src="/src/assets/logo1.svg"
        alt="Logo"
        className="mb-4 w-20 h-20 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {userData && userData.isAccountVerified ? (
        <div className="relative inline-block group">
          {/* Avatar */}
          <span className="shadow-lg w-12 h-12 flex justify-center items-center rounded-full bg-black text-white cursor-pointer text-lg">
            {userData.name ? userData.name[0].toUpperCase() : "U"}
          </span>

          {/* Dropdown */}
          <div className="absolute hidden group-hover:block top-full right-0 mt-1 w-50 bg-white text-black shadow-lg rounded-md z-15">
            <ul className="list-none m-0 p-3 bg-gray-100 text-black text-sm">
              <li
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
              <li
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate('/reset-password')}
              >
                Change Password
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 transition-all"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
