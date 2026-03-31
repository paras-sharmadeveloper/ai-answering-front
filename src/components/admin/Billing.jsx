import AdminLayout from "../Layouts/AdminLayout";

const Billing = ({ current, onNavigate, onLogout }) => {
  return (
    <AdminLayout current={current} onNavigate={onNavigate} onLogout={onLogout}>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Billing</h2>
        <p className="mt-2 text-[#6b7280]">Manage subscription plan, usage and invoices.</p>
      </div>
    </AdminLayout>
  );
};

export default Billing;
