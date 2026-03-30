import AuthShell from "../auth/AuthShell.jsx";
import AuthHeading from "../auth/AuthHeading.jsx";
import SuccessIcon from "../auth/SuccessIcon.jsx";
import PrimaryButton from "../auth/PrimaryButton.jsx";

export default function PasswordChangedScreen({ goTo }) {
  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[475px] text-center">
        <SuccessIcon />

        <div className="mt-10">
          <AuthHeading
            title={
              <>
                Password Change
                <br />
                Successfully
              </>
            }
            subtitle="Always remember the password for account. Let’s get started with your first Vernal."
          />
        </div>

        <div className="mt-10">
          <PrimaryButton onClick={() => goTo("signin")}>
            Back to sign in
          </PrimaryButton>
        </div>
      </div>
    </AuthShell>
  );
}
