import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authentication";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userType } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if userType is Not Patient
  useEffect(() => {
    if (!/patient/i.test(userType)) navigate("/login");
  }, [userType]);
  return <div>Dashboard</div>;
};

export default Dashboard;
