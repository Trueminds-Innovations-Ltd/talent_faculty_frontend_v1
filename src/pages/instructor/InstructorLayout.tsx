import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/instruct/Sidebar";
import TopBar from "../../components/layout/instruct/TopBar";

export default function InstructorLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Automatically close the mobile sidebar whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Add your actual authentication logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex min-h-screen">
      {/* Persistent Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          onLogoutClick={handleLogout}
        />
        {/* The Outlet renders whatever page matches the current nested route */}
        <Outlet />
      </div>
    </div>
  );
}
