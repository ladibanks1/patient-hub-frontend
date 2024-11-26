import { useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import "../../css/HospitalDashboard.css";
import Ratings from "../../components/Ratings";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../../redux/slices/staffSlice";
import { toast } from "react-toastify";
import { hospitalProfile } from "../../redux/slices/hospitalSlice";

const Staffs = () => {
  const { hospital, token, id } = useOutletContext();
  const [delClick, setDelClick] = useState(false);
  const [staffId, setStaffId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffs = hospital.data.staffs;

  const handleDelete = (id) => {
    setDelClick(true);
    setStaffId(id);
  };

  // Modal On Close
  const handleClose = () => {
    setDelClick(false);
  };

  // Modal Confirm
  const handleConfirm = () => {
    dispatch(deleteStaff({ id: staffId, token }))
      .then((res) => {
        if (res.payload?.message.includes("Successfully")) {
          toast.success(res.payload.message);
        } else {
          toast.error(res.payload.message);
        }
      })
      .finally(() => {
        setDelClick(false);
        dispatch(hospitalProfile({ id, token }));
      });
  };
  if (staffs.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-full  font-bold">
        <p className="text-3xl">No Staff Avaliable</p>
        <Link to="/hospital-dashboard/register-staff">
          <button className="mt-3 p-2 text-xl">Register Staff</button>
        </Link>
      </div>
    );
  return (
    <section className="relative">
      <Link
        to="/hospital-dashboard/register-staff"
        className="absolute right-5 top-2"
      >
        <button>Register Staff</button>
      </Link>
      <div className="flex gap-6 flex-wrap p-7 pt-16">
        {staffs.map((staff) => {
          // Average Staf Ratings
          const avRating = staff.ratings.reduce((a, b) => a + b, 0);
          return (
            <section
              key={staff._id}
              className="bg-[#ACE7E9] p-5 rounded max-w-[290px] w-full span-bold relative"
            >
              <p>
                <span>First Name:</span> {staff.first_name}
              </p>
              <p>
                <span>Last Name:</span> {staff.last_name}
              </p>
              <p>
                <span>Position:</span> {staff.position}
              </p>
              {staff?.specialism && (
                <p>
                  <span>Specialism:</span> {staff.specialism}
                </p>
              )}
              <p>
                <span>Email:</span> {staff.email}
              </p>
              <p className="flex items-center">
                <span className="me-1">Av.Rating:</span>
                <Ratings avRating={avRating} />
              </p>
              <div className="absolute top-1 text-xl right-3 cursor-pointer flex gap-2">
                <FaEdit
                  className="hover:text-blue-800"
                  onClick={() =>
                    navigate("/hospital-dashboard/edit-staff", {
                      state: {
                        id: staff._id,
                      },
                    })
                  }
                />
                <FaTrash
                  className="hover:text-red-600"
                  onClick={() => handleDelete(staff._id)}
                />
              </div>
            </section>
          );
        })}
      </div>
      {delClick && (
        <Modal
          isOpen={delClick}
          onClose={handleClose}
          message={"Are you Sure You Want to Delete this Staff"}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
};

export default Staffs;
