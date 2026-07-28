import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;