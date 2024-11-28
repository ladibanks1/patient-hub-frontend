import axios from "axios";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { getAppointment } from "../redux/slices/patientSlice";
import { getAppointments } from "../redux/slices/staffSlice";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/Authentication";

const baseURL = import.meta.env.VITE_BASE_URL;

const Popup = ({ id, dates, today, userType }) => {
  const { token } = useContext(AuthContext);

  const { id: patientId, staff } = useOutletContext();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [confirm, setConfirm] = useState(false);

  // Api Client
  const apiClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onCloseModal = () => {
    setOpenModal(false);
    setConfirm(false);
  };

  const onConfirmModal = async (date) => {
    setConfirm(true);
    setOpenModal(false);

    // Switch For Popup Actions

    switch (message) {
      case "Cancel":
        try {
          const response = await apiClient.get(
            `appointment/cancel-appointment/${id}`
          );
          if (response.data) {
            toast.success(response.data.message);
            if (userType === "Patient")
              dispatch(getAppointment({ id: patientId, token }));
            if (userType === "Staff")
              dispatch(getAppointments({ token, id: staff._id }));
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        break;

      case "Delete":
        try {
          const response = await apiClient.delete(
            `appointment/delete-appointment/${id}`
          );
          if (response.data) {
            toast.success(response.data.message);
            if (userType === "Patient")
              dispatch(getAppointment({ id: patientId, token }));
            if (userType === "Staff")
              dispatch(getAppointments({ token, id: staff._id }));
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        break;
      case "Confirm":
        try {
          const response = await apiClient.get(
            `appointment/confirm-appointment/${id}`
          );
          if (response.data) {
            toast.success(response.data.message);
            if (userType === "Patient")
              dispatch(getAppointment({ id: patientId, token }));
            if (userType === "Staff")
              dispatch(getAppointments({ token, id: staff._id }));
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
        break;

      case "Reschedule":
        try {
          const response = await apiClient.get(
            `appointment/reschedule-appointment/${id}?date=${date}`
          );
          if (response.data) {
            toast.success(response.data.message);
            if (userType === "Patient")
              dispatch(getAppointment({ id: patientId, token }));
            if (userType === "Staff")
              dispatch(getAppointments({ token, id: staff._id }));
          }
        } catch (error) {
          if (Array.isArray(error.response.data.message)) {
            toast.error(error.response.data.message[0].message);
          }
          if (!Array.isArray(error.response.data.message)) {
            toast.error(error.response.data.message);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleCancel = async () => {
    setModalType("");
    setMessage("Cancel");
    setOpenModal(true);
  };

  const handleDelete = async () => {
    setModalType("");
    setMessage("Delete");
    setOpenModal(true);
  };

  const handleReschedule = async () => {
    setMessage("Reschedule");
    setModalType("Reschedule");
    setOpenModal(true);
  };

  const handleConfirm = () => {
    setModalType("");
    setMessage("Confirm");
    setOpenModal(true);
  };

  return (
    <td>
      <div className="rounded-md absolute bg-[#02b4bd50] sm:-right-28 top-0 z-20 p-3 flex flex-col gap-3">
        <div>
          <button
            className="bg-gray-400 p-2 hover:bg-gray-600 hover:border-none hover:text-white w-[95%] disabled:hover:cursor-not-allowed"
            onClick={handleCancel}
            disabled={dates > today ? false : true}
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 p-2 hover:bg-red-800 hover:border-none hover:text-white w-[95%]"
            onClick={userType === "Patient" ? handleDelete : handleConfirm}
          >
            {userType === "Patient" ? "Delete" : "Confirm"}
          </button>
        </div>
        <div>
          <button
            className="bg-green-500 p-2 hover:bg-green-700 hover:border-none hover:text-white disabled:hover:cursor-not-allowed"
            onClick={handleReschedule}
            disabled={dates > today ? false : true}
          >
            Reschedule
          </button>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        message={`Are You Sure You Want to ${message} the Appointment?`}
        type={modalType}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
      />
    </td>
  );
};

export default Popup;
