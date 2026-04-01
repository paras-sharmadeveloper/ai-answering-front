import { useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SocialButton from "../../forms/SocialButton";
import Divider from "../../commondata/Divider";
import TextField from "../../forms/TextField";
import PasswordField from "../../forms/PasswordField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";
import { createUser } from "../javafiles/authStorage";
import { validateEmail, validatePassword } from "../javafiles/validators";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Axios from "../../../utils/Axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { signupForm, setSignupForm } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { goTo } = useAuth();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMessage("");
    setSuccess("");

    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccess("");

    if (!signupForm.fullName.trim()) {
      setMessage("Full name is required.");
      return;
    }

    if (!validateEmail(signupForm.email)) {
      setMessage("Enter a valid email.");
      return;
    }

    if (!validatePassword(signupForm.password)) {
      setMessage(
        "Password must be at least 8 characters and include letters and numbers.",
      );
      return;
    }

    try {
      const res = await Axios.post("/register", {
        name: signupForm.fullName,
        email: signupForm.email,
        password: signupForm.password,
      });

      console.log(res.data);

      // Save token
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error(error.response?.data);
    }

    setSuccess("Account created successfully.");

    // setSigninForm({
    //   email: signupForm.email,
    //   password: "",
    // });
    navigate("/signin");
  };

  return (
    <AuthLayout variant="signup">
      <div className="mx-auto w-full max-w-112.5">
        <AuthHeading
          title="Get Started Now"
          subtitle="Already have account?"
          linkText="Login"
          onLinkClick={() => navigate("/signin")}
        />

        {/* <SocialButton /> */}
        {/* <Divider text="or sign up using email" /> */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <MessageBox type="error" message={message} />
          <MessageBox type="success" message={success} />

          <TextField
            label="Full Name"
            name="fullName"
            value={signupForm.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon="user"
          />

          <TextField
            label="Email"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon="mail"
          />

          <PasswordField
            label="Password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            placeholder="Create strong password"
          />

          <div className="pt-2">
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </div>
        </form>

        <p className="mx-auto mt-7 max-w-105 text-center text-[15px] leading-[1.4] text-[#666666]">
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
