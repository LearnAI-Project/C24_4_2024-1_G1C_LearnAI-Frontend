import { useAuth } from "../../../context/auth/UseAuth";
export const Sidebar = () => {
  const { userLogout } = useAuth();

  return (
    <aside style={{ backgroundColor: "blue" }}>
      Sidebar
      <button onClick={userLogout}>Logout</button>
    </aside>
  );
};