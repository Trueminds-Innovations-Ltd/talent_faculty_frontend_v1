import  { useState } from "react";
import {
  ClipboardList,
  UserRound,
  BookOpen,
  Megaphone,
  BarChart3,
  Archive,
  Trash2,
  Circle,
} from "lucide-react";
import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'

const notifications = [
  {
    icon: ClipboardList,
    bg: "bg-orange-50",
    color: "text-orange-400",
    title: "23 Assignments waiting review",
    description: "You have 23 assignments waiting for your review",
    date: "Today",
    time: "10:30 am",
    unread: true,
  },
  {
    icon: UserRound,
    bg: "bg-blue-50",
    color: "text-blue-400",
    title: "18 new users registrations",
    description: "18 new users have registered in the plat form",
    date: "Today",
    time: "6:00 am",
    unread: true,
  },
  {
    icon: BookOpen,
    bg: "bg-green-50",
    color: "text-green-400",
    title: "Course Approval request",
    description: "5 courses are waiting for your approval",
    date: "Yesterday",
    time: "8:00 pm",
    unread: true,
  },
  {
    icon: BookOpen,
    bg: "bg-green-50",
    color: "text-green-400",
    title: "New course published",
    description: "New course Advanced react development has be..",
    date: "Yesterday",
    time: "4:00 pm",
    unread: false,
  },
  {
    icon: Megaphone,
    bg: "bg-red-50",
    color: "text-red-400",
    title: "New announcement published",
    description: "“Holiday notice”has been published by admin",
    date: "Two days ago",
    time: "5:30 am",
    unread: true,
  },
  {
    icon: BarChart3,
    bg: "bg-gray-100",
    color: "text-gray-500",
    title: "Weekly report is ready",
    description: "Your weekly LMS report is ready",
    date: "August 6th 2026",
    time: "12:12 pm",
    unread: false,
  },
];

const tabs = [
  "All",
  "Pending Tasks (34)",
  "Unread (10)",
  "Mentions (23)",
  "Messages (10)",
  "Archived (23)",
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const toggleAll = () => {
    if (selected.length === notifications.length) {
      setSelected([]);
    } else {
      setSelected(notifications.map((_, index) => index));
    }
  };

 return (
  <AdminDashboardLayout>
    <div className="-mt-[1px] min-h-screen w-full bg-white">
      
      <div className="pt-[14px]">
        <h1 className="text-[17px] font-semibold text-[#087b38]">
          Notifications
        </h1>

        <p className="mt-[5px] text-[12px] text-[#8a8a8a]">
          Stay updated with important activities and alerts.
        </p>
      </div>

        {/* ================= TABS ================= */}
        <div className="mt-[37px] flex h-[43px] items-start">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative mr-[47px] h-[43px] whitespace-nowrap text-[15px] font-semibold ${
                activeTab === tab
                  ? "text-[#087b38]"
                  : "text-[#858585]"
              }`}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-0 left-[-4px] h-[1px] w-[51px] bg-[#087b38]" />
              )}
            </button>
          ))}

        </div>

        {/* ================= TABLE ================= */}
        <div className="mt-[32px] w-full">

          {/* Header */}
          <div className="grid h-[59px] grid-cols-[58px_minmax(0,1fr)_148px_100px_96px] items-center bg-[#f3f3f3]">

            <div className="flex justify-center">
              <button
                onClick={toggleAll}
                className={`h-[16px] w-[16px] border ${
                  selected.length === notifications.length
                    ? "border-[#087b38] bg-[#087b38]"
                    : "border-[#d4d4d4] bg-[#dedede]"
                }`}
              />
            </div>

            <span className="text-[14px] font-medium">
              Alert
            </span>

            <span className="text-[14px] font-medium">
              Date
            </span>

            <span className="text-[14px] font-medium">
              Status
            </span>

            <span className="text-[14px] font-medium">
              Actions
            </span>
          </div>

          {/* Notification rows */}
          <div className="mt-[12px] flex flex-col gap-[12px]">

            {notifications.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="grid h-[60px] grid-cols-[58px_minmax(0,1fr)_148px_100px_96px] items-center border border-[#ededed] bg-white"
                >

                  {/* Checkbox */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleSelect(index)}
                      className={`h-[16px] w-[16px] border ${
                        selected.includes(index)
                          ? "border-[#087b38] bg-[#087b38]"
                          : "border-[#d4d4d4] bg-[#dedede]"
                      }`}
                    />
                  </div>

                  {/* Alert */}
                  <div className="flex min-w-0 items-center gap-[11px]">

                    <div
                      className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full ${item.bg}`}
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.5}
                        className={item.color}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold leading-[19px] text-[#222]">
                        {item.title}
                      </p>

                      <p className="truncate text-[12px] leading-[17px] text-[#747474]">
                        {item.description}
                      </p>
                    </div>

                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-[14px] font-medium text-[#555]">
                      {item.date}
                    </p>

                    <p className="mt-[2px] text-[12px] text-[#777]">
                      {item.time}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    {item.unread && (
                      <Circle
                        size={8}
                        fill="#4388ed"
                        strokeWidth={0}
                        className="text-[#4388ed]"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-[13px]">

                    <button className="text-[#ffad24] hover:scale-110">
                      <Archive
                        size={17}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button className="text-[#ff4b43] hover:scale-110">
                      <Trash2
                        size={17}
                        strokeWidth={1.5}
                      />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-[31px] flex items-center justify-center gap-[10px]">

            <button className="h-[32px] w-[32px] rounded-[7px] border border-gray-300 text-gray-500">
              ‹
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`h-[32px] w-[32px] rounded-[7px] border text-[12px] ${
                  page === 1
                    ? "border-[#4b92ff] text-[#4b92ff]"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {page}
              </button>
            ))}

            <button className="h-[32px] w-[32px] rounded-[7px] border border-gray-300 text-gray-500">
              ›
            </button>

          </div>

        </div>
      
        </div>
    </AdminDashboardLayout>
  );
}