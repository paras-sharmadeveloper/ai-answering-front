import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SuccessIcon from "../../feedback/SuccessIcon";
import ButtonPrimary from "../../commondata/ButtonPrimary";

const PasswordChanged = ({ goTo }) => {
  return (
    <AuthLayout variant="forgotPassword">
      <div className="mx-auto w-full max-w-[390px] text-center">
        <SuccessIcon />

        <div className="mt-8">
          <AuthHeading
            title="Password Changed"
            subtitle="Your password has been changed successfully."
          />
        </div>

        <div className="mt-8">
          <ButtonPrimary onClick={() => goTo("signin")}>
            Back to Sign In
          </ButtonPrimary>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordChanged;