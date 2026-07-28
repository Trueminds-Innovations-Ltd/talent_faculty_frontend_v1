import React, { useState } from "react";
import { ThemeColors } from "../../components/ThemeColors";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "Assignments" | "Courses" | "Messages" | "System";
  unread: boolean;
}

export default function Notifications() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Unread");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const notificationsList: NotificationItem[] = [
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      description: "Wireframe Mobile Banking is due tomorrow",
      time: "10:05 AM",
      category: "Assignments",
      unread: true,
    },
    {
      id: 2,
      title: "New Announcement",
      description: "UI/UX Design Workshop on Friday at 5 PM",
      time: "Yesterday",
      category: "System",
      unread: true,
    },
    {
      id: 3,
      title: "Quiz Released",
      description: "Design Thinking Quiz is now available",
      time: "2nd May, 2024",
      category: "Courses",
      unread: true,
    },
    {
      id: 4,
      title: "New Message",
      description: "Grace Johnson sent you a message",
      time: "2nd May, 2024",
      category: "Messages",
      unread: true,
    },
    {
      id: 5,
      title: "Certificate Ready",
      description: "You're eligible for a new certificate",
      time: "1st May, 2024",
      category: "System",
      unread: true,
    },
  ];

  const unreadCount = notificationsList.filter((n) => n.unread).length;

  const filteredNotifications = notificationsList.filter((item) => {
    if (activeTab === "Unread" && !item.unread) return false;
    if (activeTab === "Assignments" && item.category !== "Assignments") return false;
    if (activeTab === "Courses" && item.category !== "Courses") return false;
    if (activeTab === "Messages" && item.category !== "Messages") return false;
    if (activeTab === "System" && item.category !== "System") return false;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] font-sans overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white min-w-0">
        {/* Top Header */}
        <TopBar
          title="Notifications"
          subtitle="Stay updated with important activities."
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto px-4 sm:px-6 py-6 bg-white">

          {/* Search Bar */}
          <div className="relative mb-4 shrink-0">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications"
              style={{ color: ThemeColors.neutralCoalblack }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#057834]"
            />
          </div>

          <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-100 mb-6 text-sm overflow-x-auto no-scrollbar whitespace-nowrap shrink-0">
            {["All", `Unread (${unreadCount})`, "Assignments", "Courses", "Messages", "System"].map((tab) => {
              const tabName = tab.split(" ")[0];
              const isActive = activeTab === tabName || (activeTab === "Unread" && tab.startsWith("Unread"));

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabName)}
                  style={{
                    color: isActive ? ThemeColors.primaryGreen : undefined,
                  }}
                  className={`pb-3 font-medium transition-colors relative shrink-0 ${isActive
                      ? "text-[#057834]"
                      : "text-gray-500 hover:text-gray-800"
                    }`}
                >
                  {tab}
                  {isActive && (
                    <span
                      style={{ backgroundColor: ThemeColors.primaryGreen }}
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#057834]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Notifications Cards Container */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">
                      {notification.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                      {notification.description}
                    </p>
                  </div>
                  <span className="text-[11px] sm:text-xs text-gray-400 shrink-0 font-medium self-end sm:self-auto">
                    {notification.time}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p className="text-sm">No notifications found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}