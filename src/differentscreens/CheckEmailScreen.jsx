import AuthShell from "../components/AuthShell";
import AuthHeading from "../components/AuthHeading";
import PrimaryButton from "../components/PrimaryButton";

export default function CheckEmailScreen({ form, goTo }) {
  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[430px] text-center">
        <AuthHeading
          title="Check your email"
          subtitle={`We sent a password reset link to ${form.email}. Please check your inbox`}
        />

        <div className="mt-10">
          <PrimaryButton onClick={() => goTo("otp-verification")}>
            Open Email
          </PrimaryButton>
        </div>

        <p className="mt-8 text-[16px] text-[#666666]">
          Didn’t received the email?{" "}
          <button type="button" className="font-medium text-[#23b043]">
            Resend
          </button>
        </p>

        <p className="mt-5 text-sm text-[#888]">
          Demo OTP: <span className="font-semibold text-[#23b043]">{form.generatedOtp}</span>
        </p>
      </div>
    </AuthShell>
  );
}