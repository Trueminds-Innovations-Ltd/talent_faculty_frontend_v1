import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";


const tabs = [
  { name: "All", count: 12 },
  { name: "Pending", count: 2 },
  { name: "Submitted", count: 3 },
  { name: "Graded", count: 6 },
  { name: "Overdue", count: 1 },
];

const assignments = [
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
  {
    title: "Wireframe Mobile Banking",
    course: "UX Design",
    due: "Tomorrow",
    status: "Pending",
    marks: "--",
  },
];

const Assignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <DashboardLayout
      title="Assignments"
      subtitle="View all assignments and submit your work before deadlines."
    >
      <div className="space-y-6">

        {/* Header */}

      

        {/* Tabs */}

        <div className="flex gap-3">

          {tabs.map((tab) => (

            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab.name
                  ? "bg-primary text-white"
                  : "bg-white border border-neutral-200 text-neutral-600"
              }`}
            >
              {tab.name} ({tab.count})
            </button>

          ))}

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

          <div className="grid grid-cols-6 border-b border-neutral-100 bg-neutral-50 px-8 py-4 text-sm font-semibold text-neutral-500">

            <div>Assignment</div>

            <div>Course</div>

            <div>Due Date</div>

            <div>Status</div>

            <div>Marks</div>

            <div className="text-center">Action</div>

          </div>
                    {assignments.map((assignment, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center border-b border-neutral-100 px-8 py-5 hover:bg-neutral-50"
            >
              <div>
                <h3 className="text-sm font-semibold text-neutral-800">
                  {assignment.title}
                </h3>

              </div>

              <div className="text-sm text-neutral-600">
                {assignment.course}
              </div>

              <div className="text-sm text-neutral-600">
                {assignment.due}
              </div>

              <div>
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold
                  ${
                    assignment.status === "Pending"
                      ? "bg-orange-100 text-orange-600"
                      : assignment.status === "Submitted"
                      ? "bg-blue-100 text-blue-600"
                      : assignment.status === "Graded"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>

              <div className="font-semibold text-neutral-700">
                {assignment.marks}
              </div>

             <div className="flex justify-center">
               <button className="text-sm font-medium text-green-600 hover:text-green-700">
                 View
              </button>
             </div>

            </div>
          ))}

        </div>


      </div>

    </DashboardLayout>

  );
};

export default Assignments;