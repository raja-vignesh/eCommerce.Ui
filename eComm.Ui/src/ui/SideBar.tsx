import { CiShop } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { FaSitemap } from "react-icons/fa";

export const SideBar = () => {
  return (
    <aside className="bg-sky-500 hidden sm:block px-3 py-5">
      <div className="flex flex-col gap-10">
        <h1 className="flex items-center text-2xl font-semibold justify-around">
          <span>
            <CiShop className="text-2xl" />
          </span>{" "}
          eCommerce
        </h1>
        <ul className="space-y-4">
          <li>
            <NavLink to="cart" className="flex items-center gap-3">
              <CiShoppingCart />
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="orders" className="flex items-center gap-3">
              <FaSitemap />
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
