import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { useState } from "react";
import { Login } from "../pages/Login";

export const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      {!isLoggedIn && <Login setLoggedIn={setIsLoggedIn} />}
    </>
  );
};
