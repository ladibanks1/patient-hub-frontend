import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import signUpImage from "../assets/images/signUpDoc.png";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editStaff } from "../redux/slices/staffSlice";
import { hospitalProfile } from "../redux/slices/hospitalSlice";
import { toast } from "react-toastify";
import { clearState } from "../redux/slices/staffSlice.js";

const EditStaff = () => {
  const { hospital, token } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.staff);

  const location = useLocation();
  const docRegex = /doctor/i;
  const { staffs } = hospital.data;

  //   Get Staff Id
  const { id } = location.state;

  //   Get Staff
  const staff = staffs.find((staff) => staff._id === id);

  //   Value For Staff
  const [selectedPosition, setSelectedPosition] = useState(staff.position);
  const [firstName, setFirstName] = useState(staff.first_name);
  const [lastName, setLastName] = useState(staff.last_name);
  const [email, setEmail] = useState(staff.email);
  const [specialism, setSpecialism] = useState(staff.specialism);

  const hospitalPosition = [
    "Doctor",
    "Nurse",
    "Pharamacist",
    "Receptionist",
    "Administator",
    "Medical Assistant",
    "Other",
  ];

  //   Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      position: selectedPosition,
      specialism,
    };

    dispatch(
      editStaff({
        id: staff._id,
        token,
        body,
      })
    ).then((res) => {
      if (!res.error) {
        dispatch(clearState());
        toast.success(res.payload.message);
      }
    });
  };

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
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {/* First Name Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "first_name" && err.message}</p>
            ))}

          {/* Last Name */}
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* Last Name Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "last_name" && err.message}</p>
            ))}

          {/* Email */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Email Error */}
          {Array.isArray(error?.message) &&
            error.message.map((err, index) => (
              <p key={index}>{err.path === "email" && err.message}</p>
            ))}
          {!Array.isArray(error?.message) &&
            error?.message?.includes("mail") && <p>{error.message}</p>}

          {/* Position */}
          <label htmlFor="position">Position:</label>
          <select
            name="position"
            id="position"
            onChange={(e) => {
              setSelectedPosition(e.target.value);
              if (!docRegex.test(e.target.value)) {
                setSpecialism("");
              }
            }}
            value={selectedPosition}
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
                value={specialism}
                onChange={(e) => setSpecialism(e.target.value)}
                required
              />
            </>
          )}

          <div className="flex justify-end">
            {loading ? (
              <HashLoader size={30} />
            ) : (
              <button type="submit">Update Profile</button>
            )}
          </div>
        </form>
      </article>
    </div>
  );
};

export default EditStaff;
