import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Clock3,
  CalendarDays,
} from "lucide-react";

const tabs = [
  { name: "All", count: 5 },
  { name: "Upcoming", count: 2 },
  { name: "Completed", count: 3 },
];

const assessments = [
  {
    title: "Design Thinking Quiz",
    course: "Product Design",
    duration: "30 minutes",
    date: "Tomorrow",
    status: "upcoming",
  },
  {
    title: "UI Principles Test",
    course: "UI/UX Design",
    duration: "45 minutes",
    date: "4th May, 2024",
    status: "upcoming",
  },
  {
    title: "HTML & CSS Quiz",
    course: "Web Development",
    duration: "40 minutes",
    date: "Completed on 20th April, 2024",
    status: "completed",
    score: "90%",
  },
  {
    title: "JavaScript Basics Quiz",
    course: "Web Development",
    duration: "30 minutes",
    date: "Completed on 15th April, 2024",
    status: "completed",
    score: "85%",
  },
  {
    title: "Auto Layout & Components",
    course: "Product Design",
    duration: "30 minutes",
    date: "Completed on 10th April, 2024",
    status: "completed",
    score: "87%",
  },
];

const Assessments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <DashboardLayout
      title="Assessments"
      subtitle="Take quizzes and track your performance"
    >
      <div className="space-y-8">

        {/* Top Bar */}

        <div className="flex items-center justify-between">

          <div></div>

    

        </div>

        {/* Tabs */}

        <div className="flex gap-12 border-b border-neutral-200">

          {tabs.map((tab) => (

            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-4 text-[18px] font-semibold transition ${
                activeTab === tab.name
                  ? "border-b-2 border-green-700 text-green-700"
                  : "text-neutral-400"
              }`}
            >
              {tab.name} ({tab.count})
            </button>

          ))}

        </div>

        {/* Assessment Cards */}
           <div className="space-y-6">
            {assessments.map((assessment, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-6 py-6 transition hover:shadow-sm"
            >
              {/* Left */}

              <div>
                
                <h3 className="text-[22px] font-medium text-neutral-800">
                  {assessment.title}
                </h3>

                <p className="mt-2 text-lg text-neutral-500">
                  {assessment.course}
                </p>

                <div className="mt-5 flex items-center gap-8 text-neutral-500">

                  <div className="flex items-center gap-2">

                    <Clock3 size={18} />

                    <span className="text-sm">
                      {assessment.duration}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <CalendarDays size={18} />

                    <span className="text-sm">
                      {assessment.date}
                    </span>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div>

                {assessment.status === "upcoming" ? (

                  <button className="rounded-2xl bg-green-700 px-8 py-4 text-lg font-medium text-white transition hover:bg-green-800">
                    Start Quiz
                  </button>

                ) : (

                  <div className="text-right">

                    <h2 className="text-4xl font-small text-green-700">
                      {assessment.score}
                    </h2>

                    <button className="mt-4 text-lg font-medium text-green-700 hover:underline">
                      View Result
                    </button>

                  </div>

                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>

  );
};

export default Assessments;