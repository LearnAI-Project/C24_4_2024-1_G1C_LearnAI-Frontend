import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider";
import { Main } from "./pages/app/Main";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ForgotYourPassword } from "./pages/auth/ForgotYourPassword";
import { RecoverYourAccount } from "./pages/auth/RecoverYourAccount";
import { AppLayout } from "./components/modules/layout/app";
import { Roadmap } from "./pages/app/Roadmap";
import { VerifyYourAccount } from "./pages/auth/VerifyYourAccount";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/c" element={<Roadmap />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-your-account" element={<VerifyYourAccount />} />
          <Route
            path="/forgot-your-password"
            element={<ForgotYourPassword />}
          />
          <Route
            path="/recover-your-account"
            element={<RecoverYourAccount />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
