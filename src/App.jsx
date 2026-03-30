import { useState } from "react";
import "./App.css";

import SignUpScreen from "./components/differentscreens/SignUpScreen";
import SignInScreen from "./components/differentscreens/SignInScreen";
import ForgotPasswordScreen from "./components/differentscreens/ForgotPasswordScreen";
import CheckEmailScreen from "./components/differentscreens/CheckEmailScreen";
import OtpVerificationScreen from "./components/differentscreens/OtpVerificationScreen";
import CreateNewPasswordScreen from "./components/differentscreens/CreateNewPasswordScreen";
import PasswordChangedScreen from "./components/differentscreens/PasswordChangedScreen";

export default function App() {
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
        <SignUpScreen
          form={signupForm}
          setForm={setSignupForm}
          goTo={setScreen}
          setSigninForm={setSigninForm}
        />
      )}

      {screen === "signin" && (
        <SignInScreen
          form={signinForm}
          setForm={setSigninForm}
          goTo={setScreen}
        />
      )}

      {screen === "forgot-password" && (
        <ForgotPasswordScreen
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
        />
      )}

      {screen === "check-email" && (
        <CheckEmailScreen
          form={resetForm}
          goTo={setScreen}
        />
      )}

      {screen === "otp-verification" && (
        <OtpVerificationScreen
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
        />
      )}

      {screen === "create-new-password" && (
        <CreateNewPasswordScreen
          form={resetForm}
          setForm={setResetForm}
          goTo={setScreen}
          setSigninForm={setSigninForm}
        />
      )}

      {screen === "password-changed" && (
        <PasswordChangedScreen goTo={setScreen} />
      )}
    </div>
  );
}