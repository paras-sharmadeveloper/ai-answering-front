const AdminSidebar = () => {
  return (
    <aside className="min-h-[calc(100vh-73px)] w-[260px] border-r border-[#e5e7eb] bg-white p-4">
      <nav className="space-y-2">
        <div className="rounded-lg bg-[#f3f4f6] px-4 py-3 text-sm font-medium">
          Dashboard
        </div>
        <div className="rounded-lg px-4 py-3 text-sm font-medium text-[#4b5563]">
          Users
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;