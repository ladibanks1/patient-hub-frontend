import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Popup from "../../components/Popup";
import { FaEllipsisV } from "react-icons/fa";
import { AuthContext } from "../../context/Authentication";
import { HashLoader } from "react-spinners";
import { getAppointments } from "../../redux/slices/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AppointmentTable = () => {
  const dispatch = useDispatch();
  const {
    appointments,
    error,
    appointLoading: loading,
  } = useSelector((state) => state.staff);
  const { staff } = useOutletContext();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    dispatch(getAppointments({ token, id: staff._id }));
  }, [staff, token]);

  const confirmedAppoinments = appointments?.filter(
    (appointments) => appointments.status === "Confirmed"
  );
  const cancelledAppoinments = appointments?.filter(
    (appointments) => appointments.status === "Cancelled"
  );
  const [popup, Setpopup] = useState(false);
  const [currentIndex, SetCurrentIndex] = useState(-1);
  const [currentId, SetCurrentId] = useState("");

  const handleClick = (id, index) => {
    SetCurrentId(id);
    Setpopup(!popup);
    SetCurrentIndex(index);
  };

  useEffect(() => {
    if (error?.length > 0 || Object.keys(error).length > 0) {
      if (error.message?.includes("jwt must be provided")) return;
      toast.error(error.message);
      return;
    }
  }, [error]);

  if (error?.length === 0 && loading) {
    return <HashLoader size={60} />;
  }
  return (
    <div className="-ml-5 sm:ml-0">
      <section className="overview">
        <article className="appointment">
          <div className="brief md:bg-light-blue md:p-8 p-4 text-center sm:text-left">
            <p>
              Total Appointment <span>{appointments.length}</span>
            </p>
            <p>
              Confirmed Appointment <span>{confirmedAppoinments.length}</span>
            </p>
            <p>
              Canceled Appointment <span>{cancelledAppoinments.length}</span>
            </p>
          </div>
          <div className="table">
            <table
              className={
                popup ? "w-[60%] sm:w-[83%] md:w-[77%] lg:w-[89%]" : "w-full"
              }
            >
              <thead className="table-header">
                <tr>
                  <th>S/N</th>
                  <th>Patient Name</th>
                  <th>Patient Symptoms</th>
                  <th>Appoinment Date</th>
                  <th>Appoinment Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {appointments.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-2xl font-bold text-dark-blue-800 text-center py-4"
                    >
                      No Appointment Found
                    </td>
                  </tr>
                )}
                {appointments.map(
                  (
                    { symptoms, patient, appointment_date, status, _id, notes },
                    index
                  ) => {
                    const dates = new Date(appointment_date).getTime();
                    const today = Date.now();
                    const date = new Date(appointment_date).toDateString();
                    const time = new Date(
                      appointment_date
                    ).toLocaleTimeString();
                    return (
                      <tr key={index} className="relative">
                        <td>{index + 1}</td>
                        <td>{`${patient.first_name} ${patient.last_name}`}</td>
                        <td>{symptoms}</td>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>{status}</td>
                        <td>
                          <FaEllipsisV
                            className="font-light cursor-pointer"
                            onClick={() => handleClick(_id, index)}
                          />
                        </td>
                        {popup && currentIndex === index && (
                          <Popup
                            id={currentId}
                            dates={dates}
                            today={today}
                            userType={"Staff"}
                            closePopup={Setpopup}
                            notes={notes}
                          />
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AppointmentTable;
