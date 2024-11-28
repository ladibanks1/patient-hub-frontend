import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";

const Dashboard = () => {
  const { id, userType, token } = useContext(AuthContext);

  console.log(token, userType, id);
  return <div>Dashboard</div>;
};

export default Dashboard;
