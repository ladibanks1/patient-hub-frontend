import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
export const AuthContext = createContext();

// Dashboard Navbar  And Footer
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";  


// Check if the user is authenticated
const Authentication = () => {
  const navigate = useNavigate();
  const { token, loading: load } = useSelector((state) => state.auth);
  const { loading, error , data } = useFetch("/auth/isAuth", token);
  const userType = data?.data?.userType;
  const id = data?.data?.id

  // Redirect to Login if not authenticated
  useEffect(() => {
    if (error?.statusCode > 400) {
      navigate("/login");
    }
  }, [loading, error]);

  // If loading Show Spinner
  if (load || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader size={100} className="text-dark-blue-800" />
      </div>
    );
  return (
    <AuthContext.Provider value={{userType , id , token} }>
      <DashboardNavbar />
      <Outlet />
      <Footer />
    </AuthContext.Provider>
  );
};

export default Authentication;
