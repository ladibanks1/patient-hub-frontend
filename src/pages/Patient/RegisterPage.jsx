import React, { useEffect } from "react";
import "../../css/Form.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/authSlice";
import RegisterPatientForm from "../../components/RegisterPatientForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle Form Submisson
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    dispatch(registerUser(form));
  };

  // Effect For form success
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      navigate(`/${data.userType.toLowerCase()}-dashboard`);
      toast.success(data.message);
    }
  }, [data]);

  // Scroll to error element
  useEffect(() => {
    if (Array.isArray(error) && error.length > 0) {
      const errorElement = error[0].path;
      const element = document.getElementById(errorElement);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [error]);

// Clear State if component Unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);
  return <RegisterPatientForm handleSubmit={handleSubmit} error={error}  loading={loading}/>;
};

export default RegisterPage;
