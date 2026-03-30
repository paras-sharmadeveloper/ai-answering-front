import { useState } from "react";
import AuthShell from "../auth/AuthShell.jsx";
import AuthHeading from "../auth/AuthHeading.jsx";
import TextField from "../auth/TextField.jsx";
import PrimaryButton from "../auth/PrimaryButton.jsx";
import SecondaryButton from "../auth/SecondaryButton.jsx";
import MessageBox from "../auth/MessageBox.jsx";
import { findUserByEmail } from "../../javafile/authStorage.js";
import { validateEmail } from "../../javafile/validators.js";

export default function ForgotPasswordScreen({ form, setForm, goTo }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage("");
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleContinue = () => {
    setMessage("");

    if (!validateEmail(form.email)) {
      setMessage("Enter a valid email.");
      return;
    }

    const user = findUserByEmail(form.email);

    if (!user) {
      setMessage("No account found with this email.");
      return;
    }

    const generatedOtp = String(Math.floor(1000 + Math.random() * 9000));

    setForm((prev) => ({
      ...prev,
      generatedOtp,
      otp: ["", "", "", ""],
      newPassword: "",
      confirmPassword: "",
    }));

    goTo("check-email");
  };

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[360px]">
        <AuthHeading
          title="Forgot Password"
          subtitle="Enter your email for instructins."
        />

        <div className="mt-12 space-y-6">
          <MessageBox message={message} />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon="mail"
          />

          <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>

          <SecondaryButton onClick={() => goTo("signin")}>
            Back to Sign In
          </SecondaryButton>
        </div>
      </div>
    </AuthShell>
  );
}