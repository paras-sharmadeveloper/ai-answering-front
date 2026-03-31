import { useState } from "react";
import AuthLayout from "../../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SocialButton from "../../forms/SocialButton";
import Divider from "../../commondata/Divider";
import TextField from "../../forms/TextField";
import PasswordField from "../../forms/PasswordField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";
import { createUser } from "../../../javafiles/authStorage";
import {
  validateEmail,
  validatePassword,
} from "../../../javafiles/validators";

const SignUp = ({ form, setForm, goTo, setSigninForm }) => {
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

    if (!form.fullName.trim()) {
      setMessage("Full name is required.");
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage("Enter a valid email.");
      return;
    }

    if (!validatePassword(form.password)) {
      setMessage(
        "Password must be at least 8 characters and include letters and numbers."
      );
      return;
    }

    const result = createUser(form);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setSuccess("Account created successfully.");

    setSigninForm({
      email: form.email,
      password: "",
    });

    setTimeout(() => {
      goTo("signin");
    }, 700);
  };

  return (
    <AuthLayout variant="signup">
      <div className="mx-auto w-full max-w-[450px]">
        <AuthHeading
          title="Get Started Now"
          subtitle="Already have account?"
          linkText="Login"
          onLinkClick={() => goTo("signin")}
        />

        <SocialButton />
        <Divider text="or sign up using email" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <MessageBox type="error" message={message} />
          <MessageBox type="success" message={success} />

          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon="user"
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon="mail"
          />

          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create strong password"
          />

          <div className="pt-2">
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </div>
        </form>

        <p className="mx-auto mt-7 max-w-[320px] text-center text-[15px] leading-[1.4] text-[#666666]">
          By signing up, you agree to our{" "}
          <button type="button" className="text-black underline">
            Terms of service
          </button>{" "}
          and{" "}
          <button type="button" className="text-black underline">
            Privacy policy.
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;