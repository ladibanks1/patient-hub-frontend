import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

// Layouts
import HomeLayout from "./layout/HomeLayout";

// Pages
import HomePage from "./pages/HomePage";
import RegisterPatientPage from "./pages/Patient/RegisterPage";
import RegisterHospitalPage from "./pages/Hospital/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Authentication from "./context/Authentication";
import ResetPassword from "./pages/ResetPassword";


// Patient Pages
import PatientDashboard from "./pages/Patient/Dashboard";

// Hospital Pages
import HospitalDashbord from "./pages/Hospital/Dashboard";
import RegisterStaffPage from "./pages/Hospital/RegisterStaffPage";

function App() {
  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Home And Sign Up Page */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="register-patient" element={<RegisterPatientPage />} />
          <Route path="register-hospital" element={<RegisterHospitalPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Dashboard And App Functionality */}
        <Route path="/" element={<Authentication />}>
          {/* Dashboard Navbar */}
          {/* Patient Route */}
          <Route path="patient-dashboard" element={<PatientDashboard />} />

          {/* Hospital Route */}
          <Route path="hospital-dashboard" element={<HospitalDashbord />}>
            <Route path="register-staff" element={<RegisterStaffPage />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<>Not Found</>} />
      </Route>
    )
  );
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
