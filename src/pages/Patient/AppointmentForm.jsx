import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAppointment } from "../../redux/slices/patientSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL,
});

const AppointmentForm = () => {
  const { id, token, patient } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selected Hospital Doctors
  const [doctors, setDoctors] = useState([]);
  const [loadDoc, setLoadDoc] = useState(true);

  // All Hospital
  const { data, loading, error } = useFetch(
    "/hospital/get-all-hospitals",
    token
  );
  // Error Handling
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Form Submission
  const {
    data: response,
    loading: loader,
    postData,
    error: err,
  } = usePost("/appointment/book-appointment", token);

  const user = patient.data;
  const { data: hospital } = data;

  // Response After Booking Appoinmetnta
  useEffect(() => {
    if (Object.keys(response).length > 0) {
      dispatch(getAppointment({ id, token }));
      toast.success(response.message);
      navigate("/patient-dashboard/appointment");
    }
  }, [response]);

  // Hospital mmust have at least On Doctor
  const properHospital = hospital?.filter(
    (clinic) => clinic.staffs.length >= 1
  );

  // Sorted Hospital Accouring to patient LGA
  const sortedHospital = properHospital?.sort((a, b) => {
    if (a.LGA === user.LGA) return -1;
    return 1;
  });

  // Get Doctors of Selected Hospital
  const handleHospitalChange = async (e) => {
    try {
      const doctor = await apiClient.get(
        `/hospital/get-hospital-doctors/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = doctor.data;
      setDoctors(data);
    } catch (error) {
      const err = error.response.data;
      toast.error(err.message); // Error Message
    } finally {
      setLoadDoc(false);
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("patient", id);
    postData(form);
  };

  // Ensure The Data has Arrived
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <HashLoader size={50} />
      </div>
    );

  // Error Message
  const errMessage = err?.message;
  return (
    <div className="bg-white">
      <section>
        <h1 className=" text-3xl font-bold px-10 py-5 text-dark-blue-800 text-center">
          Book An Appoinment
        </h1>
      </section>

      {/* Appointment Form */}
      <div className=" px-20">
        <form onSubmit={handleFormSubmission}>
          {/* Symptoms */}
          <label htmlFor="symptoms">Symptoms:</label>
          <input
            type="text"
            placeholder="Headache , Fever , Malaria , Blood Test , Skin Rashes , Acne"
            id="symptoms"
            name="symptoms"
            required
          />
          {/* Symptoms Error */}
          {Array.isArray(errMessage) &&
            errMessage.length > 0 &&
            errMessage[0].path.includes("toms") && (
              <p>{errMessage[0].message}</p>
            )}
          {!Array.isArray(errMessage) &&
            errMessage?.message.includes("toms") && <p>{errMessage.message}</p>}

          {/* Hospital */}
          <label htmlFor="hospital">Hospital:</label>
          <select
            name="hospital"
            id="hospital"
            onChange={handleHospitalChange}
            required
          >
            <option value="">Select Hospital</option>
            {sortedHospital?.map((clinic, index) => (
              <option value={clinic._id} key={index}>
                {clinic.name}
              </option>
            ))}
          </select>

          {/* Doctors */}
          {doctors.length > 0 && (
            <>
              <label htmlFor="doctor">Available Doctors:</label>
              <select name="doctor" id="doctor" required>
                <option value="">Select Doctor</option>
                {doctors?.map((doctor, index) => {
                  return (
                    <option value={doctor._id} key={index}>
                      {loadDoc ? (
                        <>Loading ...</>
                      ) : (
                        <>
                          {`${doctor.first_name} 
                        ${doctor.last_name} --- 
                        ${doctor.specialism}`}{" "}
                          &gt;&gt;&gt;&gt; rated: 
                          <>
                            {` ${Math.floor(
                              doctor.ratings.reduce((a, b) => a + b, 0)
                            )}`}

                          </>
                        </>
                      )}
                    </option>
                  );
                })}
              </select>
            </>
          )}

          {/* Apppointment Date */}
          <label htmlFor="appointment_date">Choose An Appointment Date:</label>
          <input type="datetime-local" name="appointment_date" required />

          {/* Error Handling */}
          {Array.isArray(errMessage) &&
            errMessage.length > 0 &&
            errMessage[0].path.includes("date") && (
              <p>{errMessage[0].message}</p>
            )}

          {!Array.isArray(errMessage) &&
            errMessage?.message.includes("date") && <p>{errMessage.message}</p>}

          {/* Write A Short Notes */}
          <label htmlFor="notes">Short Note</label>
          <textarea
            className="block w-full bg-light-blue p-2 placeholder:font-bold"
            name="notes"
            id="notes"
            placeholder="I vomitted up to ten times this morning"
          ></textarea>
          {/* Notes Error */}
          {Array.isArray(errMessage) &&
            errMessage.length > 0 &&
            errMessage[0].path.includes("note") && (
              <p className="mt-2">{errMessage[0].message}</p>
            )}
          {!Array.isArray(errMessage) &&
            errMessage?.message.includes("note") && (
              <p className="mt-2">{errMessage.message}</p>
            )}

          <div className="flex justify-end">
            {loader ? (
              <HashLoader size={40} className="text-dark-blue-800 p-3" />
            ) : (
              <button className="p-3 mt-7" type="submit">
                Book Appointment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
