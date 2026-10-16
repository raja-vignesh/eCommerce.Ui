import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Login } from "../pages/Login";
import { useUserContext } from "../contexts/UserContext";

export const AppLayout = () => {
  const { user } = useUserContext();

  return (
    <>
      <div className="grid grid-flow-col sm:grid-cols-[220px_minmax(0,1fr)] min-h-screen">
        <SideBar />
        <div className="grid grid-rows-[60px_1fr]">
          <Header />
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      {!user && <Login />}
    </>
  );
};
