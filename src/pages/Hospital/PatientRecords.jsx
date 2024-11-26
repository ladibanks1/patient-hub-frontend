import { useOutletContext } from "react-router-dom";
import "../../css/HospitalDashboard.css";

const baseURL = import.meta.env.VITE_BASE_URL;
const PatientRecords = () => {
  const { hospital } = useOutletContext();
  const { patients } = hospital ? hospital.data : "";

  if (!patients || patients.length === 0)
    return (
      <div className="flex justify-center items-center h-full text-3xl font-bold">
        <p>No patient Found</p>
      </div>
    );

  return (
    <div className="flex gap-6 flex-wrap p-5">
      {patients.map((patient) => {
        const appointments = patient.appointments;
        const latestAppointment = appointments[appointments.length - 1];
        return (
          <section
            key={patient._id}
            className="bg-[#ACE7E9] p-5 rounded max-w-[350px] w-full span-bold"
          >
            <p>
              <span>First Name:</span> {patient.first_name}
            </p>
            <p>
              <span>Last Name:</span> {patient.last_name}
            </p>
            <p>
              <span>Gender:</span> {patient.gender}
            </p>
            <p>
              <span>Phone No:</span> {patient.tel}
            </p>
            <p>
              <span>Email:</span> {patient.email}
            </p>
            <p>
              <span>Latest Appointment Date</span>:
              {new Date(latestAppointment.createdAt).toDateString()}
            </p>
            <p>
              <span>Latest Appointment Time</span>:
              {new Date(latestAppointment.appointment_date).toDateString()}
            </p>
          </section>
        );
      })}
    </div>
  );
};

export default PatientRecords;
