import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../../redux/slices/authSlice";
import PatientForm from "../../components/PatientProfileForm";
import {
  updateProfile,
  clearError,
  deleteProfile,
} from "../../redux/slices/patientSlice";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { patient, updateLoading, error } = useSelector(
    (state) => state.patient
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data } = patient;
  const navigate = useNavigate();
  // Patient Date of Birth Formatting
  const propDate = data.DOB;
  const year = new Date(propDate).getFullYear();
  const month = new Date(propDate).getMonth() + 1;
  const day = new Date(propDate).getDate().toString().padStart(2, "0");

  // Patient Form State
  const [patientForm, setPatientForm] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    tel: data.tel,
    gender: data.gender,
    DOB: `${year}-${month}-${day}`,
    state: data.state,
    LGA: data.LGA,
  });

  const handleChange = (e) => {
    // Handle Change
    const { name, value } = e.target;
    console.log(name, value);
    setPatientForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(patientForm.state);
    console.log(Object.fromEntries(form));
    dispatch(clearError());
    dispatch(updateProfile({ data: form, token, id: data._id })).then((res) => {
      if (res.error) {
        toast.error(res.payload?.message);
        return;
      }
      toast.success(res.payload.message);
    });
  };

  // Delete Profile
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your profile? \nThis action cannot be undone \nClick OK to proceed"
    );
    if (confirm) {
      dispatch(deleteProfile({ id: data._id, token })).then((res) => {
        if (res.error) {
          toast.error(res.payload?.message);
          return;
        }
        toast.success(res.payload.message);
        sessionStorage.removeItem("patientHub_token");
        navigate("/");
      });
    }
  };

  if (updateLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <HashLoader size={50} />;
      </div>
    );
  return (
    <PatientForm
      {...{
        handleChange,
        handleSubmit,
        patientForm,
        updateLoading,
        error,
        handleDelete,
      }}
      loading={updateLoading}
    />
  );
};

export default Profile;
