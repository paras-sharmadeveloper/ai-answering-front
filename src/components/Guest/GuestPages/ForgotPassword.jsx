import { useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import TextField from "../../forms/TextField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import ButtonSecondary from "../../commondata/ButtonSecondary";
import MessageBox from "../../commondata/MessageBox";
import { findUserByEmail } from "../javafiles/authStorage";
import { validateEmail } from "../javafiles/validators";

const ForgotPassword = ({ form, setForm, goTo }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage("");
    setForm((prev) => ({ ...prev, email: event.target.value }));
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
    <AuthLayout variant="forgotPassword">
      <div className="mx-auto w-full max-w-[380px]">
        <AuthHeading
          title="Forgot Password"
          subtitle="Enter your email for instructions."
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

          <ButtonPrimary onClick={handleContinue}>Continue</ButtonPrimary>

          <ButtonSecondary onClick={() => goTo("signin")}>
            Back to Sign In
          </ButtonSecondary>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;