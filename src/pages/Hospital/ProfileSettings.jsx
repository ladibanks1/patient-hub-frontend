import React, { useState } from "react";
import State from "../../components/StateForm";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  const { id, hospital } = useOutletContext();
  const { data } = hospital;

  const { message, loading, error } = useSelector((state) => state.hospital);

  const [hospitalForm, setHospitalForm] = useState({
    name: data.name,
    tel: data.tel,
    address: data.address,
    email: data.email,
    state: data.state,
    LGA: data.LGA,
  });
  const handleChange = (e) => {
    // Handle Change
    const { name, value } = e.target;
    console.log(name, value);
    setHospitalForm((prev) => ({ ...prev, [name]: value }));
  };

  console.log(hospitalForm);
  return (
    <div className="p-7">
      <article className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-blue-800 mb-10">Profile</h1>
        <button className="m-0 mb-10 bg-red-600 hover:border-red-600">
          Delete Profile
        </button>
      </article>
      <form>
        {/* Name */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Hospital Name"
          value={hospitalForm.name}
          onChange={handleChange}
          required
        />

        {/* Name Error */}
        {error.includes("Name") && <p>{error}</p>}

        {/* State And Lgas Component */}
        <State LGA={hospitalForm.LGA} handleChange={handleChange} state={hospitalForm.state} />

        {/* Phone Number */}
        <label htmlFor="tel">Phone Number:</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          value={hospitalForm.tel}
          onChange={handleChange}
          placeholder="Telephone Number"
          required
        />
        {/* Phone Number Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "tel" && <p key={index}>{err.message}</p>}</>
          ))}

        {/* Phone Number Error if it exists */}
        {error.includes("Tel") && <p>{error}</p>}

        {/* Address */}
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={hospitalForm.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        {/* Address Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "address" && <p key={index}>{err.message}</p>}</>
          ))}

        {/* Email */}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={hospitalForm.email}
          onChange={handleChange}
          placeholder="olly@gmail.com"
          required
        />

        {/* Email Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "email" && <p key={index}>{err.message}</p>}</>
          ))}

        {/* Email Error if it exist already */}
        {error.includes("Email") && <p>{error}</p>}


        {/* Submit Button */}
        <section className="flex justify-end">
          {loading ? (
            <HashLoader color="#2e2f5d" size={30} />
          ) : (
            <button
              type="submit"
              className="bg-dark-blue-800 p-2 text-white rounded-md hover:border-2 hover:border-dark-blue-800 hover:bg-white hover:text-dark-blue-800 "
            >
              Register
            </button>
          )}
        </section>
      </form>
    </div>
  );
};

export default ProfileSettings;
