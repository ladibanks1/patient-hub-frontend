import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointment } from "../../redux/slices/patientSlice";
import Modal from "../../components/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";

const baseURL = import.meta.env.VITE_BASE_URL;
const Appointment = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { appointments: response } = useSelector((state) => state.patient);
  const { appointments } =
    response === undefined || response.length == 0 ? [] : response.data;

  const { id: patientId } = useOutletContext();

  // Api Client
  const apiClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const onCloseModal = () => {
    setOpenModal(false);
    setConfirm(false);
  };

  const onConfirmModal = async (date) => {
    setConfirm(true);
    setOpenModal(false);

    // Switch For Modal Action
    switch (message) {
      case "Cancel":
        try {
          const response = await apiClient.get(
            `appointment/cancel-appointment/${id}`
          );
          if (response.data) {
            toast.success(response.data.message);
            dispatch(getAppointment({ id: patientId, token }));
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
            dispatch(getAppointment({ id: patientId, token }));
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
            dispatch(getAppointment({ id: patientId, token }));
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

  const handleCancel = async (id) => {
    setId(id);
    setMessage("Cancel");
    setModalType("");
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    setId(id);
    setMessage("Delete");
    setModalType("");
    setOpenModal(true);
  };

  const handleReschedule = async (id) => {
    setId(id);
    setMessage("Reschedule");
    setModalType("Reschedule");

    setOpenModal(true);
  };

  if (response === undefined || response.length == 0) return;

  return (
    <>
      <AppointmentDetails
        {...{
          appointments,
          handleCancel,
          handleDelete,
          handleReschedule,
        }}
      />
      <Modal
        isOpen={openModal}
        message={`Are You Sure You Want to ${message} the Appointment?`}
        onClose={onCloseModal}
        onConfirm={onConfirmModal}
        type={modalType}
      />
    </>
  );
};

export default Appointment;
