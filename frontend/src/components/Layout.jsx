import { Link, useNavigate } from "react-router-dom";
import { LogOut, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "./RoleBadge";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
            <FileText className="h-5 w-5" />
            <span>DocVersion</span>
          </Link>

          <div className="flex items-center gap-3">
            {user && (
              <>
                <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
                  {user.name}
                </span>
                <RoleBadge role={user.role} />
              </>
            )}
            <ThemeToggle />
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
