import { useOutletContext } from "react-router-dom";
import "../../css/HospitalDashboard.css";
import { FaStar } from "react-icons/fa";
const Overview = () => {
  const { hospital  , appointments} = useOutletContext();
  const avRating = Math.floor(hospital.data.ratings.reduce((a, b) => a + b, 0));

  return (
    <>
      <div className="staff-overview">
        <section>
          <p>Average Rating</p>
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                style={{ color: avRating > index ? "gold" : "gray" }}
              />
            ))}
          </div>
        </section>
        <section>
          <p>Total Patients</p>
          <p className="mt-2 text-2xl">{hospital.data.patients.length}</p>
        </section>
        <section>
          <p>Total Staff</p>
          <p className="mt-2 text-2xl">{hospital.data.staffs.length}</p>
        </section>
        <section>
          <p>Appointment Booked</p>
          <p></p>
        </section>
        <section>
          <p>Appointment Booked</p>
          <p></p>
        </section>
        <section>
          <p>Appointment Booked</p>
          <p></p>
        </section>
        <section>
          <p>Appointment Booked</p>
          <p></p>
        </section>
      </div>
    </>
  );
};

export default Overview;
