import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
