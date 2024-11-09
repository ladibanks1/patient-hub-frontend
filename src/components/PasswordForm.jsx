import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const PasswordForm = ({text}) => {
  // JSX
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <label htmlFor="password">{text || "Password:"}</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        required
      />
      {showPassword ? (
        <FaEyeSlash
          className="absolute  top-10 right-3 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            togglePasswordVisibility();
          }}
        />
      ) : (
        <FaEye
          className="absolute  top-10 right-3 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            togglePasswordVisibility();
          }}
        />
      )}
    </div>
  );
};

export default PasswordForm;
