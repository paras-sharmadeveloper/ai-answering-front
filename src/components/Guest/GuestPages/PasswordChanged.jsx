import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SuccessIcon from "../../feedback/SuccessIcon";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const PasswordChanged = () => {
  const navigate = useNavigate();
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
          <ButtonPrimary onClick={() => navigate("/signin")}>
            Back to Sign In
          </ButtonPrimary>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordChanged;
