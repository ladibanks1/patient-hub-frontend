import { useContext, useEffect, useState } from "react";

import signUpImage from "../../assets/images/signUpDoc.png";
import "../../css/Form.css";
import { toast } from "react-toastify";
import usePost from "../../hooks/usePost";
import { AuthContext } from "../../context/Authentication";
import { HashLoader } from "react-spinners";

// Register Staff
const RegisterStaffPage = () => {
  // Hospital Id
  const { id } = useContext(AuthContext);

  const docRegex = /doctor/i;

  const hospitalPosition = [
    "Doctor",
    "Nurse",
    "Pharamacist",
    "Receptionist",
    "Administator",
    "Medical Assistant",
    "Other",
  ];
  const [selectedPosition, setSelectedPosition] = useState("");

  //   Custom Hook For sending a post Request
  const { data, error, loading, postData } = usePost("/auth/register-staff");

  //   Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("hospital_id", id);
    postData(form);
  };

// UseEffect to show Success Message
useEffect(() => {
    if(data) {
        toast.success(data.message)
    }

}, [data])

  // Effect to focus on Error
  useEffect(() => {
    if (Array.isArray(error?.message)) {

      const errorElement = document.getElementById(error?.message[0].path);
      if (errorElement) {
        errorElement.focus();
        errorElement.scrollTo();
        errorElement.style = "outline-color: red";
      }
    }
  }, [error]);
  return (
    <div className="form-page">
      <article className="md:w-1/2">
        <img src={signUpImage} alt="A doc Image" />
      </article>
      <article className="md:w-1/2">
        {/* Staff Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name="first_name" id="first_name" required />
          {/* First Name Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "first_name" && err.message}</p>
            ))}

          {/* Last Name */}
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" name="last_name" required />

          {/* Last Name Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "last_name" && err.message}</p>
            ))}

          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />

          {/* Email Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "email" && err.message}</p>
            ))}
          {!Array.isArray(error?.message) &&
            error?.message?.includes("mail") && (
              <p>{error.message}</p>
            )}

          {/* Position */}
          <label htmlFor="position">Position:</label>
          <select
            name="position"
            id="position"
            onChange={(e) => setSelectedPosition(e.target.value)}
            required
          >
            <option value="">Select Position</option>
            {hospitalPosition.map((position, index) => (
              <option value={position} key={index}>
                {position}
              </option>
            ))}
          </select>

          {/* Podition Error */}

          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "position" && err.message}</p>
            ))}

          {/* Specialism for Doctors Only */}

          {docRegex.test(selectedPosition) && (
            <>
              <label htmlFor="specialism">Specialism:</label>
              <input
                type="specialism"
                name="specialism"
                id="specialism"
                required
              />
            </>
          )}

          <div className="flex justify-end">
            {loading ? (
              <HashLoader size={30} />
            ) : (
              <button type="submit">Register</button>
            )}
          </div>
        </form>
      </article>
    </div>
  );
};

export default RegisterStaffPage;
