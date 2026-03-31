import AdminLayout from "../../Layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Dashboard</h2>
        <p className="mt-2 text-[#6b7280]">Admin dashboard content goes here.</p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;