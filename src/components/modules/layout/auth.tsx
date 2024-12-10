import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/auth/UseAuth";
import { Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main main--auth">
        <section className="container container--auth">
          <Outlet />
        </section>
      </main>
    </>
  );
};
