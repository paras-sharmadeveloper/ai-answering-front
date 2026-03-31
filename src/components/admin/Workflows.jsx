import AdminLayout from "../Layouts/AdminLayout";

const Workflows = ({ current, onNavigate, onLogout }) => {
  return (
    <AdminLayout current={current} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Workflows</h2>
        <p className="mt-2 text-[#6b7280]">Automate follow-up actions and CRM updates after calls.</p>
      </div>
    </AdminLayout>
  );
};

export default Workflows;
