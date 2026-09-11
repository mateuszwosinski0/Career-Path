import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import AddApplication from "@/pages/AddApplication";
import Settings from "@/pages/Settings";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ProtectedRoute from "@/auth/ProtectedRoute";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="reset-password" element={<ResetPassword/>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

       <Route
        element={
            <AppLayout />
          
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/new" element={<AddApplication />} />
        <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      </Route>
    </Routes>
  );
}

export default App;