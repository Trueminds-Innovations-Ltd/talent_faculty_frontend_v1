import { useState } from "react";
import { Link } from "react-router-dom";

const ASSESSMENTS = [
  {
    id: "1",
    name: "UX Research Principles",
    type: "Quiz",
    module: "Research Insights & Documentation",
    submission: "29/30",
    date: "08/08/2026",
    status: "Review",
  },
  {
    id: "2",
    name: "UX Research Plan",
    type: "Assignment",
    module: "Research Planning & Strategy",
    submission: "28/30",
    date: "10/08/2026",
    status: "To Grade",
  },
  {
    id: "3",
    name: "User Interview Report",
    type: "Assignment",
    module: "UX Research Fundamentals",
    submission: "30/30",
    date: "12/08/2026",
    status: "Graded",
  },
  {
    id: "4",
    name: "Ideation Techniques Quiz",
    type: "Quiz",
    module: "Ideation Techniques",
    submission: "30/30",
    date: "15/08/2026",
    status: "Review",
  },
  {
    id: "5",
    name: "Empathy Map Exercise",
    type: "Assignment",
    module: "Empathy & User Understanding",
    submission: "24/30",
    date: "22/08/2026",
    status: "To Grade",
  },
  {
    id: "6",
    name: "Sitemap Creation Task",
    type: "Assignment",
    module: "Sitemap Creation",
    submission: "27/30",
    date: "28/08/26",
    status: "To Grade",
  },
  {
    id: "7",
    name: "Navigation Design",
    type: "Quiz",
    module: "Navigation Design",
    submission: "30/30",
    date: "02/09/2026",
    status: "Review",
  },
  {
    id: "8",
    name: "Low-Fidelity Wireframe Challenge",
    type: "Assignment",
    module: "Wireframing & Prototyping",
    submission: "18/30",
    date: "06/09/2026",
    status: "To Grade",
  },
  {
    id: "9",
    name: "Interactive Prototype Review",
    type: "Assignment",
    module: "Interactive Prototype",
    submission: "30/30",
    date: "10/09/2026",
    status: "Released",
  },
  {
    id: "10",
    name: "Design System Audit",
    type: "Assignment",
    module: "Design Systems",
    submission: "25/30",
    date: "15/09/2026",
    status: "To Grade",
  },
];

const TABS = ["All", "To Grade", "Review", "Graded", "Released"];

export default function AssessmentManagement() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter logic for tabs
  const filteredAssessments = ASSESSMENTS.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  // Helper function to render status badges styling based on status text
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Review":
        return "text-[#A855F7] border-[#E9D5FF] bg-transparent";
      case "To Grade":
        return "text-[#F97316] border-[#FED7AA] bg-transparent";
      case "Graded":
        return "text-[#3B82F6] border-[#BFDBFE] bg-transparent";
      case "Released":
        return "text-[#10B981] border-[#A7F3D0] bg-transparent";
      default:
        return "text-gray-500 border-gray-200";
    }
  };

  // Helper function to render action button text based on status
  const getActionButtonText = (status: string) => {
    switch (status) {
      case "Review":
        return "Review";
      case "To Grade":
        return "Grade";
      case "Graded":
        return "View";
      case "Released":
        return "View";
      default:
        return "View";
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white relative">
        <main className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto relative">
          {/* Header Section */}
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Assessment Management
            </h1>
            <p className="text-[15px] text-gray-400 font-medium">
              Manage learner submissions, grade assignments, and review quiz
              performance.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 mb-8 bg-gray-50/50 w-max p-1 rounded-2xl border border-gray-100">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table Data */}
          <div className="w-full overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900 rounded-l-xl whitespace-nowrap">
                    Assessment
                  </th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900 whitespace-nowrap">
                    Type
                  </th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900 whitespace-nowrap">
                    Module
                  </th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900 whitespace-nowrap">
                    Submission
                  </th>
                  <th className="py-4 px-6 text-[14px] font-bold text-gray-900 whitespace-nowrap">
                    Due Date
                  </th>
                  <th
                    className="py-4 px-6 text-[14px] font-bold text-gray-900 rounded-r-xl whitespace-nowrap"
                    colSpan={2}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                <tr className="h-4"></tr> {/* Spacing after header */}
                {filteredAssessments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6 text-[13px] font-bold text-gray-700 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                      {item.type}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium max-w-[220px] whitespace-normal break-words">
                      {item.module}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                      {item.submission}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${getStatusBadgeStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Link
                        to={`/instructor/assessments/${item.id}`}
                        className="inline-block px-6 py-1.5 rounded-full text-[12px] font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap text-center"
                      >
                        {getActionButtonText(item.status)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAssessments.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-[14px]">
                No assessments found for this filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
