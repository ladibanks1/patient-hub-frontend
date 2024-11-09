import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setInnerWidth(e.target.innerWidth);
    });
  }, [innerWidth]);
  const [show, setShow] = useState(true); // For easy toggle

  //Side Bar For Smalle Devices
  const showSideBar = useRef("");

  // Function for handling sidebar Display
  const handleSideBarShow = () => {
    showSideBar.current.classList.toggle("hidden");
    setShow(true);
  };

  return (
    <header className="p-5 flex justify-between items-center relative ">
      <div>
        <img
          src={logo}
          onClick={() => {
            navigate("/")
          }}
          alt="Patient Hub Logo"
          className="md:w-[230px] md:h-[70px] w-[100px] h-[30px] cursor-pointer"
        />
      </div>
      {innerWidth > 640 ? (
        <div className="flex gap-6 me-10  items-center">
          <Link
            to="/register-patient"
            className="text-sky-blue hover:text-dark-blue-800 font-medium md:text-[18px]"
          >
            Register as a Patient
          </Link>
          <Link
            to="/register-hospital"
            className="text-sky-blue hover:text-dark-blue-800 font-medium md:text-[18px]"
          >
            Register as a Hospital
          </Link>
          <Link to="/login">
            <button className="bg-dark-blue-800 px-4 py-2 text-white rounded-lg hover:border-dark-blue-800 hover:border-2 hover:bg-transparent hover:text-dark-blue-800 ">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          {show && (
            <FaBars
              className="text-2xl text-dark-blue-800 cursor-pointer"
              onClick={() => {
                showSideBar.current.classList.toggle("hidden");
                setShow(false);
              }}
            />
          )}
          <div
            className="absolute right-0 top-0 w-[250px] hidden h-screen bg-fade-dark-blue"
            ref={showSideBar}
          >
            <section className="flex flex-col gap-10 mt-20 text-white items-end p-3 ">
              <FaTimes
                className="absolute top-4  right-4 text-2xl cursor-pointer hover:text-blue-400"
                onClick={handleSideBarShow}
              />
              <Link
                onClick={handleSideBarShow}
                to="/register-patient"
                className="p-1 hover:text-blue-400"
              >
                Register as a Patient
              </Link>
              <Link
                onClick={handleSideBarShow}
                to="/register-hospital"
                className="p-1 hover:text-blue-400"
              >
                Register as a Hospital
              </Link>
              <Link onClick={handleSideBarShow} to="/login">
                <button className="bg-dark-blue-800 px-4 py-2 text-white rounded-lg p-5 hover:border-2 hover:bg-transparent hover:border-white">
                  Login
                </button>
              </Link>
            </section>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
