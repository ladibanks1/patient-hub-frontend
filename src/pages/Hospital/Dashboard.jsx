import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  hospitalProfile,
  hospitalAppointments,
  clearError,
} from "../../redux/slices/hospitalSlice";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const { userType, id, token } = useContext(AuthContext);

  // Hopital Global State
  const { loading, error, hospital, appointments } = useSelector(
    (state) => state.hospital
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if userType is Not Patient
  useEffect(() => {
    if (!/hospital/i.test(userType)) navigate("/login");
  }, [userType]);

  useEffect(() => {
    dispatch(hospitalProfile({ id, token }));
    dispatch(hospitalAppointments({ id, token }));
  }, [token, id]);

  // Error Handing
  useEffect(() => {
    if (!loading) {
      if (Array.isArray(error)) {
        // Missing Error
      }
      if (!Array.isArray(error)) {
        // Missing Error
      }
    }
  }, [error]);

  // Clear Error
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  // Navbar Active Controller
  const navClass = ({ isActive }) =>
    isActive ? " border-fade-dark-blue border-b-2 " : "";

  if (loading && Object.keys(hospital).length === 0)
    return (
      <div className="flex justify-center items-center">
        <HashLoader size={50} />
      </div>
    );

  return (
    <div className="bg-light-blue mx-5 rounded-md">
      <div className="home-patient-dashboard">
        <section className="header">
          <div className="flex items-center md:bg-light-blue p-4 md:w-full">
            <span className="text-xl text-dark-blue-800 font-bold ms-3">
              {hospital?.data?.name}
            </span>
          </div>
          <div className="navigation p-5">
            <NavLink className={navClass} to="" end>
              Overview
            </NavLink>
            <NavLink className={navClass} to="staffs">
              Staffs
            </NavLink>
            <NavLink className={navClass} to="patient-records">
              Patients
            </NavLink>
            <NavLink className={navClass} to="settings">
              Profile
            </NavLink>
          </div>
        </section>
        <section>
          {!loading && Object.keys(hospital).length > 0 && (
            <Outlet context={{ hospital, appointments, token, id }} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
