import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

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
import PatientHome from "./pages/Patient/Home";
import PatientAppointment from "./pages/Patient/Appointment";
import PatientProfileSettings from "./pages/Patient/ProfileSettings";
import PatientChat from "./pages/Patient/Chat";
import AppointmentForm from "./pages/Patient/AppointmentForm";

// Hospital Pages
import HospitalDashboard from "./pages/Hospital/Dashboard";
import RegisterStaffPage from "./pages/Hospital/RegisterStaffPage";
import HospitalOverview from "./pages/Hospital/Overview";
import HospitalStaffs from "./pages/Hospital/Staffs";
import HospitalProfileSettings from "./pages/Hospital/ProfileSettings";
import HospitalPatientRecords from "./pages/Hospital/PatientRecords";
import EditStaff from "./components/EditStaff";

// Staff Pages
import StaffDashboard from "./pages/Staff/Dashboard";
import AppointmentTable from "./pages/Staff/AppointmentTable";
import StaffChat from "./pages/Staff/Chat";
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
          <Route path="patient-dashboard" element={<PatientDashboard />}>
            <Route index element={<PatientHome />} />
            <Route path="appointment" element={<PatientAppointment />} />
            <Route path="settings" element={<PatientProfileSettings />} />
            <Route path="chat" element={<PatientChat />} />
            <Route path="book-appointment" element={<AppointmentForm />} />
          </Route>

          {/* Hospital Route */}
          <Route path="hospital-dashboard" element={<HospitalDashboard />}>
            <Route path="register-staff" element={<RegisterStaffPage />} />
            <Route path="edit-staff" element={<EditStaff />} />
            <Route index element={<HospitalOverview />} />
            <Route path="staffs" element={<HospitalStaffs />} />
            <Route
              path="patient-records"
              element={<HospitalPatientRecords />}
            />
            <Route path="settings" element={<HospitalProfileSettings />} />
          </Route>

          {/* Staff Route */}
          <Route path="staff-dashboard" element={<StaffDashboard />}>
            <Route index element={<AppointmentTable />} />
            <Route path="chat" element={<StaffChat />} />
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
