import React from "react";
import { Link } from "react-router-dom";
import {
    Users,
    ShieldAlert,
    Inbox,
    BookOpen,
    ClipboardCheck,
    FileBarChart2,
} from "lucide-react";



const StatCard: React.FC<{
    label: string;
    value: string | number;
    caption: string;
    icon: React.ReactNode;
    iconBg: string;
    valueColor: string;
}> = ({ label, value, caption, icon, iconBg, valueColor }) => (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
        <div className="mb-2 sm:mb-3 flex items-center justify-between gap-1">
            <span className="text-xs sm:text-sm text-gray-500 line-clamp-1">{label}</span>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>
        </div>
        <div className={`text-xl sm:text-2xl font-semibold ${valueColor}`}>{value}</div>
        <div className="mt-1 text-[11px] sm:text-xs text-gray-400 truncate">{caption}</div>
    </div>
);

const QuickLink: React.FC<{
    label: string;
    icon: React.ReactNode;
    iconBg: string;
    to: string;
}> = ({ label, icon, iconBg, to }) => (
    <Link
        to={to}
        className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 rounded-2xl border border-gray-100 bg-white px-2.5 py-3.5 sm:py-5 shadow-sm transition hover:border-gray-200 hover:shadow-md text-center"
    >
        <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
            {icon}
        </div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{label}</span>
    </Link>
);

type TabKey = "learners" | "assignments" | "support" | "reviews";

const TABS: { key: TabKey; label: string }[] = [
    { key: "learners", label: "Assigned Learners" },
    { key: "assignments", label: "Assignments" },
    { key: "support", label: "Learner Support" },
    { key: "reviews", label: "Pending Reviews" },
];

const SECTION_TITLES: Record<TabKey, string> = {
    learners: "Assigned learners",
    assignments: "Assignment Status",
    support: "Learner Support",
    reviews: "Pending Reviews",
};

const EMPTY_COPY: Record<TabKey, { title: string; description: string }> = {
    learners: {
        title: "No learners assigned yet",
        description: "Learners assigned to your courses will appear here.",
    },
    assignments: {
        title: "No assignments yet",
        description: "Create an assignment from your course.",
    },
    support: {
        title: "No learners need support yet",
        description: "You'll see learners who need extra help here.",
    },
    reviews: {
        title: "No submissions to review yet",
        description: "Submissions will show up here once learners turn in work.",
    },
};

export default function NewUserDashboard() {
    const [activeTab, setActiveTab] = React.useState<TabKey>("assignments");

    return (
        <div className="mx-auto max-w-[1400px]">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <h1 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                    Welcome, Sarah <span aria-hidden>👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">
                    Everything you need to create courses, support your learners, and track their
                    progress—all in one place. Let's get you set up.
                </p>
            </div>

            {/* Stat cards */}
            <div className="mb-5 sm:mb-6 grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4">
                <StatCard
                    label="Assigned learners"
                    value={89}
                    caption="Across all courses"
                    icon={<Users size={14} className="text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    valueColor="text-emerald-600"
                />
                <StatCard
                    label="At Risk Learners"
                    value={0}
                    caption="Needs intervention"
                    icon={<ShieldAlert size={14} className="text-rose-500" />}
                    iconBg="bg-rose-50"
                    valueColor="text-rose-500"
                />
                <StatCard
                    label="Pending Reviews"
                    value={0}
                    caption="Awaiting grading"
                    icon={<Inbox size={14} className="text-amber-500" />}
                    iconBg="bg-amber-50"
                    valueColor="text-amber-500"
                />
                <StatCard
                    label="Active Courses"
                    value={0}
                    caption="Published"
                    icon={<BookOpen size={14} className="text-sky-500" />}
                    iconBg="bg-sky-50"
                    valueColor="text-sky-500"
                />
            </div>

            {/* Quick links */}
            <div className="mb-6 sm:mb-8">
                <h2 className="mb-2.5 sm:mb-3 text-xs sm:text-sm font-semibold text-gray-700">Quick Links</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:max-w-md">
                    <QuickLink
                        label="Grade Submissions"
                        icon={<ClipboardCheck size={18} className="text-sky-500" />}
                        iconBg="bg-sky-50"
                        to="/instructor/assessments"
                    />
                    <QuickLink
                        label="View Reports"
                        icon={<FileBarChart2 size={18} className="text-emerald-500" />}
                        iconBg="bg-emerald-50"
                        to="/instructor/report"
                    />
                </div>
            </div>

            {/* Get Started */}
            <div className="mb-6  sm:mb-8">
                <h2 className="mb-2.5 sm:mb-3 text-xs sm:text-sm font-semibold text-gray-700">Get Started</h2>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-8 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                                Create your first course
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-gray-400">
                                Build your course and add lessons, modules, activity and resources
                            </p>
                        </div>
                        <Link to="/instructor/createcourse" className="shrink-0">
                            <button className="whitespace-nowrap rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
                                Create course
                            </button>
                        </Link>
                    </div>

                    <div className="my-6 flex justify-center sm:my-8">
                        <img
                            src="/public/get-started-illustration.png"
                            alt=""
                            className="h-[180px] w-auto max-w-full sm:h-[220px]"
                        />
                    </div>

                    <div className="rounded-xl bg-gray-50 px-4 py-2.5 text-center text-xs text-gray-500 sm:text-sm">
                        New here? Build your first course, add lessons and modules, and get things rolling. 🚀
                    </div>
                </div>
            </div>

            {/* Tabs + empty-state card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-5 shadow-sm">
                <div className="mb-4 sm:mb-5 flex max-w-full overflow-x-auto gap-1 rounded-2xl sm:rounded-full bg-gray-50 p-1 text-xs sm:text-sm scrollbar-none">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`whitespace-nowrap shrink-0 rounded-full px-3 sm:px-4 py-1.5 font-medium transition ${activeTab === tab.key
                                ? "bg-white text-gray-800 shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mb-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
                        {SECTION_TITLES[activeTab]}
                    </h3>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 py-14 text-center">
                    <p className="text-sm font-medium text-gray-600">{EMPTY_COPY[activeTab].title}</p>
                    <p className="text-xs text-gray-400">{EMPTY_COPY[activeTab].description}</p>
                </div>
            </div>
        </div>
    );
}