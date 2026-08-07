import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, Check } from "lucide-react";
import DashboardLayout from "../../components/layout/instruct/DashboardLayout";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const durations = [
    "1 Week",
    "2 Weeks",
    "1 Month",
    "3 Months",
    "6 Months",
  ];

  const isValid =
    courseTitle.trim() !== "" &&
    courseDescription.trim() !== "" &&
    learningOutcomes.trim() !== "" &&
    courseDuration !== "";

  const hasChanges =
    courseTitle.trim() !== "" ||
    courseDescription.trim() !== "" ||
    learningOutcomes.trim() !== "" ||
    courseDuration !== "";

  return (
    <DashboardLayout>
      <div className="min-h-screen px-10 ">

        {/* Back */}

        <button
          onClick={() => navigate("/instructor/dashboard")}
          className="mb-8 flex items-center gap-2 text-[15px] font-medium text-[#4D4D4D] hover:text-[#17823B] transition"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}

        <h1 className="text-xl font-bold text-[#202020]">
          Create a course
        </h1>

        <p className="mt-2 mb-10 text-sm text-[#8A8A8A]">
          Set up your course information to get started.
        </p>

        {/* Form */}

        <div className="w-full max-w-[760px] rounded-xl bg-white">

          <h2 className="text-xl font-semibold text-[#4D4D4D]">
            Course Details
          </h2>

          <p className="mt-2 mb-8 text-sm text-[#8A8A8A]">
            Provide essential information about your course.
          </p>

          {/* Course Title */}

          <div className="mb-7">

            <label className="mb-3 block text-[16px] font-semibold text-[#202020]">
              Course Title
            </label>

            <input
              type="text"
              placeholder="Enter course title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="h-14 w-full rounded-lg border border-[#D9D9D9] bg-white px-5 text-[15px] text-black outline-none transition focus:border-[#17823B]"
            />

          </div>
          {/* =========================
              Course Description
          ========================= */}

          <div className="mb-8 relative">

            <label className="mb-3 block text-[16px] font-semibold text-[#202020]">
              Course Description
            </label>

            <textarea
              placeholder="Describe your course and what learners will gain."
              maxLength={150}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="h-36 w-full resize-none rounded-lg border border-[#D9D9D9] bg-white px-5 py-4 text-[15px] text-[#202020] outline-none transition focus:border-[#17823B]"
            />

            <span className="absolute bottom-[-22px] right-0 text-xs text-[#9A9A9A]">
              {courseDescription.length}/150
            </span>

          </div>

          {/* =========================
              Learning Outcomes
          ========================= */}

          <div className="mb-8 relative">

            <label className="mb-3 block text-[16px] font-semibold text-[#202020]">
              Learning Outcomes
            </label>

            <textarea
              placeholder="List what learners will achieve after completing this course."
              maxLength={150}
              value={learningOutcomes}
              onChange={(e) => setLearningOutcomes(e.target.value)}
              className="h-36 w-full resize-none rounded-lg border border-[#D9D9D9] bg-white px-5 py-4 text-[15px] text-[#202020] outline-none transition focus:border-[#17823B]"
            />

            <span className="absolute bottom-[-22px] right-0 text-xs text-[#9A9A9A]">
              {learningOutcomes.length}/150
            </span>

          </div>

          {/* =========================
              Course Duration
          ========================= */}

          <div className="mb-10 relative">

            <label className="mb-3 block text-[16px] font-semibold text-[#202020]">
              Course Duration
            </label>

            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border border-[#D9D9D9] bg-white px-5 transition hover:border-[#17823B]"
            >

              <span
                className={`text-[15px] ${courseDuration
                  ? "text-[#202020]"
                  : "text-[#B5B5B5]"
                  }`}
              >
                {courseDuration || "Select duration"}
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""
                  }`}
              />

            </div>

            {showDropdown && (

              <div className="absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-lg">

                {durations.map((item) => (

                  <div
                    key={item}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCourseDuration(item);
                      setShowDropdown(false);
                    }}
                    className="cursor-pointer border-b border-[#F2F2F2] px-5 py-4 text-[15px] text-[#202020] transition hover:bg-[#F7F7F7] last:border-b-0"
                  >
                    {item}
                  </div>

                ))}

              </div>

            )}

          </div>
          {/* =========================
              ACTION BUTTONS
          ========================= */}

          <div className="flex items-center gap-6 mt-12">

            {/* Cancel / Save Draft */}

            <button
              onClick={() => {
                if (hasChanges) {
                  alert("Course saved as draft!");
                  // Replace with your API call later
                } else {
                  navigate("/instructor/dashboard");
                }
              }}
              className="h-14 w-[260px] rounded-lg border border-[#D9D9D9] bg-white text-[15px] font-semibold text-[#202020] transition hover:bg-[#F8F8F8]"
            >
              {hasChanges ? "Save Draft" : "Cancel"}
            </button>

            {/* Create Course */}

            <button
              disabled={!isValid}
              onClick={() => {
                if (isValid) {
                  setShowSuccess(true);
                }
              }}
              className={`h-14 w-[260px] rounded-lg text-[15px] font-semibold text-white transition
                ${isValid
                  ? "bg-[#17823B] hover:bg-[#116B2F] cursor-pointer"
                  : "bg-[#D9D9D9] cursor-not-allowed"
                }`}
            >
              Create Course
            </button>

          </div>

        </div>
        {/* =========================
          SUCCESS MODAL
       ========================= */}

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-[620px] rounded-3xl bg-white p-10 shadow-2xl">

              {/* Success Icon */}

              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#17823B]">

                <Check
                  size={38}
                  strokeWidth={3}
                  className="text-[#17823B]"
                />

              </div>

              {/* Heading */}

              <h2 className="text-center text-[32px] font-bold text-[#202020]">
                Course Published
              </h2>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-[430px] text-center text-[16px] leading-7 text-[#8A8A8A]">
                Your course has been successfully published.
                You can now return to your dashboard or
                continue building your course.
              </p>

              {/* Buttons */}

              <div className="mt-10 flex items-center justify-center gap-5">

                <button
                  onClick={() => {
                    setShowSuccess(false);
                    navigate("/instructor/dashboard");
                  }}
                  className="h-14 w-[220px] rounded-lg border border-[#D9D9D9] bg-white text-[15px] font-semibold text-[#202020] transition hover:bg-gray-100"
                >
                  Back to Dashboard
                </button>

                <button
                  onClick={() => {
                    navigate("/instructor/courses");
                  }}
                  className="h-14 w-[220px] rounded-lg bg-[#17823B] text-[15px] font-semibold text-white transition hover:bg-[#116B2F]"
                >
                  Go to Course Builder
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </DashboardLayout>

  );
}