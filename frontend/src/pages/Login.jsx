import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FileText } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <ThemeToggle className="absolute right-4 top-4" />
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <FileText className="h-8 w-8" />
            <span className="text-2xl font-bold">DocVersion</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Sign in to manage your documents</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            No account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
