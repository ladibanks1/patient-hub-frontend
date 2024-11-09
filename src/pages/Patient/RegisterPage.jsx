import React, { useEffect } from "react";
import signUpImage from "../../assets/images/signUpDoc.png";
import "../../css/Form.css";
import State from "../../components/StateForm";
import PasswordForm from "../../components/PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/authSlice";

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
  return (
    <div className="form-page">
      <article className="md:w-1/2">
        <img src={signUpImage} alt="A doc Image" />
      </article>
      <article className="md:w-1/2">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-5 text-dark-blue-800">
            Register
          </h2>
          {/* First Name */}
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name="first_name" id="first_name" required />
          {/* First Name Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>
                {err.path === "first_name" && <p key={index}>{err.message}</p>}
              </>
            ))}
          {/* Last Name */}
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" name="last_name" id="last_name" required />
          {/* Last Name Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>
                {err.path === "last_name" && <p key={index}>{err.message}</p>}
              </>
            ))}
          <State />
          {/* State And Lgas Component */}

          {/* Phone Number */}
          <label htmlFor="tel">Phone Number:</label>
          <input type="tel" name="tel" id="tel" required />
          {/* Phone Number Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "tel" && <p key={index}>{err.message}</p>}</>
            ))}
          {/* Phone Number Error if it already existed */}
          {error?.includes("Tel") && <p>{error}</p>}

          {/* Gender */}
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {/* Date Of Birth */}
          <label htmlFor="dob">Date Of Birth:</label>
          <input type="date" name="DOB" required />
          {/* Date of Birth Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "DOB" && <p key={index}>{err.message}</p>}</>
            ))}
          {/* Picture */}
          <label htmlFor="picture">Picture:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            className="p-1 bg-white"
          />
          {/* Picture Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "picture" && <p key={index}>{err.message}</p>}</>
            ))}
          {/* Handle More Picture Error */}
          {error?.includes("image") && <p>{error}</p>}
          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
          {/* Email Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "email" && <p key={index}>{err.message}</p>}</>
            ))}
          {/* Email Error if it already existed */}
          {error?.includes("Email") && <p>{error}</p>}

          {/* Password Input */}
          <PasswordForm />
          {/* Password Error */}
          {Array.isArray(error) &&
            error.map((err, index) => (
              <>{err.path === "password" && <p key={index}>{err.message}</p>}</>
            ))}
          <section className="flex justify-end">
            {loading ? (
              <HashLoader color="#2e2f5d" size={30} />
            ) : (
              <button
                className="bg-dark-blue-800 p-2 text-white rounded-md hover:border-2 hover:border-dark-blue-800 hover:bg-white hover:text-dark-blue-800 "
                type="submit"
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
