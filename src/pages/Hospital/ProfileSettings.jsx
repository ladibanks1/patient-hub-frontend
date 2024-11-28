import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateHospitalProfile } from "../../redux/slices/hospitalSlice";
import { clearError } from "../../redux/slices/hospitalSlice";
import { toast } from "react-toastify";
import ProfileForm from "./ProfileForm";
import { deleteProfile } from "../../redux/slices/hospitalSlice";
import { useNavigate } from "react-router-dom";
import { clearState } from "../../redux/slices/authSlice";
import Modal from "../../components/Modal";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, token, hospital } = useOutletContext();

  const { updateLoading: loading, error } = useSelector(
    (state) => state.hospital
  );

  const { data } = hospital;

  const [hospitalForm, setHospitalForm] = useState({
    name: data.name,
    tel: data.tel,
    address: data.address,
    email: data.email,
    state: data.state,
    LGA: data.LGA,
  });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setHospitalForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHospitalProfile({ id, token, data: hospitalForm })).then(
      (res) => {
        if (!res?.error && res.payload) {
          dispatch(clearError());
          toast.success(res.payload.message);
          return;
        }
      }
    );
  };

  // Handle Deletion and Modal

  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    dispatch(deleteProfile({ id, token })).then((res) => {
      if (res?.error) {
        toast.error(res.payload?.message);
        return;
      }
      toast.success(res.payload.message);
      navigate("/");
      sessionStorage.removeItem("patientHub_token");
      dispatch(clearState());
    });
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ProfileForm
        {...{
          handleChange,
          handleSubmit,
          hospitalForm,
          error,
          loading,
          handleClick: handleDeleteClick,
        }}
      />
      <Modal
        isOpen={isOpen}
        message={
          "Are you sure you want to delete your profile? This action cannot be undone"
        }
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ProfileSettings;
