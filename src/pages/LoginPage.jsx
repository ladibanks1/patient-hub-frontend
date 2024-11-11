import React, { useEffect, useRef } from "react";
import signUpImage from "../assets/images/signUpDoc.png";
import "../css/Form.css";
import PasswordForm from "../components/PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { clearError } from "../redux/slices/authSlice";
const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const LoginPage = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { data, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    dispatch(login(form));
  };

  // Navigate to the dashboard if Login is Successful
  useEffect(() => {
    if (data.message) {
      navigate(`/${data.userType.toLowerCase()}-dashboard`);
      toast.success(data.message);
    }
  }, [data]);

  // Clear state if the url changes Or the component is unmounted
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  // Forgot Password Api
  const forgotPassword = async (email) => {
    const apiClient = axios.create({
      baseURL,
    });
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async(e) => {
    e.preventDefault();
    const email = inputRef.current.value;
    if(email === "" ){
      toast.error("Please Enter Your Email");
      return;
    }
    const data = await forgotPassword(email);
    if (data?.statusCode > 400) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-10 md:p-16 items-center gap-10">
      <article className="md:w-1/2">
        <img src={signUpImage} alt="A Doctor Image" />
      </article>
      <section className="md:w-1/2">
        <h2 className="text-3xl text-dark-blue-800 font-bold">Welcome Back</h2>
        <form className="mt-10 relative" onSubmit={handleSubmit}>
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mb-10 mt-3"
            required
            placeholder="olly@gmail.com"
            ref={inputRef}
          />
          {/* Email Error */}
          {error?.includes("Email") && <p className="-mt-10">{error}</p>}

          {/* Password */}
          <PasswordForm />
          {error?.includes("Password") && <p>{error}</p>}
          <h6
            className="cursor-pointer mb-5 text-right font-bold text-dark-blue-800"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </h6>

          <div className="flex justify-end">
            {loading ? (
              <HashLoader color="#2e2f5d" size={30} />
            ) : (
              <button
                className="bg-dark-blue-800 p-2 px-4 text-white rounded-md hover:border-2 hover:border-dark-blue-800 hover:bg-white hover:text-dark-blue-800 "
                type="submit"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
