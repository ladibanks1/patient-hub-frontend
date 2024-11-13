import { useState } from "react";
import { HashLoader } from "react-spinners";
import State from "./StateForm";

const PatientForm = ({error:errorObj , loading  , handleChange , handleSubmit , patientForm , handleDelete}) => {
  const error = errorObj?.message
  return (
    <div className="p-10">
      <article className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-blue-800 mb-10">Profile</h1>
        <button className="m-0 mb-10 bg-red-600 hover:border-red-600" onClick={handleDelete}>
          Delete Profile
        </button>
      </article>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={patientForm.first_name}
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        {/* First Name Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "first_name" && <p key={index}>{err.message}</p>}</>
          ))}
        {/* Last Name */}
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          value={patientForm.last_name}
          required
          onChange={handleChange}
        />
        {/* Last Name Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "last_name" && <p key={index}>{err.message}</p>}</>
          ))}

        <State state={patientForm.state} LGA={patientForm.LGA} handleChange={handleChange} />
        {/* State And Lgas Component */}

        {/* Phone Number */}
        <label htmlFor="tel">Phone Number:</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          placeholder="Telephone Number"
          value={patientForm.tel}
          required
          onChange={handleChange}
        />
        {/* Phone Number Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "tel" && <p key={index}>{err.message}</p>}</>
          ))}
        {/* Phone Number Error if it already existed */}
        {error?.includes("Tel") && <p>{error}</p>}

        {/* Gender */}
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          required
          value={patientForm.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        {/* Date Of Birth */}
        <label htmlFor="dob">Date Of Birth:</label>
        <input type="date" name="DOB" value={patientForm.DOB} onChange={handleChange}/>
        {/* Date of Birth Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "DOB" && <p key={index}>{err.message}</p>}</>
          ))}
        {/* Picture */}
        <label htmlFor="picture">Update Picture:</label>
        <input
          type="file"
          name="picture"
          id="picture"
          className="p-1 bg-white"
        />
        {/* Picture Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "picture" && <p key={index}>{err.message}</p>}</>
          ))}
        {/* Handle More Picture Error */}
        {error?.includes("image") && <p>{error}</p>}
        {/* Email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={patientForm.email}
          onChange={handleChange}
          id="email"
          placeholder="olly@gmail.com"
          required
        />

        {/* Email Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "email" && <p key={index}>{err.message}</p>}</>
          ))}

        {/* Email Error if it already existed */}
        {error?.includes("Email") && <p>{error}</p>}

        {/* Password Error */}
        {Array.isArray(error) &&
          error.map((err, index) => (
            <>{err.path === "password" && <p key={index}>{err.message}</p>}</>
          ))}
        <section className="flex justify-end">
          {loading ? (
            <HashLoader color="#2e2f5d" size={30} />
          ) : (
            <button type="submit">Update Profile</button>
          )}
        </section>
      </form>
    </div>
  );
};

export default PatientForm;
