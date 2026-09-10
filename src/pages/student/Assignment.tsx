import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

type AssignmentStatus = "Pending" | "Submitted" | "Graded" | "Overdue";

interface Assignment {
  title: string;
  course: string;
  due: string;
  status: AssignmentStatus;
  marks: string;
}

const tabs = [
  { name: "All", count: 12 },
  { name: "Pending", count: 2 },
  { name: "Submitted", count: 3 },
  { name: "Graded", count: 6 },
  { name: "Overdue", count: 1 },
];


const assignments: Assignment[] = [
  // PENDING - 2
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Pending",
    marks: "--",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Pending",
    marks: "--",
  },

  // SUBMITTED - 3
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Submitted",
    marks: "--",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Submitted",
    marks: "--",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Submitted",
    marks: "--",
  },

  // GRADED - 6
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Closed",
    status: "Graded",
    marks: "98%",
  },

  // OVERDUE - 1
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Yesterday",
    status: "Overdue",
    marks: "--",
  },
];

const Assignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredAssignments =
    activeTab === "All"
      ? assignments
      : assignments.filter(
        (assignment) => assignment.status === activeTab
      );

  return (
    <DashboardLayout
      title="Assignments"
      subtitle="View all assignments and submit your work before deadlines."
    >
      <div className="space-y-6">

        {/* TABS */}
        <div className="flex items-center gap-8 border-b border-neutral-100">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative pb-4 text-sm font-medium transition ${isActive
                  ? "text-green-700"
                  : "text-neutral-400 hover:text-neutral-600"
                  }`}
              >
                {tab.name} ({tab.count})

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-700" />
                )}
              </button>
            );
          })}
        </div>

        {/* TABLE */}
        <div className="w-full overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 items-center px-2 py-4 text-xs font-medium text-neutral-700">

            <div>Assignments</div>

            <div>Course</div>

            <div>Due Date</div>

            <div>Status</div>

            <div>Marks</div>

            <div>Actions</div>

          </div>

          {/* TABLE ROWS */}
          <div>
            {filteredAssignments.map((assignment, index) => (
              <div
                key={index}
                className="grid grid-cols-6 items-center px-2 py-4"
              >

                {/* ASSIGNMENT */}
                <div>
                  <p className="text-sm font-normal text-neutral-700">
                    {assignment.title}
                  </p>
                </div>

                {/* COURSE */}
                <div className="text-sm text-neutral-600">
                  {assignment.course}
                </div>

                {/* DUE DATE */}
                <div
                  className={`text-sm ${assignment.status === "Graded"
                    ? "text-red-500"
                    : "text-neutral-700"
                    }`}
                >
                  {assignment.due}
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-medium ${assignment.status === "Pending"
                      ? "bg-orange-50 text-orange-500"
                      : assignment.status === "Submitted"
                        ? "bg-green-50 text-green-500"
                        : assignment.status === "Graded"
                          ? "bg-green-50 text-green-500"
                          : "bg-red-50 text-red-500"
                      }`}
                  >
                    {assignment.status === "Graded"
                      ? "Passed"
                      : assignment.status}
                  </span>
                </div>

                {/* MARKS */}
                <div className="text-sm text-neutral-700">
                  {assignment.marks}
                </div>

                {/* ACTION */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      console.log(
                        `Viewing ${assignment.title}`
                      )
                    }
                    className="text-sm font-medium text-green-700 transition hover:text-green-800"
                  >
                    ...
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Assignments;