import { useState } from "react";
import AuthShell from "../components/AuthShell";
import AuthHeading from "../components/AuthHeading";
import OtpFieldGroup from "../components/OtpFieldGroup";
import PrimaryButton from "../components/PrimaryButton";
import MessageBox from "../components/MessageBox";

export default function OtpVerificationScreen({ form, setForm, goTo }) {
  const [message, setMessage] = useState("");

  const handleSetOtp = (nextOtp) => {
    setMessage("");
    setForm((prev) => ({ ...prev, otp: nextOtp }));
  };

  const handleSubmit = () => {
    const enteredOtp = form.otp.join("");

    if (enteredOtp.length !== 4) {
      setMessage("Please enter the 4-digit OTP.");
      return;
    }

    if (enteredOtp !== form.generatedOtp) {
      setMessage("Invalid OTP.");
      return;
    }

    goTo("create-new-password");
  };

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[460px] text-center">
        <AuthHeading
          title="OTP Verification"
          subtitle={`We have sent a verification code to email address ${form.email}`}
          linkText="Wrong Email?"
          onLinkClick={() => goTo("forgot-password")}
        />

        <MessageBox message={message} />
        <OtpFieldGroup otp={form.otp} setOtp={handleSetOtp} />

        <div className="mt-6">
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </div>

        <p className="mt-8 text-[16px] text-[#666666]">
          Resend code in <span className="font-medium text-[#23b043]">59:00</span>
        </p>
      </div>
    </AuthShell>
  );
}