import { FaBell } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import Logout from "./Logout";
import { useContext } from "react";
import { AuthContext } from "../context/Authentication";

const DashboardNavbar = () => {
  const { token } = useContext(AuthContext);
  return (
    <header className="p-5 flex justify-between items-center relative ">
      <div>
        <img
          src={logo}
          alt="Patient Hub Logo"
          className="md:w-[230px] md:h-[70px] w-[100px] h-[30px] cursor-pointer"
        />
      </div>
      <div className="flex gap-10 items-center">
        <article className="relative hidden sm:block">
          <FaBell className="text-3xl text-dark-blue-800" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center">
            0
          </span>
        </article>
        <Logout token={token} />
      </div>
    </header>
  );
};

export default DashboardNavbar;
