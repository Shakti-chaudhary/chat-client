import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./app/useAuthStore";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useTheme } from "./app/theme.context";
import PageNotFound from "./pages/PageNotFound";
import { Loader } from "lucide-react";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();

  const { validUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !validUser)
    return (
      <div className={`flex items-center justify-center h-screen dark `}>
        <div className="h-full w-full dark:bg-grey-800 dark:text-white">
          <Loader className="size-10 animate-spin" />
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen ${theme} -z-10 bg-gray-100 `}>
      <div className="theme-wrapper dark:bg-gray-800 overflow-hidden ">
        <div className="mx-auto max-w-screen-2xl">
          <div className=" w-full  top-0 z-40 px-1 sm:px-4 my-2 sm:my-4 ">
            <Navbar />
          </div>

          <div className="px-1 sm:px-4 ">
            <Routes>
              <Route
                path="/"
                element={validUser ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={!validUser ? <SignUpPage /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!validUser ? <LogInPage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={validUser ? <ProfilePage /> : <Navigate to="/login" />}
              />
              <Route path="/*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
