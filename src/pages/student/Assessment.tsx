import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/common/Modal";
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
    id: "1",
    title: "Design Thinking Quiz",
    course: "Product Design",
    duration: "30 minutes",
    date: "Tomorrow",
    status: "upcoming",
  },
  {
    id: "2",
    title: "UI Principles Test",
    course: "UI/UX Design",
    duration: "45 minutes",
    date: "4th May, 2024",
    status: "upcoming",
  },
  {
    id: "3",
    title: "HTML & CSS Quiz",
    course: "Web Development",
    duration: "40 minutes",
    date: "Completed on 20th April, 2024",
    status: "completed",
    score: "90%",
  },
  {
    id: "4",
    title: "JavaScript Basics Quiz",
    course: "Web Development",
    duration: "30 minutes",
    date: "Completed on 15th April, 2024",
    status: "completed",
    score: "85%",
  },
  {
    id: "5",
    title: "Auto Layout & Components",
    course: "Product Design",
    duration: "30 minutes",
    date: "Completed on 10th April, 2024",
    status: "completed",
    score: "87%",
  },
];

const Assessments: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setSelectedAssessmentId(id);
    setIsModalOpen(true);
  };

  const handleStartQuiz = () => {
    setIsModalOpen(false);
    if (selectedAssessmentId) {
      navigate(`/assessments/${selectedAssessmentId}/take`);
    }
  };

  return (
    <DashboardLayout
      title="Assessments"
      subtitle="Take quizzes and track your performance"
    >
      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-12 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-4 text-md font-semibold transition ${
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
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-6 py-4 transition hover:shadow-sm"
            >
              {/* Left */}
              <div>
                <h3 className="text-md font-medium text-neutral-800">
                  {assessment.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {assessment.course}
                </p>
                <div className="mt-3 flex items-center gap-8 text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Clock3 size={18} />
                    <span className="text-sm">{assessment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <span className="text-sm">{assessment.date}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                {assessment.status === "upcoming" ? (
                  <button 
                    onClick={() => handleOpenModal(assessment.id)}
                    className="rounded-2xl bg-green-700 px-6 py-3 text-md font-medium text-white transition hover:bg-green-800 cursor-pointer"
                  >
                    Start Quiz
                  </button>
                ) : (
                  <div className="text-right">
                    <h2 className="text-md font-small text-green-700">
                      {assessment.score}
                    </h2>
                    <button className="mt-4 text-lg font-medium text-green-700 hover:underline cursor-pointer">
                      View Result
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Quiz Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center text-center px-2 py-4">
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4 leading-tight tracking-tight">
            Ready to test your<br />knowledge?
          </h2>
          <p className="text-[15px] text-neutral-500 mb-8 max-w-[320px] md:max-w-[360px] leading-relaxed">
            This quiz will assess your understanding of the key concepts covered in this course. Read each question carefully and select the answer you believe is correct.
          </p>
          
          <div className="flex w-full gap-4 justify-center px-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-2xl border border-neutral-200 bg-white py-3.5 text-[15px] font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 rounded-2xl bg-green-700 py-3.5 text-[15px] font-semibold text-white transition hover:bg-green-800 shadow-sm cursor-pointer"
            >
              Yes, Start Quiz
            </button>
          </div>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Assessments;