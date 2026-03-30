import { useState } from "react";
import AuthShell from "../auth/AuthShell.jsx";
import AuthHeading from "../auth/AuthHeading.jsx";
import PasswordField from "../auth/PasswordField.jsx";
import PrimaryButton from "../auth/PrimaryButton.jsx";
import MessageBox from "../auth/MessageBox.jsx";
import { updatePassword } from "../../javafile/authStorage.js";
import { validatePassword } from "../../javafile/validators.js";

export default function CreateNewPasswordScreen({
  form,
  setForm,
  goTo,
  setSigninForm,
}) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContinue = () => {
    if (!validatePassword(form.newPassword)) {
      setMessage("Password must be at least 8 characters and include letters and numbers.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = updatePassword(form.email, form.newPassword);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setSigninForm({
      email: form.email,
      password: "",
    });

    goTo("password-changed");
  };

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[475px]">
        <AuthHeading
          title="Create a new password"
          subtitle="Set your new password with minimum 8 characters with a combination of letters and number"
        />

        <div className="mt-12 space-y-5">
          <MessageBox message={message} />

          <PasswordField
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Create strong password"
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Create strong password"
          />

          <div className="pt-3">
            <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
          </div>
        </div>

        <p className="mt-7 text-center text-[16px] text-[#666666]">
          Need to fix it?{" "}
          <button
            type="button"
            onClick={() => goTo("forgot-password")}
            className="font-medium text-[#23b043]"
          >
            Change Email
          </button>
        </p>
      </div>
    </AuthShell>
  );
}