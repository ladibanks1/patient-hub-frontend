import { useState } from "react";
import { FaSignOutAlt, FaArrowRight, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
const Home = () => {
  const { appointments: response } = useSelector((state) => state.patient);
  const [popup, Setpopup] = useState(false);
  const [currentIndex, SetCurrentIndex] = useState(-1);
  const [currentId, SetCurrentId] = useState("");

  const { appointments } =
    response === undefined || response.length == 0 ? [] : response.data;

  const handleClick = (id, index) => {
    SetCurrentId(id);
    Setpopup(!popup);
    SetCurrentIndex(index);
  };

  const confirmedAppoinments = appointments?.filter(
    (appointments) => appointments.status === "Confirmed"
  );
  const cancelledAppoinments = appointments?.filter(
    (appointments) => appointments.status === "Cancelled"
  );
  if (response === undefined || response.length == 0) return;
  return (
    <section className="overview ">
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
                <th>Doctor's Name</th>
                <th>Hospital</th>
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
                  { doctor, hospital, appointment_date, status, _id },
                  index
                ) => {
                  const dates = new Date(appointment_date).getTime();
                  const today = Date.now();
                  const date = new Date(appointment_date).toDateString();
                  const time = new Date(appointment_date).toLocaleTimeString();
                  return (
                    <tr key={index} className="relative">
                      <td>{index + 1}</td>
                      <td>Dr {doctor.last_name}</td>
                      <td>{hospital.name}</td>
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
                        <Popup id={currentId} dates={dates} today={today} userType={"Patient"} />
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

          <div className="extras">
            <Link to="/patient-dashboard/book-appointment">
              <button className="flex md:gap-4 md:p-3 gap-2 p-2 sm:gap-3 sm:p-3 text-sm sm:text-base items-center">
                Book A New Appointment <FaSignOutAlt />
              </button>
            </Link>
            <Link to="/patient-dashboard/appointment">
              <p className="text-sm md:text-xl sm:text-base text-dark-blue-800 ">
                Show More <FaArrowRight className="inline" />
              </p>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Home;
