    export default function AuthShell({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[648px] items-center justify-center rounded-[24px] bg-[#efefef] px-6 py-10 sm:px-10">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}