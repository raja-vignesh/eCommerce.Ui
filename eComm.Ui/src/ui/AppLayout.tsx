import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Login } from "../pages/Login";
import { useUserContext } from "../contexts/UserContext";

export const AppLayout = () => {
  const { user } = useUserContext();

  return (
    <>
      <div className="grid h-dvh grid-cols-1 overflow-hidden sm:grid-cols-[220px_minmax(0,1fr)]">
        <SideBar />
        <div className="grid min-h-0 min-w-0 grid-rows-[60px_minmax(0,1fr)]">
          <Header />
          <main className="min-h-0 min-w-0 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
      {!user && <Login />}
    </>
  );
};
