import AuthLeftPanel from "./AuthLeftPanel";

const AuthLayout = ({ children, variant = "signup" }) => {
  return (
    <div className="min-h-screen bg-[#f3f4f6] p-2 md:p-3 my-5">
      <div className="mx-auto grid min-h-[120vh] w-full max-w-[1450px] overflow-hidden  grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
        <AuthLeftPanel variant={variant} />

        <div className="flex items-center justify-center bg-[#f8f8f8] px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[470px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;