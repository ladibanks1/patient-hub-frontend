import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { userType } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if userType is Not Patient
  useEffect(() => {
    if (!/hospital/i.test(userType)) navigate("/login");
  }, [userType]);
  return (
    <div>
      <p>Dashboard</p>
      <Outlet />
    </div>
  );
};

export default Dashboard;
