import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import AddApplication from "@/pages/AddApplication";
import Settings from "@/pages/Settings";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route
          path="/applications/new"
          element={<AddApplication />}
        />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;