import { useState } from "react";
import "./App.css";

import SignUp from "./components/Guest/GuestPages/SignUp";
import SignIn from "./components/Guest/GuestPages/SignIn";
import ForgotPassword from "./components/Guest/GuestPages/ForgotPassword";
import CheckEmail from "./components/Guest/GuestPages/CheckEmail";
import OtpVerification from "./components/Guest/GuestPages/OtpVerification";
import CreateNewPassword from "./components/Guest/GuestPages/CreateNewPassword";
import PasswordChanged from "./components/Guest/GuestPages/PasswordChanged";

import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import AIAgent from "./components/admin/AIAgent";
import PhoneNumbers from "./components/admin/PhoneNumbers";
import CallLogs from "./components/admin/CallLogs";
import Analytics from "./components/admin/Analytics";
import Workflows from "./components/admin/Workflows";
import Billing from "./components/admin/Billing";
import Settings from "./components/admin/Settings";

const adminScreens = {
  dashboard: Dashboard,
  users: Users,
  "ai-agent": AIAgent,
  "phone-numbers": PhoneNumbers,
  "call-logs": CallLogs,
  analytics: Analytics,
  workflows: Workflows,
  billing: Billing,
  settings: Settings,
};

const App = () => {
  const [screen, setScreen] = useState("signup");
  const [selectedCall, setSelectedCall] = useState(null);

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const [resetForm, setResetForm] = useState({
    email: "",
    otp: ["", "", "", ""],
    generatedOtp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const isAdminArea = Object.keys(adminScreens).includes(screen);

  const renderAdminScreen = () => {
    const PageComponent = adminScreens[screen];
    if (!PageComponent) return null;

    return (
      <PageComponent
        current={screen}
        onNavigate={setScreen}
        onLogout={() => setScreen("signin")}
        onSelectCall={(call) => {
          setSelectedCall(call);
          setScreen("call-logs");
        }}
        selectedCall={selectedCall}
        onBack={() => setScreen("call-logs")}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {!isAdminArea && (
        <div>
          {screen === "signup" && (
            <SignUp
              form={signupForm}
              setForm={setSignupForm}
              goTo={setScreen}
              setSigninForm={setSigninForm}
            />
          )}

          {screen === "signin" && (
            <SignIn form={signinForm} setForm={setSigninForm} goTo={setScreen} />
          )}

          {screen === "forgot-password" && (
            <ForgotPassword form={resetForm} setForm={setResetForm} goTo={setScreen} />
          )}

          {screen === "check-email" && <CheckEmail form={resetForm} goTo={setScreen} />}

          {screen === "otp-verification" && (
            <OtpVerification form={resetForm} setForm={setResetForm} goTo={setScreen} />
          )}

          {screen === "create-new-password" && (
            <CreateNewPassword
              form={resetForm}
              setForm={setResetForm}
              goTo={setScreen}
              setSigninForm={setSigninForm}
            />
          )}

          {screen === "password-changed" && <PasswordChanged goTo={setScreen} />}
        </div>
      )}

      {isAdminArea && renderAdminScreen()}

      {!isAdminArea && screen === "signin" && (
        <div className="mx-auto mt-4 max-w-md text-center text-sm text-[#6b7280]">
          Already have account? login to access dashboard
        </div>
      )}
    </div>
  );
};

export default App;