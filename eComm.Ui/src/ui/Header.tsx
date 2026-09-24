import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";

export const Header = () => {
  return (
    <header className="bg-amber-500 flex items-center px-5 gap-3">
      <button className="sm:hidden">==</button>
      <form className=" max-w-xs ml-auto" role="search">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
          <CiSearch />
          <label htmlFor="search" className="sr-only text-black">
            Search
          </label>
          <input
            type="search"
            id="search"
            placeholder="Search..."
            required
            className="text-sm text-slate-900  w-full outline-none"
          />
        </div>
      </form>
      <button className="flex items-center gap-2">
        <CiLogin />
        Logout
      </button>
    </header>
  );
};
