import { Link } from "react-router-dom";
import { useAuthStore } from "../app/useAuthStore";
import { useTheme } from "../app/theme.context";
import { LogOut, User, SunIcon, MoonIcon } from "lucide-react";

const Navbar = () => {
  const { logout, validUser } = useAuthStore();
  const { changeTheme, theme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className=" w-full  top-0 z-40  
    backdrop-blur-lg  rounded-lg shadow-xl mt-2 dark:bg-gray-300"
    >
      <div className="  w-full px-2 sm:px-4 h-12 sm:h-14">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src="/logo.svg" alt="logo" className="w-full" />
              </div>
              <h1 className="text-xl mt-2  font-bold text-blue-600">
                iMessage
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`
              btn  gap-2 transition-colors flex bg-blue-600 hover:bg-blue-500 p-2 rounded-full text-white
               `}
              onClick={() => {
                changeTheme();
              }}
            >
              {theme === "dark" ? (
                <SunIcon className="w-6 h-6 " />
              ) : (
                <MoonIcon className="size-6 " />
              )}
            </button>

            {validUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 flex sm:px-4 bg-blue-600 hover:bg-blue-500 p-2 rounded-md text-white`}
                >
                  <User className="size-6" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center sm:px-4 bg-blue-600 hover:bg-blue-500 p-2 rounded-md text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
