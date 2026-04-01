import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;