import { useState } from "react";
import NewUserDashboard from "./firstdash";
import ReturningDashboard from "./seconddash";

interface InstructorDashboardProps {
    activeCourses?: number;
}

export default function InstructorDashboard({ activeCourses }: InstructorDashboardProps) {
    // Default to active user view (12 courses) unless explicitly passed activeCourses = 0
    const [coursesCount, setCoursesCount] = useState<number>(activeCourses ?? 12);
    const isNewUser = coursesCount === 0;

    return (
        <div className="space-y-4">
            {/* Test Mode State Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50/80 border border-neutral-200/70 px-4 py-2.5 rounded-2xl">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-700">
                        Dashboard View (Test Mode):{" "}
                        <strong className="text-neutral-900">
                            {isNewUser ? "First-Time View (0 Courses)" : "Active Instructor View"}
                        </strong>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setCoursesCount(0)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isNewUser
                                ? "bg-[#057834] text-white shadow-2xs"
                                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                        }`}
                    >
                        First-Time View
                    </button>
                    <button
                        type="button"
                        onClick={() => setCoursesCount(12)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            !isNewUser
                                ? "bg-[#057834] text-white shadow-2xs"
                                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                        }`}
                    >
                        Active Instructor View
                    </button>
                </div>
            </div>

            {isNewUser ? <NewUserDashboard /> : <ReturningDashboard />}
        </div>
    );
}