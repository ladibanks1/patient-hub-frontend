import React from "react";
import { Link } from "react-router-dom";
const AppointmentDetails = ({
  appointments,
  handleCancel,
  handleDelete,
  handleReschedule,
}) => {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-2xl font-bold text-dark-blue-800">
          No Appointment Found
        </p>
        <Link to={"/patient-dashboard/book-appointment"}>
          <button className="mt-5">Book Appointment</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-2xl underline font-bold text-dark-blue-800">
          Upcoming Appointments
        </h2>
        <Link to={"/patient-dashboard/book-appointment"}>
          <button>Book Appointment</button>
        </Link>
      </div>
      <section className="flex max-w-full  flex-wrap py-5 px-2 gap-5">
        {appointments.map((items, index) => {
          const dates = new Date(items.appointment_date).getTime();
          const date = new Date(items.appointment_date).toDateString();
          const time = new Date(items.appointment_date).toLocaleTimeString();
          const today = Date.now();
          return (
            <>
              {dates > today && (
                <div
                  key={index}
                  className="w-[295px] bg-[#02b4bd49] p-3 rounded-md shadow-xl appointment"
                >
                  <article>
                    <span>Appointment Reason:</span>
                    <span>{items.symptoms}</span>
                  </article>
                  <article>
                    <span>Hospital Name: </span>
                    <span>{items.hospital.name}</span>
                  </article>
                  <article>
                    <span>Doctor: </span>
                    <span>{`Dr. ${items.doctor.first_name} ${items.doctor.last_name}`}</span>
                  </article>
                  <article>
                    <span>Appointment Date: </span>
                    <span>{date}</span>
                  </article>
                  <article>
                    <span>Appointment Time: </span>
                    <span>{time}</span>
                  </article>
                  <article>
                    <span>Short Notes:</span>
                    <span>{items.notes}</span>
                  </article>
                  <article className="flex gap-5 justify-around mt-10 -ms-1">
                    <button
                      className="bg-gray-400 hover:bg-gray-600 hover:border-none hover:text-white px-3 py-2"
                      onClick={() => handleCancel(items._id)}
                    >
                      cancel
                    </button>
                    <button
                      className="bg-[#02b4bd] hover:bg-[#165b5f] hover:border-none hover:text-white px-3 py-2"
                      onClick={() => handleDelete(items._id)}
                    >
                      delete
                    </button>
                    <button
                      className="bg-dark-blue-800/90 hover:bg-dark-blue-800 hover:border-none hover:text-white px-2 py-2"
                      onClick={() => handleReschedule(items._id)}
                    >
                      reschedule
                    </button>
                  </article>
                </div>
              )}
            </>
          );
        })}
      </section>
      <h2 className="text-2xl underline font-bold mt-10 text-fade-dark-blue">
        Previous Appointments
      </h2>
      <section className="flex max-w-full  flex-wrap py-5 px-2 gap-5">
        {appointments.map((items, index) => {
          const dates = new Date(items.appointment_date).getTime();
          const date = new Date(items.appointment_date).toDateString();
          const time = new Date(items.appointment_date).toLocaleTimeString();
          const today = Date.now();
          return (
            <>
              {dates < today && (
                <div
                  key={index}
                  className="w-[295px] bg-[#02b4bd49] p-3 rounded-md shadow-xl appointment"
                >
                  <article>
                    <span>Appointment Reason:</span>
                    <span>{items.symptoms}</span>
                  </article>
                  <article>
                    <span>Hospital Name: </span>
                    <span>{items.hospital.name}</span>
                  </article>
                  <article>
                    <span>Doctor: </span>
                    <span>{`Dr. ${items.doctor.first_name} ${items.doctor.last_name}`}</span>
                  </article>
                  <article>
                    <span>Appointment Date: </span>
                    <span>{date}</span>
                  </article>
                  <article>
                    <span>Appointment Time: </span>
                    <span>{time}</span>
                  </article>
                  <article>
                    <span>Short Notes:</span>
                    <span>{items.notes}</span>
                  </article>
                  <article className="flex gap-5 justify-end mt-10 ">
                    <button
                      className="bg-[#02b4bd] hover:bg-[#165b5f] hover:border-none hover:text-white px-3 py-2"
                      onClick={() => handleDelete(items._id)}
                    >
                      delete
                    </button>
                  </article>
                </div>
              )}
            </>
          );
        })}
      </section>
    </div>
  );
};

export default AppointmentDetails;
