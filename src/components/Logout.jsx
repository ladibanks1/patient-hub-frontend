import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/slices/authSlice";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const Logout = ({ token }) => {
  const dispatch = useDispatch();
  const apiClient = axios.create({
    baseURL,
  });

  // Logout User
  const logOut = async () => {
    try {
      const response = await apiClient.get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const data = logOut();
    if (data?.status > 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch(clearState());
      navigate("/login");
      sessionStorage.removeItem("patientHub_token");
    }
  };
  return (
    <div>
      <button onClick={handleClick} className="px-4">
        Logout
      </button>
    </div>
  );
};

export default Logout;
