const Dashboard = () => {
  return (
    <>
      <div className="grid gap-4 p-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Total Calls</h2>
          <p className="mt-2 text-4xl font-bold text-[#111827]">13,526</p>
          <p className="mt-1 text-sm text-[#10b981]">+13% in 7d</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Active Numbers</h2>
          <p className="mt-2 text-4xl font-bold text-[#111827]">27</p>
          <p className="mt-1 text-sm text-[#10b981]">+8% in 7d</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Leads Generated</h2>
          <p className="mt-2 text-4xl font-bold text-[#111827]">3,124</p>
          <p className="mt-1 text-sm text-[#10b981]">+22% in 7d</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-black">Recent Activity</h3>
        <p className="mt-2 text-[#6b7280]">
          Track latest calls, transfers and AI responses.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
