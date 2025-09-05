import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext} from "../context/appcontext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [state,setState]=useState("Sign up")
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { backendUrl, setIsLoggedin,getUserData } = useContext(AppContext);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    axios.defaults.withCredentials = true;

    if (state === "Sign up") {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast("Successfully created your account")
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        toast("Successfully logged in");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <div className="items-center justify-center min-h-screen flex flex-col">
      <div className="max-w-lgshadow:lg opacity-90 gap-8 flex flex-col items-center justify-center h-150 w-180 bg-slate-900 rounded-lg">
        <h1 className="font-semibold text-4xl">
          {state === "Sign up" ? "Sign Up" : "Login"}
        </h1>
        <p className="text-md">
          {state === "Sign up"
            ? "Create your account by filling the details"
            : "Login to your account"}
        </p>

        <form className="items-center mb-4 flex flex-col" onSubmit={onSubmitHandler}>
          {state === "Sign up" && (
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="border-gray-200 p-4 px-10 rounded-full mb-4 h-15 w-150 bg-slate-800"
            />
          )}

          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="border-gray-200 p-4 px-10 rounded-full mb-4 h-15 w-150 bg-slate-800"
          />
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="border-gray-200 p-4 px-10 rounded-full mb-4 h-15 w-150 bg-slate-800"
          />

          {state === "Login" && (
            <p
              className="cursor-pointer mb-4 text-gray-400 underline"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="border-gray-200 p-4 px-10 rounded-full h-15 w-150 bg-indigo-800 font-medium hover:bg-gray-50"
          >
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-center text-md text-gray-400">
            Already have an account?{" "}
            <span
              className="font-semibold cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-md text-gray-400">
            Don't have an account?{" "}
            <span
              className="font-semibold cursor-pointer underline"
              onClick={() => setState("Sign up")}
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
