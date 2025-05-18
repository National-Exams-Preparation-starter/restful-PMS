import { Home, Link, LogOut } from "lucide-react";
import { useAuth } from "../../context/auth/AuthProvider";
import { useAuthActions } from "../../context/auth/auth-actions";

const Sidebar = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="flex w-64 flex-col border-r">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>

      {/* User info */}
      {user && (
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.name.toUpperCase()}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
