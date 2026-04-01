import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import AuthHeading from "../AuthHeading";
import SocialButton from "../../forms/SocialButton";
import Divider from "../../commondata/Divider";
import TextField from "../../forms/TextField";
import PasswordField from "../../forms/PasswordField";
import ButtonPrimary from "../../commondata/ButtonPrimary";
import MessageBox from "../../commondata/MessageBox";
import { loginUser } from "../javafiles/authStorage";
import { validateEmail } from "../javafiles/validators";
import Axios from "../../../utils/Axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Local form state (FIXED)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setMessage("");
    setSuccess("");
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
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
    // ✅ API call to backend (FIXED)
    try {
      const res = await Axios.post("/login", {
        email: form.email,
        password: form.password,
      });
      const result = res.data;
      console.log("Login response:", result);
      if (!result.token) {
        setMessage(result.message);
        return;
      }
      console.log("Login successful, token received:", result);
      dispatch(login(result)); // ✅ Redux save
      setSuccess(`Welcome back, ${result.user.name}.`);
      toast.success("Login successful!");

      setTimeout(() => {
        console.log("Login successful, navigating to dashboard...");
        navigate("/admin/dashboard"); // ✅ FIXED route
      }, 400);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
      console.error(error.response?.data);
      setMessage(
        error.response?.data?.message || "An error occurred during login.",
      );
    }
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
          onLinkClick={() => navigate("/signup")}
        />

        {/* <SocialButton /> */}
        {/* <Divider text="or Sign in using email" /> */}

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
              onClick={() => navigate("/forgot-password")}
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
