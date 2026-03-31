import { useState } from "react";
import AuthLayout from "../../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SocialButton from "../../forms/SocialButton";
import Divider from "../../commondata/Divider";
import TextField from "../../forms/TextField";
import PasswordField from "../../forms/PasswordField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";
import { loginUser } from "../../../javafiles/authStorage";
import { validateEmail } from "../../../javafiles/validators";

const SignIn = ({ form, setForm, goTo }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setMessage("");
    setSuccess("");
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <AuthLayout variant="signin">
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

        <SocialButton />
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
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => goTo("forgot-password")}
              className="mt-3 inline-block text-[14px] font-medium text-[#23b043]"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-2">
            <ButtonPrimary type="submit">Sign In</ButtonPrimary>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;