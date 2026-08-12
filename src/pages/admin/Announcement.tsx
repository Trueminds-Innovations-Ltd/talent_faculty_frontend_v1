import { useState } from "react";
import {
  Search,
  ChevronDown,
  Megaphone,
  BarChart3,
  BookOpen,
  AlertTriangle,
  UsersRound,
  CalendarDays,
  Pencil,
  Archive,
  Trash2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";

type Announcement = {
  icon: typeof BookOpen;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  audience: string;
  recipients: string;
  status: "Published" | "Scheduled" | "Draft" | "Archived";
  date: string;
  time: string;
};

const announcements: Announcement[] = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "New Course: Advanced React Development",
    description: "We are excited to launch a new course..",
    priority: "High",
    audience: "All Users",
    recipients: "2345 recipients",
    status: "Published",
    date: "12/08/2026",
    time: "10:12 am",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
    title: "Important: Security Update",
    description: "As part of our commitment to security we have..",
    priority: "Medium",
    audience: "All Learners",
    recipients: "2,000 recipients",
    status: "Scheduled",
    date: "02/09/2026",
    time: "10:12 am",
  },
  {
    icon: UsersRound,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "New Cohort: Cohort 3 Batch C",
    description: "We are excited to launch a new cohort soon..",
    priority: "Low",
    audience: "All Instructors",
    recipients: "200 recipients",
    status: "Draft",
    date: "10/09/2026",
    time: "10:12 am",
  },
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Course Completion Certificate now avail..",
    description: "Learners can now download the course...",
    priority: "High",
    audience: "All Admins",
    recipients: "20 recipients",
    status: "Archived",
    date: "17/03/2026",
    time: "10:12 am",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
    title: "Webinar: Linkedin Optimization",
    description: "Join us for an exclusive webinar on Linkedin....",
    priority: "Medium",
    audience: "All Learners",
    recipients: "2,000 recipients",
    status: "Scheduled",
    date: "19/08/2026",
    time: "10:12 am",
  },
  {
    icon: Megaphone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    title: "Maintenance Downtime Notice",
    description: "Please note that the LMS will be under maintena...",
    priority: "Low",
    audience: "All Users",
    recipients: "2,345 recipients",
    status: "Published",
    date: "15/04/2026",
    time: "10:12 am",
  },
];

const tabs = [
  "All Announcements",
  "Published",
  "Scheduled",
  "Drafts",
  "Archived",
];

const priorityStyles = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-orange-100 text-orange-500",
  Low: "bg-blue-100 text-blue-500",
};

const statusStyles = {
  Published: "bg-green-100 text-green-600",
  Scheduled: "bg-blue-100 text-blue-500",
  Draft: "bg-orange-100 text-orange-500",
  Archived: "bg-red-100 text-red-500",
};

export default function Announcements() {
  const [activeTab, setActiveTab] = useState("All Announcements");
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const toggleAll = () => {
    if (selected.length === announcements.length) {
      setSelected([]);
    } else {
      setSelected(announcements.map((_, index) => index));
    }
  };

  return (
  <AdminDashboardLayout>
    <div className="-mt-[1px] w-full bg-white">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-[17px] font-semibold text-[#087b38]">
            Announcements
          </h1>

          <p className="mt-[7px] text-[12px] text-[#888]">
            Create and manage announcements
          </p>
        </div>

        {/* Header buttons */}
        <div className="flex items-center gap-[24px]">

          <button className="flex h-[45px] items-center gap-[10px] rounded-[11px] border border-[#222] bg-white px-[14px] text-[15px] font-semibold text-[#222]">
            <BarChart3 size={17} strokeWidth={1.8} />
            Generate Report
          </button>

          <button className="flex h-[45px] items-center gap-[10px] rounded-[11px] bg-[#07863d] px-[14px] text-[15px] font-semibold text-white">
            <Megaphone size={17} strokeWidth={1.8} />
            Create Announcement
          </button>

        </div>

      </div>

      {/* ================= TABS ================= */}
      <div className="mt-[40px] flex h-[43px] items-start">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative mr-[47px] h-[43px] whitespace-nowrap text-[15px] font-semibold ${
              activeTab === tab
                ? "text-[#075f2c]"
                : "text-[#888]"
            }`}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#087b38]" />
            )}
          </button>
        ))}

      </div>

          {/* ================= FILTERS ================= */}

          <div className="mt-[33px] flex items-center gap-[23px]">

            {/* Search */}

            <div className="flex h-[40px] w-[269px] items-center rounded-full bg-[#f4f4f4] px-[14px]">
              <Search
                size={16}
                strokeWidth={1.8}
                className="mr-[10px] text-gray-500"
              />

              <input
                type="text"
                placeholder="Search users, courses or lessons..."
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* All Types */}

            <FilterButton label="All Types" />

            {/* All Audiences */}

            <FilterButton label="All Audiences" />

            {/* All Priorities */}

            <FilterButton label="All Priorities" />

            {/* All Time */}

            <FilterButton label="All Time" />

            {/* Clear filter */}

            <button className="flex h-[40px] items-center gap-[8px] rounded-[10px] border border-[#eeeeee] bg-white px-[12px] text-[13px] text-[#777]">
              Clear filter

              <SlidersHorizontal
                size={15}
                strokeWidth={1.7}
              />
            </button>

          </div>

          {/* ================= TABLE ================= */}

          <div className="mt-[33px] w-full">

            {/* Table header */}

          <div className="grid h-[60px] grid-cols-[50px_390px_115px_120px_105px_100px_90px] items-center bg-[#f3f3f3]">
              <div className="flex justify-center">
                <button
                  onClick={toggleAll}
                  className={`h-[16px] w-[16px] ${
                    selected.length === announcements.length
                      ? "bg-[#087b38]"
                      : "bg-[#dedede]"
                  }`}
                />
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Announcements
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Priority
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Audience
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Status
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Published
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Actions
              </div>

            </div>

            {/* Rows */}

            <div>
              {announcements.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="grid min-h-[72px] grid-cols-[50px_390px_115px_120px_105px_100px_90px] items-center border-b border-[#ededed]"
                  >

                    {/* Checkbox */}

                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleSelect(index)}
                        className={`h-[16px] w-[16px] ${
                          selected.includes(index)
                            ? "bg-[#087b38]"
                            : "bg-[#dedede]"
                        }`}
                      />
                    </div>

                    {/* Announcement */}

                    <div className="flex min-w-0 items-center gap-[11px]">

                      <div
                        className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.5}
                          className={item.iconColor}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-[#222]">
                          {item.title}
                        </p>

                        <p className="mt-[2px] truncate text-[12px] text-[#777]">
                          {item.description}
                        </p>
                      </div>

                    </div>

                    {/* Priority */}

                    <div>
                      <span
                        className={`inline-flex h-[40px] min-w-[98px] items-center justify-center rounded-full px-[17px] text-[13px] font-medium ${
                          priorityStyles[item.priority]
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    {/* Audience */}

                    <div className="leading-[17px]">
                      <p className="text-[13px] font-semibold text-[#222]">
                        {item.audience}
                      </p>

                      <p className="text-[12px] text-[#777]">
                        {item.recipients}
                      </p>
                    </div>

                    {/* Status */}

                    <div>
                      <span
                        className={`inline-flex h-[40px] min-w-[97px] items-center justify-center rounded-full px-[15px] text-[13px] font-medium ${
                          statusStyles[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Published */}

                    <div className="leading-[17px]">
                      <p className="text-[13px] font-medium text-[#222]">
                        {item.date}
                      </p>

                      <p className="text-[11px] text-[#777]">
                        {item.time}
                      </p>
                    </div>

                    {/* Actions */}

                    <div className="flex items-center gap-[12px]">

                      <button className="text-[#3784ff] transition-transform hover:scale-110">
                        <Pencil
                          size={17}
                          strokeWidth={1.7}
                        />
                      </button>

                      <button className="text-[#f6a51b] transition-transform hover:scale-110">
                        <Archive
                          size={17}
                          strokeWidth={1.7}
                        />
                      </button>

                      <button className="text-[#ff4545] transition-transform hover:scale-110">
                        <Trash2
                          size={17}
                          strokeWidth={1.7}
                        />
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* ================= FOOTER ================= */}

           <div className="flex items-center gap-[400px] py-[31px]">
            <p className="text-[13px] text-[#777]">
              Showing 1 to 6 of 100 Announcements
            </p>

            <div className="flex items-center gap-[10px]">

              <button className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#d4d4d4] bg-white text-gray-600">
                <ChevronLeft size={16} />
              </button>

              <button className="h-[32px] w-[32px] rounded-[8px] border border-[#73a9ff] bg-white text-[12px] text-[#3985ff]">
                1
              </button>

              <button className="h-[32px] w-[32px] rounded-[8px] border border-[#d4d4d4] bg-white text-[12px] text-[#333]">
                2
              </button>

              <button className="h-[32px] w-[32px] rounded-[8px] border border-[#d4d4d4] bg-white text-[12px] text-[#333]">
                3
              </button>

              <button className="h-[32px] w-[32px] rounded-[8px] border border-[#d4d4d4] bg-white text-[12px] text-[#333]">
                <ChevronRight size={16} />
              </button>

              <button className="h-[32px] w-[40px] rounded-[8px] border border-[#d4d4d4] bg-white text-[12px] text-[#333]">
                10
              </button>

              <button className="flex h-[32px] items-center gap-[8px] rounded-[8px] border border-[#d4d4d4] bg-white px-[10px] text-[12px] text-[#333]">
                Last page
                <ChevronDown size={14} />
              </button>

            </div>

          </div>
         </div>
      
    </AdminDashboardLayout>
  );
}

/* ================= FILTER BUTTON ================= */

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex h-[40px] min-w-[113px] items-center justify-between gap-[18px] rounded-[10px] border border-[#eeeeee] bg-white px-[12px] text-[13px] text-[#777]">
      {label}

      <ChevronDown
        size={15}
        strokeWidth={1.7}
      />
    </button>
  );
}