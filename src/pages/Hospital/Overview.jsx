import { useOutletContext } from "react-router-dom";
import "../../css/HospitalDashboard.css";
import Ratings from "../../components/Ratings";
const Overview = () => {
  const { hospital, appointments: response } = useOutletContext();

  // Average Rating
  const avRating = Math.floor(hospital.data.ratings.reduce((a, b) => a + b, 0));

  // Appointments
  const { appointments } = response.data ? response.data : [];

  if (!appointments) return null;

  // Appointments Status Filter
  const completedAppointments =
    appointments.length > 0
      ? appointments.filter((appointment) => appointment.status === "Completed")
      : [];
  const cancelledAppointments =
    appointments.length > 0
      ? appointments.filter((appointment) => appointment.status === "Cancelled")
      : [];
  const rescheduledAppointments =
    appointments.length > 0
      ? appointments.filter(
          (appointment) => appointment.status === "Rescheduled"
        )
      : [];

  const hospitalDoctor = hospital.data.staffs.filter(
    ({ position }) => position === "Doctor"
  );

  return (
    <>
      <div className="staff-overview">
        <div className="flex flex-row flex-wrap gap-10 -mx-20 md:-mx-16 lg:-mx-10 justify-evenly top-view">
          <section className="!w-[170px] md:w-auto ">
            <p>Average Rating</p>
            <div className="flex gap-2 mt-4">
              <Ratings avRating={avRating}/>
            </div>
          </section>
          <section className="!w-[170px] md:w-auto">
            <p>Total Patients</p>
            <p className="mt-2 text-2xl">{hospital.data.patients.length}</p>
          </section>
          <section className="!w-[170px] md:w-auto">
            <p>Total Staff</p>
            <p className="mt-2 text-2xl">{hospital.data.staffs.length}</p>
          </section>
        </div>
      </div>
      <h1 className="text-3xl text-dark-blue-800 font-bold ms-7">Specialized Roles</h1>
      <section className="special">
        {hospitalDoctor.map(({ specialism }, index) => (
          <article key={index}>{specialism}</article>
        ))}
      </section>

      <div className="staff-overview bottom-view">
        {/* Appoinments */}
        <section className="h-[200px]">
          <p>Appointment Booked</p>
          <p>{appointments.length}</p>
        </section>
        <section className="h-[200px]">
          <p>Appointment Completed</p>
          <p>{completedAppointments.length}</p>
        </section>
        <section className="h-[200px]">
          <p>Appointment Rescheduled</p>
          <p>{rescheduledAppointments.length}</p>
        </section>
        <section className="h-[200px]">
          <p>Appointment Cancelled</p>
          <p>{cancelledAppointments.length}</p>
        </section>
      </div>
    </>
  );
};

export default Overview;
