import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  patientProfile,
  clearError,
  getAppointment,
} from "../../redux/slices/patientSlice";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { NavLink, Outlet } from "react-router-dom";

// Patient Css
import "../../css/PatientDashboard.css";

const Dashboard = () => {
  const { userType, id, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clear Error if Component Unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  // Get Appointments
  useEffect(() => {
    dispatch(getAppointment({ id, token }));
  }, [id, token]);

  // Patient Slice Details
  const { patient, loading, error } = useSelector((state) => state.patient);

  // Navbar Active Controller
  const navClass = ({ isActive }) =>
    isActive ? " border-fade-dark-blue border-b-2 " : "";

  // Redirect if userType is Not Patient
  useEffect(() => {
    if (!/patient/i.test(userType)) navigate("/login");
  }, [userType]);

  // Patient Profile
  useEffect(() => {
    dispatch(patientProfile({ id, token }));
  }, [id, token]);

  useEffect(() => {
    if (error?.length > 0 || error?.message) {
      if (Array.isArray(error)) {
        toast.error(error[0].message);
        return;
      }
      if (error.message?.includes("jwt must be provided")) {
        navigate("/login");
        return;
      }
      toast.error(error.message);
    }
  }, [error]);

  if (loading || Object.keys(patient) == 0)
    return (
      <div className="flex justify-center items-center">
        <HashLoader size={70} />
      </div>
    );
  return (
    <div className="bg-light-blue md:mx-5 mx-1 rounded-md">
      <div className="home-patient-dashboard">
        <section className="header">
          <div className="flex items-center md:bg-light-blue p-4 md:w-full">
            <img
              src={patient.data.picture}
              alt="Patient picture"
              className="rounded-full w-14 h-14 object-cover"
            />
            <span className="text-xl text-dark-blue-800 font-bold">{`${patient.data.first_name} ${patient.data.last_name}`}</span>
          </div>
          <div className="navigation p-5">
            <NavLink className={navClass} end to="">
              Home
            </NavLink>
            <NavLink className={navClass} to="appointment">
              My Appointment
            </NavLink>
            <NavLink className={navClass} to="chat">
              Chat
            </NavLink>
            <NavLink className={navClass} to="settings">
              Profile
            </NavLink>
          </div>
        </section>
        <section>
          <Outlet context={{ id, token, patient }} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
