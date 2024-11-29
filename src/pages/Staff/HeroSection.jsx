import React, { useContext, useRef } from "react";
import { FaMessage, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings";
import axios from "axios";
import { AuthContext } from "../../context/Authentication";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { staffProfile } from "../../redux/slices/staffSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

const HeroSection = ({ staff }) => {
  const { token, id } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avRating = Math.floor(staff.ratings.reduce((a, b) => a + b, 0));
  const fileRef = useRef();

  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const picture = e.target.files[0];
    const formData = new FormData();
    formData.append("picture", picture);
    try {
      if (picture) {
        const res = await axios.put(
          `${baseUrl}/staff/update-profile/${staff._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(res.data.message);
        dispatch(staffProfile({ id, token }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <FaArrowLeft
        className="mb-4 text-xl -mt-3 -ml-6 cursor-pointer"
        onClick={() => navigate("/staff-dashboard")}
      />
      <input type="file" ref={fileRef} hidden onChange={handleChange} />
      {/* Picture And Chat Icon */}
      <div className="flex justify-between items-center">
        <section>
          <img
            src={staff.picture}
            alt="ProfilePic"
            className="inline w-10 h-10 sm:w-14 sm:h-14 object-cover cursor-pointer rounded-full"
            onClick={handleImageClick}
          />
          <span className="font-bold text-sm sm:text-base  md:text-xl text-sky-blue">{`Welcome, Dr ${staff.last_name}`}</span>
        </section>
        <section>
          <FaMessage
            className="text-sky-blue hover:text-dark-blue-800 cursor-pointer"
            onClick={() => navigate("chat")}
          />
        </section>
      </div>

      {/* Brief Stats */}
      <div className="flex flex-col sm:flex-row sm:justify-evenly stats gap-2 md:gap-5 mt-10 mb-10">
        <section>
          Total Appointments
          <p>{staff.appointments.length}</p>
        </section>
        <section>
          Total Patient
          <p>{staff.patients.length}</p>
        </section>
        <section>
          Av.Rating
          <article className="flex gap-1">
            <Ratings avRating={avRating} />
          </article>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
