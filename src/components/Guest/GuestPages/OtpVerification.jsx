import { useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import OtpfieldGroup from "../../forms/OtpfieldGroup";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";

const OtpVerification = ({ form, setForm, goTo }) => {
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
    <AuthLayout variant="forgotPassword">
      <div className="mx-auto w-full max-w-[460px] text-center">
        <AuthHeading
          title="OTP Verification"
          subtitle={`We have sent a verification code to email address ${form.email}`}
          linkText="Wrong Email?"
          onLinkClick={() => goTo("forgot-password")}
        />

        <div className="mt-8">
          <MessageBox message={message} />
        </div>

        <OtpfieldGroup otp={form.otp} setOtp={handleSetOtp} />

        <div className="mt-6">
          <ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>
        </div>

        <p className="mt-8 text-[16px] text-[#666666]">
          Resend code in <span className="font-medium text-[#23b043]">59:00</span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OtpVerification;