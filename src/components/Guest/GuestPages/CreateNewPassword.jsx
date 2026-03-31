import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import PasswordField from "../../forms/PasswordField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";
import { updatePassword } from "../javafiles/authStorage";
import { validatePassword } from "../javafiles/validators";

const CreateNewPassword = ({ form, setForm, setSigninForm }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage("");
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = () => {
    setMessage("");

    if (!validatePassword(form.newPassword)) {
      setMessage(
        "Password must be at least 8 characters and include letters and numbers.",
      );
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

    navigate("/password-changed");
  };

  return (
    <AuthLayout variant="forgotPassword">
      <div className="mx-auto w-full max-w-[390px]">
        <AuthHeading
          title="Create New Password"
          subtitle="Your new password must be different from previous password."
        />

        <div className="mt-10 space-y-5">
          <MessageBox message={message} />

          <PasswordField
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Create new password"
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <div className="pt-2">
            <ButtonPrimary onClick={handleSubmit}>Reset Password</ButtonPrimary>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CreateNewPassword;
