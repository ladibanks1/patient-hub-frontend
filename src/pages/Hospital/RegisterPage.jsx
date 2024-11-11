import React, { useEffect } from "react";
import signUpImage from "../../assets/images/signUpDoc.png";
import "../../css/Form.css";
import State from "../../components/StateForm";
import PasswordForm from "../../components/PasswordForm";
import { registerHospital } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/authSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.auth);

  // Handle Form Submisson
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    dispatch(registerHospital(form));
  };

  // Navigate To Dashboard
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

  // Clear Error if Component Unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);
  return (
    <div className="form-page">
      <article className="md:w-1/2">
        <img src={signUpImage} alt="A doc Image" />
      </article>
      <article className="md:w-1/2">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-5  text-dark-blue-800">
            Register
          </h2>

          {/* Name */}
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Hospital Name" required />

          {/* Name Error */}
          {error.includes("Name") && <p>{error}</p>}

          {/* State And Lgas Component */}
          <State />

          {/* Phone Number */}
          <label htmlFor="tel">Phone Number:</label>
          <input type="tel" name="tel" id="tel" placeholder="Telephone Number" required />
          {/* Phone Number Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "tel" && <p key={index}>{err.message}</p>}</>
            ))}

          {/* Phone Number Error if it exists */}
          {error.includes("Tel") && <p>{error}</p>}

          {/* Address */}
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" placeholder="Address" required />
          {/* Address Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "address" && <p key={index}>{err.message}</p>}</>
            ))}

          {/* Email */}

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="olly@gmail.com" required />

          {/* Email Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "email" && <p key={index}>{err.message}</p>}</>
            ))}

          {/* Email Error if it exist already */}
          {error.includes("Email") && <p>{error}</p>}

          {/* Password Input */}

          <PasswordForm />
          {/* Error Message */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "password" && <p key={index}>{err.message}</p>}</>
            ))}
          {/* Submit Button */}
          <section className="flex justify-end">
            {loading ? (
              <HashLoader color="#2e2f5d" size={30} />
            ) : (
              <button
                type="submit"
                className="bg-dark-blue-800 p-2 text-white rounded-md hover:border-2 hover:border-dark-blue-800 hover:bg-white hover:text-dark-blue-800 "
              >
                Register
              </button>
            )}
          </section>
        </form>
      </article>
    </div>
  );
};

export default RegisterPage;
