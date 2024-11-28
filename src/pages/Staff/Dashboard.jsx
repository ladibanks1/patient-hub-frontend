import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import { Outlet, useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import { useSelector, useDispatch } from "react-redux";
import { staffProfile } from "../../redux/slices/staffSlice";
import { HashLoader } from "react-spinners";
import "../../css/StaffDashboard.css";

const Dashboard = () => {
  const { id, userType, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.staff);

  // Redirect if userType is Not Staff
  useEffect(() => {
    if (!/staff/i.test(userType)) {
      navigate("/login");
      return;
    }
    dispatch(staffProfile({ id, token }));
  }, [userType, id]);

  if (
    loading ||
    (Object.keys(staff).length === 0 &&
      (error.length === 0 || Array.isArray(error)))
  ) {
    return (
      <div className="flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }
  return (
    <div className="bg-light-blue px-5 sm:p-8 md:p-10 py-7 m-3 sm:m-5 md:m-10 rounded">
      <HeroSection staff={staff?.data} />
      <Outlet
        context={{
          staff: staff.data,
          appointments: staff.data.appointments,
        }}
      />
    </div>
  );
};

export default Dashboard;
