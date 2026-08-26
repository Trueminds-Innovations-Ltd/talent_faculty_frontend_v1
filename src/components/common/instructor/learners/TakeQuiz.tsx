import React, { useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";

interface Question {
  id: number;
  title: string;
  points: number;
  options: { label: string; text: string }[];
  correctAnswer: string;
}

const quizData = {
  title: "UI/UX Design Fundamentals Assessment 01 — Design Principles",
  totalQuestions: 5,
  durationMinutes: 10,
  attempts: 1,
  questions: [
    {
      id: 1,
      title: "What is the primary goal of UX design?",
      points: 2,
      correctAnswer: "B",
      options: [
        { label: "A", text: "To make an interface visually attractive" },
        {
          label: "B",
          text: "To create a meaningful and user-friendly experience",
        },
        { label: "C", text: "To add more features to a product" },
        { label: "D", text: "To make an application faster" },
      ],
    },
    {
      id: 2,
      title:
        "Which of the following is commonly used to represent the basic structure of a digital interface?",
      points: 2,
      correctAnswer: "C",
      options: [
        { label: "A", text: "Moodboard" },
        { label: "B", text: "User persona" },
        { label: "C", text: "Wireframe" },
        { label: "D", text: "Design system" },
      ],
    },
    {
      id: 3,
      title: "What does UI stand for?",
      points: 2,
      correctAnswer: "B",
      options: [
        { label: "A", text: "User Interaction" },
        { label: "B", text: "User Interface" },
        { label: "C", text: "User Integration" },
        { label: "D", text: "User Information" },
      ],
    },
    {
      id: 4,
      title: "Which stage of the UX process involves understanding users and their needs?",
      points: 2,
      correctAnswer: "B",
      options: [
        { label: "A", text: "Prototyping" },
        { label: "B", text: "User Research" },
        { label: "C", text: "Visual Design" },
        { label: "D", text: "Development" },
      ],
    },
    {
      id: 5,
      title: "Why are prototypes useful in the design process?",
      points: 2,
      correctAnswer: "B",
      options: [
        { label: "A", text: "They replace user research" },
        { label: "B", text: "They allow designers to test and communicate ideas before development" },
        { label: "C", text: "They make the final product automatically" },
        { label: "D", text: "They eliminate the need for usability testing" },
      ],
    }
  ] as Question[],
};

// Reusable SVG Icons to avoid missing imports
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

const TakeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    1: "B",
    2: "C",
    3: "C", // Pre-filling a wrong answer to demonstrate the red UI state
    4: "B",
    5: "B",
  });
  
  // Modal States
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  
  // View State (Taking Quiz vs Results)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionLabel: string) => {
    // Prevent changing answers if already submitted
    if (isSubmitted) return;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  // Flow Handlers
  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessDone = () => {
    setIsSuccessModalOpen(false);
    setIsSubmitted(true); // Switch to Results View
  };

  const handleReattempt = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Calculate Score
  const correctCount = quizData.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length;
  const scorePercentage = Math.round((correctCount / quizData.totalQuestions) * 100);

  return (
    <DashboardLayout
      title="Assessments"
      subtitle="Take quizzes and track your performance"
    >
      <div className="max-w-[1100px] space-y-8 pb-10">
        
        {/* Header Information */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
            {quizData.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-400 font-medium">
            {quizData.totalQuestions} Questions • {quizData.durationMinutes} Minutes • {quizData.attempts} Attempt
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200/60 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#067A46] h-full rounded-full transition-all duration-300"
            style={{
              width: `${(Object.keys(selectedAnswers).length / quizData.totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* ==================================================== */}
        {/* QUIZ TAKING VIEW */}
        {/* ==================================================== */}
        {!isSubmitted ? (
          <div className="max-w-[900px]">
            <div className="space-y-12 pt-4">
              {quizData.questions.map((q) => (
                <div key={q.id} className="space-y-6">
                  <h2 className="text-xl font-bold text-neutral-900">
                    Question {q.id} of {quizData.totalQuestions}
                  </h2>
                  <p className="text-base text-neutral-700 font-medium">
                    {q.title} ({q.points} points)
                  </p>

                  <div className="space-y-4 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = selectedAnswers[q.id] === opt.label;
                      return (
                        <div
                          key={opt.label}
                          onClick={() => handleSelectOption(q.id, opt.label)}
                          className="flex items-center gap-4 cursor-pointer group"
                        >
                          {/* Radio Button UI */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                              isSelected
                                ? "border-[#067A46] bg-white"
                                : "border-neutral-300 group-hover:border-neutral-400"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#067A46]" />
                            )}
                          </div>
                          <span
                            className={`text-[15px] font-medium transition ${
                              isSelected
                                ? "text-neutral-900"
                                : "text-neutral-500 group-hover:text-neutral-700"
                            }`}
                          >
                            {opt.label}. {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="bg-[#067A46] hover:bg-[#056439] text-white font-semibold px-10 py-3.5 rounded-2xl transition-all shadow-sm active:scale-95"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* RESULTS VIEW */
          /* ==================================================== */
          <div className="flex flex-col lg:flex-row gap-8 items-start pt-4 border-t border-dashed border-neutral-300">
            
            {/* Left Sidebar: Your Picks */}
            <div className="w-full lg:w-[300px] bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex-shrink-0">
              <h3 className="font-bold text-neutral-900 mb-6 text-lg">Your picks</h3>
              <div className="space-y-5">
                {quizData.questions.map((q, idx) => {
                  const pickedLabel = selectedAnswers[q.id];
                  const isCorrect = pickedLabel === q.correctAnswer;
                  const pickedText = q.options.find(o => o.label === pickedLabel)?.text || "No answer provided";
                  
                  return (
                    <div key={q.id} className="flex items-center gap-4">
                      {/* Number circle */}
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full text-sm font-semibold text-neutral-600 bg-neutral-50">
                        {idx + 1}
                      </div>
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {isCorrect ? <CheckIcon /> : <CrossIcon />}
                        <span className="text-sm font-medium text-neutral-600 truncate" title={`${pickedLabel}. ${pickedText}`}>
                          {pickedLabel ? `${pickedLabel}. ${pickedText}` : "Unanswered"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Quiz Results & Question Review */}
            <div className="flex-1 w-full space-y-8">
              
              {/* Results Summary Card */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="text-5xl drop-shadow-sm">🎊</div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">Quiz Results</h3>
                    <div className="flex items-center gap-6 text-sm mt-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-medium">Percentage</span>
                        <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                          {/* Mocking a green circle for percentage indicator as in UI */}
                          <div className={`w-3 h-3 rounded-full border-[3px] ${scorePercentage >= 50 ? 'border-green-500' : 'border-red-500'}`}></div>
                          {scorePercentage}%
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-medium">Time Used</span>
                        <span className="font-bold text-neutral-900">07:58</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleReattempt}
                  className="bg-[#067A46] hover:bg-[#056439] text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm w-full sm:w-auto"
                >
                  Re-attempt quiz
                </button>
              </div>

              {/* Questions Review List */}
              <div className="space-y-12">
                {quizData.questions.map((q) => (
                  <div key={q.id} className="space-y-4">
                    <h2 className="text-xl font-bold text-neutral-900">
                      Question {q.id} of {quizData.totalQuestions}
                    </h2>
                    <p className="text-base text-neutral-700 font-medium pb-2">
                      {q.title} ({q.points} points)
                    </p>

                    <div className="space-y-3">
                      {q.options.map((opt) => {
                        const isPicked = selectedAnswers[q.id] === opt.label;
                        const isCorrectAnswer = q.correctAnswer === opt.label;

                        // Default unselected state styling
                        let containerClass = "flex items-center justify-between p-3.5 rounded-xl transition-all";
                        let radioClass = "w-5 h-5 rounded-full border-2 border-neutral-300 mr-4 flex-shrink-0";
                        let textClass = "text-[15px] font-medium text-neutral-500 flex-1";
                        let icon = null;

                        if (isPicked && isCorrectAnswer) {
                          containerClass += " bg-green-50 border border-green-200/50";
                          radioClass = "w-5 h-5 rounded-full border-2 border-[#067A46] mr-4 flex-shrink-0 flex items-center justify-center bg-white";
                          textClass = "text-[15px] font-medium text-[#067A46] flex-1";
                          icon = <CheckIcon />;
                        } else if (isPicked && !isCorrectAnswer) {
                          containerClass += " bg-red-50 border border-red-100";
                          radioClass = "w-5 h-5 rounded-full border-2 border-red-500 mr-4 flex-shrink-0 flex items-center justify-center bg-white";
                          textClass = "text-[15px] font-medium text-red-700 flex-1";
                          icon = <CrossIcon />;
                        } 
                        // If they missed the correct answer, you might want to highlight it. 
                        // But following the provided UI precisely, unselected options remain standard.

                        return (
                          <div key={opt.label} className={containerClass}>
                            <div className="flex items-center w-full">
                              <div className={radioClass}>
                                {isPicked && (
                                  <div className={`w-2.5 h-2.5 rounded-full ${isCorrectAnswer ? 'bg-[#067A46]' : 'bg-red-500'}`} />
                                )}
                              </div>
                              <span className={textClass}>
                                {opt.label}. {opt.text}
                              </span>
                              {icon}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* MODALS */}
      {/* ==================================================== */}
      
      {/* 1. Confirmation Modal ("Are you sure?") */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-neutral-900 tracking-tight leading-snug mb-3">
              Are you sure you want to submit your quiz?
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 px-2">
              Once submitted, you won't be able to make changes to your answers. Make sure you've reviewed your responses before submitting.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-1/2 py-3.5 px-6 rounded-2xl border-2 border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="w-1/2 py-3.5 px-6 rounded-2xl bg-[#067A46] hover:bg-[#056439] text-white font-semibold transition-colors shadow-sm"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Success Modal ("Quiz Submitted Successfully") */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-[2rem] p-10 max-w-[480px] w-full text-center shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-[28px] font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
              Quiz Submitted<br />Successfully
            </h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-10 px-4">
              Your answers have been submitted and recorded. You can now view your score and feedback from the assessment page.
            </p>

            <button
              onClick={handleSuccessDone}
              className="w-full py-4 px-6 rounded-2xl bg-[#067A46] hover:bg-[#056439] text-white font-bold text-lg transition-colors shadow-md active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default TakeQuiz;