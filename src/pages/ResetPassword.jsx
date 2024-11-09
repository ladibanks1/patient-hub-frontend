import PasswordForm from "../components/PasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, postData } = usePost(
    `/auth/reset-password/${token}`
  );
//   Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    postData({ password });
  };


//   Error Status
  useEffect(() => {
    if (error?.statusCode > 400) {
      toast.error(error.message);
    } else if (data.message) {
      toast.success(data.message);
      navigate("/login");
    }
  }, [data, error]);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="my-20">
        <PasswordForm text={"Enter New Password:"} />
        <div className="flex justify-end">
            {
                loading ? (
                    <HashLoader color="#123abc" loading={loading} size={50} />
                ) : (
                    <button type="submit" className="bg-dark-blue-800 text-white p-2 rounded">Reset Password</button>
                )
            }
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
