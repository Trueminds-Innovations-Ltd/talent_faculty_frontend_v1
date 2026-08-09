import type { ChangeEvent } from "react";
import { ClipboardCheck, GraduationCap, Download, ChevronDown } from "lucide-react";
import DashboardLayout from "../../../components/layout/instruct/DashboardLayout";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface AssessmentBreakdownItem {
    label: string;
    score: number;
}

interface CourseStatusItem {
    label: string;
    value: number;
    color: string;
}

interface ReportsAnalyticsProps {
    averageScore?: number;
    completionRate?: number;
    passRate?: number;
    assessmentBreakdown?: AssessmentBreakdownItem[];
    activeLearners?: number;
    avgProgress?: number;
    courseCount?: number;
    courseStatus?: CourseStatusItem[];
    onExport?: () => void;
}

const defaultAssessmentBreakdown: AssessmentBreakdownItem[] = [
    { label: "Portfolio", score: 85 },
    { label: "Usability", score: 62 },
    { label: "Prototype", score: 78 },
    { label: "Wireframes", score: 55 },
    { label: "Research", score: 70 },
    { label: "Design", score: 48 },
];

const defaultCourseStatus: CourseStatusItem[] = [
    { label: "Completed", value: 62, color: "#0ea5a4" },
    { label: "In progress", value: 25, color: "#2563eb" },
    { label: "Not started", value: 13, color: "#facc15" },
];

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-lg border border-gray-200 px-4 py-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-9 text-sm text-gray-700 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}

export default function ReportsAnalytics({
    averageScore = 82,
    completionRate = 94,
    passRate = 88,
    assessmentBreakdown = defaultAssessmentBreakdown,
    activeLearners = 248,
    avgProgress = 76,
    courseCount = 20,
    courseStatus = defaultCourseStatus,
    onExport,
}: ReportsAnalyticsProps) {
    return (
        <DashboardLayout>
            <div className=" w-full max-w-7xl px-6 py-2">
                <h1 className="text-2xl font-semibold text-gray-900">Reports & analytics</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Review assessment and course performance across your classes.
                </p>

                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-green-100">
                            <ClipboardCheck className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">Assessment performance</h2>
                            <p className="text-xs text-gray-500">
                                Analyze scores, completion rate, and assessment outcomes.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <StatCard label="Average score" value={`${averageScore}%`} />
                        <StatCard label="Completion rate" value={`${completionRate}%`} />
                        <StatCard label="Pass rate" value={`${passRate}%`} />
                    </div>

                    <div className="mt-4 h-56 rounded-lg bg-white p-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={assessmentBreakdown}
                                layout="vertical"
                                margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
                                barCategoryGap={12}
                            >
                                <CartesianGrid horizontal={false} stroke="#eef2f7" />
                                <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="label"
                                    width={72}
                                    tick={{ fontSize: 11, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "#f3f4f6" }}
                                    formatter={(value: number) => [`${value}%`, "Score"]}
                                />
                                <Bar dataKey="score" fill="#16a34a" radius={[0, 4, 4, 0]} barSize={14} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-green-100">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">Course performance</h2>
                            <p className="text-xs text-gray-500">
                                Understand overall performance across assigned courses.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <StatCard label="Active learners" value={activeLearners} />
                        <StatCard label="Avg progress" value={`${avgProgress}%`} />
                        <StatCard label="Courses" value={courseCount} />
                    </div>

                    <div className="mt-4 flex h-56 items-center justify-center rounded-lg bg-white p-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={courseStatus}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius="55%"
                                    outerRadius="80%"
                                    paddingAngle={2}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {courseStatus.map((entry) => (
                                        <Cell key={entry.label} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
                        {courseStatus.map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                    aria-hidden="true"
                                />
                                {item.label} &middot; {item.value}%
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                        <SelectField
                            label="Course"
                            value="All courses"
                            options={["All courses", "UX design", "Product design", "UI systems"]}
                            onChange={() => { }}
                        />
                        <SelectField
                            label="All assessment"
                            value="All assessment"
                            options={["All assessment", "Quizzes", "Assignments", "Projects"]}
                            onChange={() => { }}
                        />
                        <SelectField
                            label="Assessment type"
                            value="All type"
                            options={["All type", "Graded", "Practice"]}
                            onChange={() => { }}
                        />
                        <SelectField
                            label="Date range"
                            value="Last 30 days"
                            options={["Last 7 days", "Last 30 days", "Last 90 days", "This year"]}
                            onChange={() => { }}
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-500">
                        Export the filtered report in your preferred format.
                    </p>
                    <button
                        type="button"
                        onClick={onExport}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}