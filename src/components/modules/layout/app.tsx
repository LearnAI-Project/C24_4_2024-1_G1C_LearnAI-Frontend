import { Navbar } from "./navbar";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/auth/UseAuth";
import { Navigate } from "react-router-dom";

export const AppLayout = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const userStr = localStorage.getItem("user");
  
  let username = "";
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      const base64Url = user.token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decodedToken = JSON.parse(jsonPayload);
      username = decodedToken.username;
    }
  }

  
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="main main--app">
        <Sidebar />
        <section className="container container--app">
          <div style={{ backgroundColor: "blue" }}>{ username }</div>
          <Outlet />
        </section>
      </main>
    </>
  );
};
