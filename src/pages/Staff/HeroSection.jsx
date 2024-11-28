import React from "react";
import { FaMessage, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings";

const HeroSection = ({ staff }) => {
  const navigate = useNavigate();
  const avRating = Math.floor(staff.ratings.reduce((a, b) => a + b, 0));

  return (
    <div>
      <FaArrowLeft
        className="mb-4 text-xl -mt-3 -ml-6 cursor-pointer"
        onClick={() => navigate("/staff-dashboard")}
      />
      {/* Picture And Chat Icon */}
      <div className="flex justify-between items-center">
        <section>
          <img
            src={staff.picture}
            alt="ProfilePic"
            className="inline w-10 h-10 sm:w-14 sm:h-14 object-cover"
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
