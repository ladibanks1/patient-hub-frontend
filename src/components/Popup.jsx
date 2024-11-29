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

const Popup = ({
  id,
  dates,
  today,
  userType,
  closePopup,
  hospital,
  doctor,
  notes,
}) => {
  const { token } = useContext(AuthContext);
  const { id: patientId, staff } = useOutletContext();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [confirm, setConfirm] = useState(false);

  const apiClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onCloseModal = () => {
    setOpenModal(false);
    setConfirm(false);
    closePopup(false);
  };

  const handleApiResponse = async (apiCall, successMessage) => {
    try {
      const response = await apiCall();
      if (response.data) {
        toast.success(response.data.message);
        if (userType === "Patient") {
          dispatch(getAppointment({ id: patientId, token }));
        } else if (userType === "Staff") {
          dispatch(getAppointments({ token, id: staff._id }));
        }
      }
    } catch (error) {
      const errorMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message[0].message
        : error.response.data.message;
      toast.error(errorMessage);
    }
  };

  const onConfirmModal = async (date = "", rating = 0) => {
    setConfirm(true);
    setOpenModal(false);
    closePopup(false);

    const apiCalls = {
      Cancel: () => apiClient.get(`/appointment/cancel-appointment/${id}`),
      Delete: () => apiClient.delete(`/appointment/delete-appointment/${id}`),
      Confirm: () => apiClient.get(`/appointment/confirm-appointment/${id}`),
      Reschedule: () =>
        apiClient.get(`/appointment/reschedule-appointment/${id}?date=${date}`),
      "Rate Doctor": () =>
        apiClient.get(`/staff/rate-staff/${doctor._id}?rating=${rating}`),
      "Rate Hospital": () =>
        apiClient.get(
          `/hospital/rate-hospital/${hospital._id}?rating=${rating}`
        ),
    };

    if (apiCalls[message]) {
      await handleApiResponse(apiCalls[message], message);
    }
  };

  const handleAction = (action, type = "") => {
    setModalType(type);
    setMessage(action);
    setOpenModal(true);
  };

  return (
    <td>
      <div className="rounded-md absolute bg-[#02b4bd50] sm:-right-28 top-0 z-20 p-3 flex flex-col gap-3">
        <div>
          <button
            className="bg-gray-400 p-2 hover:bg-gray-600 hover:border-none hover:text-white w-[95%] disabled:hover:cursor-not-allowed"
            onClick={() => handleAction("Cancel")}
            disabled={dates <= today}
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 p-2 hover:bg-red-800 hover:border-none hover:text-white w-[95%]"
            onClick={() =>
              handleAction(userType === "Patient" ? "Delete" : "Confirm")
            }
          >
            {userType === "Patient" ? "Delete" : "Confirm"}
          </button>
        </div>
        <div>
          <button
            className="bg-green-500 p-2 hover:bg-green-700 hover:border-none hover:text-white disabled:hover:cursor-not-allowed"
            onClick={() => handleAction("Reschedule", "Reschedule")}
            disabled={dates <= today}
          >
            Reschedule
          </button>
        </div>
        {userType === "Patient" && (
          <>
            <div>
              <button
                className="bg-dark-blue-800 p-2 px-4 hover:bg-fade-dark-blue hover:border-none hover:text-white disabled:hover:cursor-not-allowed"
                onClick={() => handleAction("Rate Doctor", "Rating")}
              >
                Rate Doc
              </button>
            </div>
            <div>
              <button
                className="bg-blue-500 p-2 hover:bg-blue-700 hover:border-none hover:text-white disabled:hover:cursor-not-allowed"
                onClick={() => handleAction("Rate Hospital", "Rating")}
              >
                Rate Hospital
              </button>
            </div>
          </>
        )}
        {userType === "Staff" && (
          <div>
            <button
              className="bg-blue-500 p-2 hover:bg-blue-700 hover:border-none hover:text-white disabled:hover:cursor-not-allowed"
              onClick={() => handleAction(notes, "Notes")}
            >
              View Notes
            </button>
          </div>
        )}
      </div>
      <Modal
        isOpen={openModal}
        message={
          modalType === "Rating" || modalType === "Notes"
            ? message
            : `Are You Sure You Want to ${message} the Appointment?`
        }
        type={modalType}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
      />
    </td>
  );
};

export default Popup;
