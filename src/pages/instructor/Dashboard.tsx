import React, { useState } from "react";
import DashboardLayout from "../../components/layout/instruct/DashboardLayout";
import {
    Users,
    HeartHandshake,
    Inbox,
    BookOpen,
    Plus,
    ClipboardCheck,
    FileBarChart2,
    ChevronRight,
} from "lucide-react";

type Status =
    | "At Risk"
    | "On Track"
    | "Pending"
    | "Submitted"
    | "Not started"
    | "Over due"
    | "In progress"
    | "Graded";

interface Learner {
    name: string;
    email: string;
}

interface AssignedLearnerRow {
    learner: Learner;
    module: string;
    progress: number;
    grade: number;
    lastActivity: string;
    status: Status;
}

interface AssignmentRow {
    learner: Learner;
    module: string;
    assignment: string;
    due: string;
    grade: number | null;
    status: Status;
}

interface SupportRow {
    learner: Learner;
    module: string;
    grade: number;
    progress: number;
    lastActivity: string;
}

interface ReviewRow {
    module: string;
    learnerName: string;
    submission: string;
    submitted: string;
}



const assignedLearners: AssignedLearnerRow[] = [
    {
        learner: { name: "Blake Nguyen", email: "blake.nguyen@gcschool.edu" },
        module: "UX Research Fundamentals",
        progress: 58,
        grade: 54,
        lastActivity: "Submitted Assignment · 2h ago",
        status: "At Risk",
    },
    {
        learner: { name: "Morgan Diaz", email: "morgan.diaz@gcschool.edu" },
        module: "Design Thinking Essentials",
        progress: 100,
        grade: 100,
        lastActivity: "Completed Lesson · Yesterday",
        status: "On Track",
    },
    {
        learner: { name: "Juno Silva", email: "juno.silva@gcschool.edu" },
        module: "User Research & Discovery",
        progress: 93,
        grade: 96,
        lastActivity: "Submitted Quiz · 5h ago",
        status: "Pending",
    },
    {
        learner: { name: "Bilal Patel", email: "bilal.patel33@gcschool.edu" },
        module: "Wireframing Fundamentals",
        progress: 65,
        grade: 77,
        lastActivity: "Submitted Assignment · 10 minutes ago",
        status: "Pending",
    },
    {
        learner: { name: "Kai Rivera", email: "kai.rivera2@gcschool.edu" },
        module: "Information Architecture",
        progress: 48,
        grade: 51,
        lastActivity: "Logged in · 3 days ago",
        status: "At Risk",
    },
];

const assignments: AssignmentRow[] = [
    {
        learner: { name: "Gita Dubois", email: "" },
        module: "UI/UX Design Fundamentals",
        assignment: "Design a Landing Page",
        due: "03/7/2026",
        grade: null,
        status: "Over due",
    },
    {
        learner: { name: "Riley Mendez", email: "" },
        module: "User Research",
        assignment: "Conduct User Interviews",
        due: "09/7/2026",
        grade: null,
        status: "Not started",
    },
    {
        learner: { name: "Emerson Osei", email: "" },
        module: "Wireframing",
        assignment: "Create Low-Fi Wireframes",
        due: "11/7/2026",
        grade: 72,
        status: "Submitted",
    },
    {
        learner: { name: "Jordan Reyes", email: "" },
        module: "Prototyping",
        assignment: "Build an Interactive Prototype",
        due: "13/7/2026",
        grade: null,
        status: "In progress",
    },
    {
        learner: { name: "Hiro Bennett", email: "" },
        module: "Design Systems",
        assignment: "Create a Component Library",
        due: "15/7/2026",
        grade: 90,
        status: "Graded",
    },
    {
        learner: { name: "Avery Dubois", email: "" },
        module: "Responsive Design",
        assignment: "Design a Responsive Homepage",
        due: "16/7/2026",
        grade: 72,
        status: "Graded",
    },
];

const supportRows: SupportRow[] = [
    {
        learner: { name: "Farid Okafor", email: "farid.okafor759@gcschool.edu" },
        module: "UX Writing",
        grade: 30,
        progress: 5,
        lastActivity: "21/6/2026",
    },
    {
        learner: { name: "Elena Ford", email: "elena.ford328@gcschool.edu" },
        module: "Usability Testing",
        grade: 40,
        progress: 0,
        lastActivity: "08/7/2026",
    },
    {
        learner: { name: "Aisha Andersson", email: "aisha.andersson40@gcschool.edu" },
        module: "User Research & Discovery",
        grade: 30,
        progress: 15,
        lastActivity: "10/7/2026",
    },
    {
        learner: { name: "Zion Chen", email: "zion.chen298@gcschool.edu" },
        module: "Mobile App Design",
        grade: 20,
        progress: 20,
        lastActivity: "12/7/2026",
    },
    {
        learner: { name: "Taylor Okafor", email: "taylor.okafor285@gcschool.edu" },
        module: "Visual Design",
        grade: 40,
        progress: 10,
        lastActivity: "14/7/2026",
    },
];

const pendingReviews: ReviewRow[] = [
    {
        module: "Wireframing",
        learnerName: "Iris Patel",
        submission: "Low - fidelity wireframes",
        submitted: "Submitted on the 02/7/2026",
    },
    {
        module: "User Research",
        learnerName: "David Kim",
        submission: "User interview report",
        submitted: "Submitted on today",
    },
    {
        module: "Prototyping",
        learnerName: "Sarah Lee",
        submission: "Interactive Prototype",
        submitted: "Submitted on yesterday",
    },
    {
        module: "Responsive Design",
        learnerName: "Emily Davis",
        submission: "Responsive Homepage",
        submitted: "Submitted on today",
    },
    {
        module: "Design Systems",
        learnerName: "Jane Doe",
        submission: "Component Library",
        submitted: "Submitted on 3hrs ago",
    },
];


const AVATAR_COLORS = [
    "bg-rose-200 text-rose-800",
    "bg-amber-200 text-amber-800",
    "bg-emerald-200 text-emerald-800",
    "bg-sky-200 text-sky-800",
    "bg-violet-200 text-violet-800",
    "bg-fuchsia-200 text-fuchsia-800",
];

function colorFor(name: string) {
    const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

function initials(name: string) {
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const Avatar: React.FC<{ name: string }> = ({ name }) => (
    <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${colorFor(
            name
        )}`}
    >
        {initials(name)}
    </div>
);

const STATUS_STYLES: Record<Status, string> = {
    "At Risk": "bg-rose-50 text-rose-600",
    "On Track": "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Submitted: "bg-sky-50 text-sky-600",
    "Not started": "bg-gray-100 text-gray-500",
    "Over due": "bg-rose-50 text-rose-600",
    "In progress": "bg-amber-50 text-amber-600",
    Graded: "bg-emerald-50 text-emerald-600",
};

const StatusPill: React.FC<{ status: Status }> = ({ status }) => (
    <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
        {status}
    </span>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="flex items-center gap-2">
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${value}%` }}
            />
        </div>
        <span className="text-xs text-gray-500">{value}%</span>
    </div>
);


const StatCard: React.FC<{
    label: string;
    value: string | number;
    caption: string;
    icon: React.ReactNode;
    iconBg: string;
    valueColor: string;
}> = ({ label, value, caption, icon, iconBg, valueColor }) => (
    <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{label}</span>
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>
        </div>
        <div className={`text-2xl font-semibold ${valueColor}`}>{value}</div>
        <div className="mt-1 text-xs text-gray-400">{caption}</div>
    </div>
);

const QuickLink: React.FC<{
    label: string;
    icon: React.ReactNode;
    iconBg: string;
}> = ({ label, icon, iconBg }) => (
    <button className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white py-6 shadow-sm transition hover:border-gray-200 hover:shadow-md">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
            {icon}
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
);



const TableHead: React.FC<{ cols: string[] }> = ({ cols }) => (
    <thead>
        <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-400">
            {cols.map((c) => (
                <th key={c} className="whitespace-nowrap py-3 pr-4 font-medium">
                    {c}
                </th>
            ))}
        </tr>
    </thead>
);

const AssignedLearnersTable: React.FC = () => (
    <table className="w-full min-w-[640px] border-collapse">
        <TableHead cols={["Learners", "Module", "Progress", "Grade", "Last activity", "Status"]} />
        <tbody>
            {assignedLearners.map((row) => (
                <tr key={row.learner.email} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                            <Avatar name={row.learner.name} />
                            <div>
                                <div className="text-sm font-medium text-gray-800">{row.learner.name}</div>
                                <div className="text-xs text-gray-400">{row.learner.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.module}</td>
                    <td className="py-3 pr-4">
                        <ProgressBar value={row.progress} />
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.grade}</td>
                    <td className="py-3 pr-4 text-sm text-gray-500">{row.lastActivity}</td>
                    <td className="py-3 pr-4">
                        <StatusPill status={row.status} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const AssignmentsTable: React.FC = () => (
    <table className="w-full min-w-[640px] border-collapse">
        <TableHead cols={["Learners", "Modules", "Assignment", "Due", "Grade", "Status"]} />
        <tbody>
            {assignments.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                            <Avatar name={row.learner.name} />
                            <span className="text-sm font-medium text-gray-800">{row.learner.name}</span>
                        </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.module}</td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.assignment}</td>
                    <td className="py-3 pr-4 text-sm text-gray-500">{row.due}</td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.grade ?? "—"}</td>
                    <td className="py-3 pr-4">
                        <StatusPill status={row.status} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const LearnerSupportTable: React.FC = () => (
    <table className="w-full min-w-[640px] border-collapse">
        <TableHead cols={["Learners", "Module", "Grade", "Progress", "Last activity", "Status"]} />
        <tbody>
            {supportRows.map((row) => (
                <tr key={row.learner.email} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                            <Avatar name={row.learner.name} />
                            <div>
                                <div className="text-sm font-medium text-gray-800">{row.learner.name}</div>
                                <div className="text-xs text-gray-400">{row.learner.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{row.module}</td>
                    <td className="py-3 pr-4 text-sm font-medium text-rose-500">{row.grade}</td>
                    <td className="py-3 pr-4">
                        <ProgressBar value={row.progress} />
                    </td>
                    <td className="py-3 pr-4 text-sm text-gray-500">{row.lastActivity}</td>
                    <td className="py-3 pr-4">
                        <button className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                            Reach out
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const PendingReviewsList: React.FC = () => (
    <div className="divide-y divide-gray-50">
        {pendingReviews.map((row, i) => (
            <div key={i} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                        <ClipboardCheck size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-800">{row.module}</div>
                        <div className="text-xs text-gray-400">
                            {row.learnerName} · {row.submission}
                        </div>
                        <div className="text-xs text-gray-400">{row.submitted}</div>
                    </div>
                </div>
                <button className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
                    Review
                </button>
            </div>
        ))}
    </div>
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

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<TabKey>("learners");

    return (
        <DashboardLayout title="Good Morning, Samuel 👋" subtitle="Continue your learning journey and stay on track!">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        Welcome, Sarah <span aria-hidden>👋</span>
                    </h1>
                    <p className="text-sm text-gray-400">Ready to share your knowledge?</p>
                </div>

                {/* Stat cards */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard
                        label="Assigned learners"
                        value={89}
                        caption="Across all courses"
                        icon={<Users size={14} className="text-emerald-500" />}
                        iconBg="bg-emerald-50"
                        valueColor="text-emerald-600"
                    />
                    <StatCard
                        label="Learner Support"
                        value={24}
                        caption="Needs intervention"
                        icon={<HeartHandshake size={14} className="text-rose-500" />}
                        iconBg="bg-rose-50"
                        valueColor="text-rose-500"
                    />
                    <StatCard
                        label="Pending Reviews"
                        value={12}
                        caption="Awaiting grading"
                        icon={<Inbox size={14} className="text-amber-500" />}
                        iconBg="bg-amber-50"
                        valueColor="text-amber-500"
                    />
                    <StatCard
                        label="Active Courses"
                        value={12}
                        caption="Published"
                        icon={<BookOpen size={14} className="text-sky-500" />}
                        iconBg="bg-sky-50"
                        valueColor="text-sky-500"
                    />
                </div>

                {/* Quick links */}
                <div className="mb-8">
                    <h2 className="mb-3 text-sm font-semibold text-gray-700">Quick links</h2>
                    <div className="flex gap-3">
                        <QuickLink
                            label="Create Course"
                            icon={<Plus size={18} className="text-violet-500" />}
                            iconBg="bg-violet-50"
                        />
                        <QuickLink
                            label="Grade Submissions"
                            icon={<ClipboardCheck size={18} className="text-sky-500" />}
                            iconBg="bg-sky-50"
                        />
                        <QuickLink
                            label="View Reports"
                            icon={<FileBarChart2 size={18} className="text-emerald-500" />}
                            iconBg="bg-emerald-50"
                        />
                    </div>
                </div>

                {/* Tabs + table card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex w-fit gap-1 rounded-full bg-gray-50 p-1 text-sm">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium transition ${activeTab === tab.key
                                    ? "bg-white text-gray-800 shadow-sm"
                                    : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">
                            {SECTION_TITLES[activeTab]}
                        </h3>
                        <button className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 hover:text-emerald-700">
                            See all
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "learners" && <AssignedLearnersTable />}
                        {activeTab === "assignments" && <AssignmentsTable />}
                        {activeTab === "support" && <LearnerSupportTable />}
                        {activeTab === "reviews" && <PendingReviewsList />}
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
}