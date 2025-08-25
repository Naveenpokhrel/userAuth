import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import EmailVerify from "../EmailVerify";
import ResetPassword from "../../pages/ResetPassword";
import Signup from "../Register";
import Dashboard from "../Dashboard";
export default function AppRoutes() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
