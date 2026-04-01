import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";

// Auth Pages
const SignUp = lazy(() => import("../components/Guest/GuestPages/SignUp"));
const SignIn = lazy(() => import("../components/Guest/GuestPages/SignIn"));
const ForgotPassword = lazy(
  () => import("../components/Guest/GuestPages/ForgotPassword"),
);
const CheckEmail = lazy(
  () => import("../components/Guest/GuestPages/CheckEmail"),
);
const OtpVerification = lazy(
  () => import("../components/Guest/GuestPages/OtpVerification"),
);
const CreateNewPassword = lazy(
  () => import("../components/Guest/GuestPages/CreateNewPassword"),
);
const PasswordChanged = lazy(
  () => import("../components/Guest/GuestPages/PasswordChanged"),
);

// Admin Pages
const Dashboard = lazy(() => import("../components/admin/Dashboard"));
const Users = lazy(() => import("../components/admin/Users"));
const AIAgent = lazy(() => import("../components/admin/AIAgent"));
const PhoneNumbers = lazy(() => import("../components/admin/PhoneNumbers"));
const CallLogs = lazy(() => import("../components/admin/CallLogs"));
const Analytics = lazy(() => import("../components/admin/Analytics"));
const Workflows = lazy(() => import("../components/admin/Workflows"));
const Billing = lazy(() => import("../components/admin/Billing"));
const Settings = lazy(() => import("../components/admin/Settings"));

// Dubbing Pages
const Dubbing = lazy(() => import("../components/admin/Dubbing"));
const DubbingEditor = lazy(() => import("../components/admin/DubbingEditor"));

// Text To Speech Page
const TextToSpeechPage = lazy(
  () => import("../components/admin/textToSpeech/TextToSpeechPage"),
);

import AdminLayout from "../components/Layouts/AdminLayout";
import { DubbingProvider } from "../components/admin/DubbingContext";

const DubbingLayout = () => {
  return (
    <DubbingProvider>
      <Outlet />
    </DubbingProvider>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="mt-10 text-center">Loading...</div>}>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/password-changed" element={<PasswordChanged />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="ai-agent" element={<AIAgent />} />
          <Route path="phone-numbers" element={<PhoneNumbers />} />
          <Route path="call-logs" element={<CallLogs />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="billing" element={<Billing />} />
          <Route path="text-to-speech" element={<TextToSpeechPage />} />
          <Route path="settings" element={<Settings />} />

          {/* Dubbing Routes */}
          <Route element={<DubbingLayout />}>
            <Route path="dubbing" element={<Dubbing />} />
            <Route path="dubbing/:projectId" element={<DubbingEditor />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;