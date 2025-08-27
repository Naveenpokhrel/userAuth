import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import EmailVerify from "../EmailVerify";
import ResetPassword from "../../pages/ResetPassword";
import Signup from "../Register";
import { AppContentProvider } from "../../components/context/AppContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContentProvider>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AppContentProvider>
    </BrowserRouter>
  );
}
