import { useState } from "react";
import "./App.css";

import SignUp from "./components/Guest/GuestPages/SignUp";
import SignIn from "./components/Guest/GuestPages/SignIn";
import ForgotPassword from "./components/Guest/GuestPages/ForgotPassword";
import CheckEmail from "./components/Guest/GuestPages/CheckEmail";
import OtpVerification from "./components/Guest/GuestPages/OtpVerification";
import CreateNewPassword from "./components/Guest/GuestPages/CreateNewPassword";
import PasswordChanged from "./components/Guest/GuestPages/PasswordChanged";

const App = () => {
  const [screen, setScreen] = useState("signup");

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

  return (
    <div className="min-h-screen bg-white">
      {screen === "signup" && (
        <SignUp
          form={signupForm}
          setForm={setSignupForm}
          goTo={setScreen}
          setSigninForm={setSigninForm}
        />
      )}

      {screen === "signin" && (
        <SignIn
          form={signinForm}
          setForm={setSigninForm}
          goTo={setScreen}
        />
      )}

      {screen === "forgot-password" && (
        <ForgotPassword
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
        />
      )}

      {screen === "check-email" && (
        <CheckEmail form={resetForm} goTo={setScreen} />
      )}

      {screen === "otp-verification" && (
        <OtpVerification
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
        />
      )}

      {screen === "create-new-password" && (
        <CreateNewPassword
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
          setSigninForm={setSigninForm}
        />
      )}

      {screen === "password-changed" && (
        <PasswordChanged goTo={setScreen} />
      )}
    </div>
  );
};

export default App;