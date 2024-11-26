import React from "react";
import { FaStar } from "react-icons/fa";


const Ratings = ({avRating}) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          style={{ color: avRating > index ? "gold" : "gray" }}
        />
      ))}
    </>
  );
};

export default Ratings;
