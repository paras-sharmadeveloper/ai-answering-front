import { useState } from "react";
import AuthShell from "../auth/AuthShell.jsx";
import AuthHeading from "../auth/AuthHeading.jsx";
import SocialButtons from "../auth/SocialButtons.jsx";
import Divider from "../auth/Divider.jsx";
import TextField from "../auth/TextField.jsx";
import PasswordField from "../auth/PasswordField.jsx";
import PrimaryButton from "../auth/PrimaryButton.jsx";
import MessageBox from "../auth/MessageBox.jsx";
import { loginUser } from "../../javafile/authStorage.js";
import { validateEmail } from "../../javafile/validators.js";

export default function SignInScreen({ form, setForm, goTo }) {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setMessage("");
    setSuccess("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess("");

    if (!validateEmail(form.email)) {
      setMessage("Enter a valid email.");
      return;
    }

    if (!form.password.trim()) {
      setMessage("Password is required.");
      return;
    }

    const result = loginUser(form.email, form.password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setSuccess(`Welcome back, ${result.user.fullName}.`);
  };

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[450px]">
        <AuthHeading
          title={
            <>
              Welcome back
              <br />
              to vernal
            </>
          }
          subtitle="Don’t have an account?"
          linkText="Register"
          onLinkClick={() => goTo("signup")}
        />

        <SocialButtons />
        <Divider text="or Sign in using email" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <MessageBox type="error" message={message} />
          <MessageBox type="success" message={success} />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon="mail"
          />

          <div>
            <PasswordField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create strong password"
            />

            <button
              type="button"
              onClick={() => goTo("forgot-password")}
              className="mt-2 inline-block text-[14px] font-medium text-[#23b043]"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit">Sign In</PrimaryButton>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}