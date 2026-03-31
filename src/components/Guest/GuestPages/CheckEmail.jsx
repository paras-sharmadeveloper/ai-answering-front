import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const CheckEmail = ({ form }) => {
  const navigate = useNavigate();
  return (
    <AuthLayout variant="forgotPassword">
      <div className="mx-auto w-full max-w-[390px] text-center">
        <AuthHeading
          title="Check your mail"
          subtitle={`We have sent password recovery instructions to ${form.email}`}
        />

        <div className="mt-10 rounded-[18px] border border-[#e5e7eb] bg-[#ffffff] p-6 text-left text-[15px] leading-[1.5] text-[#6b7280]">
          Please check your inbox and continue to OTP verification. For testing,
          you can also see the OTP in the browser console.
        </div>

        <div className="mt-8">
          <ButtonPrimary onClick={() => navigate("/otp-verification")}>
            Open verification
          </ButtonPrimary>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CheckEmail;
