import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Users,
  BookOpen,
  CheckCircle2,
  BarChart3,
  FileText,
  Award,
} from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";
import Avatar from "../../components/cohorts/Avatar";
import StatusBadge from "../../components/cohorts/StatusBadge";
import ProgressBar from "../../components/cohorts/ProgressBar";
import Pagination from "../../components/cohorts/Pagination";
import ExportPanel from "../../components/cohorts/ExportPanel";

import {
  getCohortById,
  learnerOverview,
  learners,
  courseOverview,
  cohortCourses,
  assessmentOverview,
  assessments,
  certificateOverview,
  certificateRows,
} from "../../data/cohorts";

type Tab = "Overview" | "Learners" | "Courses" | "Assessments" | "Certificates";
const tabs: Tab[] = ["Overview", "Learners", "Courses", "Assessments", "Certificates"];

function MiniStat({
  icon,
  label,
  value,
  valueColor = "#161616",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueColor?: string;
}) {
  return (
    <div className="flex-1 rounded-[11px] border border-[#e8e8e8] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#555]">{label}</span>
        {icon}
      </div>
      <p className="mt-2 text-[22px] font-semibold" style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  );
}

export default function CohortDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Learners");

  const cohort = getCohortById(id);

  if (!cohort) {
    return (
      <AdminDashboardLayout>
        <div className="p-8 text-[13px] text-[#8a8a8a]">Cohort not found.</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white px-6 py-5">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => navigate("/admin/cohorts")}
            className="flex items-center gap-1 text-[12px] font-medium text-[#161616]"
          >
            <ChevronLeft size={16} />
            Back to Cohorts
          </button>

          {/* ============== HEADER CARD ============== */}
          <div className="mt-5 flex items-start justify-between rounded-[14px] bg-[#eef8f1] p-6">
            <div className="flex items-start gap-4">
              <Avatar src={cohort.image} initials={cohort.initials} size={64} rounded="lg" />
              <div>
                <h1 className="text-[22px] font-bold text-[#161616]">
                  Cohort {cohort.alias ? cohort.code.split("-")[0].replace("TF0", "") : ""}
                  {"  "}
                  <span className="font-bold">({cohort.alias})</span>
                </h1>
                <p className="mt-1 text-[12px] text-[#929292]">{cohort.code}</p>
                <p className="mt-3 text-[13px] text-[#555]">{cohort.description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/admin/cohorts/${cohort.id}/edit`)}
              className="h-10 shrink-0 rounded-[10px] border border-[#c9c9c9] bg-white px-4 text-[12px] font-semibold text-[#161616]"
            >
              Edit Cohort
            </button>
          </div>

          {/* ============== STATUS ROW ============== */}
          <div className="mt-5 flex items-center gap-6 border-b border-[#ededed] pb-5">
            <StatusBadge status={cohort.status} />
            <span className="text-[16px] font-bold text-[#161616]">{cohort.programType}</span>
            <span className="text-[12px] text-[#555]">
              <span className="font-semibold">Start Date:</span> {cohort.start}
            </span>
            <span className="text-[12px] text-[#555]">
              <span className="font-semibold">End Date:</span> {cohort.end}
            </span>
          </div>

          {/* ============== TEAM ============== */}
          <section className="mt-7 rounded-[11px] border border-[#e8e8e8] p-6">
            <h2 className="text-[16px] font-semibold text-[#161616]">Team</h2>

            <h3 className="mt-5 text-[13px] font-medium text-[#555]">Coordinator</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="flex items-center gap-3 rounded-full border border-[#ededed] px-3 py-2">
                <Avatar src={cohort.coordinator.image} initials={cohort.coordinator.initials} size={36} />
                <div>
                  <p className="text-[12px] font-medium text-[#222]">{cohort.coordinator.name}</p>
                  <p className="text-[10px] text-[#929292]">{cohort.coordinator.email}</p>
                </div>
              </div>
            </div>

            <h3 className="mt-6 text-[13px] font-medium text-[#555]">Instructors</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {cohort.instructors.map((instructor) => (
                <div
                  key={instructor.email}
                  className="flex items-center gap-3 rounded-full border border-[#ededed] px-3 py-2"
                >
                  <Avatar src={instructor.image} initials={instructor.initials} size={36} />
                  <div>
                    <p className="text-[12px] font-medium text-[#222]">{instructor.name}</p>
                    <p className="text-[10px] text-[#929292]">{instructor.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============== TABS PANEL ============== */}
          <section className="mt-7 rounded-[11px] border border-[#e8e8e8] p-6">
            <div className="flex items-center gap-8 border-b border-[#ededed]">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`pb-3 text-[13px] font-medium transition-colors ${
                    tab === t
                      ? "border-b-2 border-[#07863d] text-[#07863d]"
                      : "text-[#8a8a8a]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Overview" && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                <MiniStat icon={<Users size={16} className="text-[#4285ff]" />} label="Total Learners" value={learnerOverview.totalLearners} />
                <MiniStat icon={<BookOpen size={16} className="text-[#4285ff]" />} label="Assigned Courses" value={courseOverview.assignedCourses} />
                <MiniStat icon={<Award size={16} className="text-[#4285ff]" />} label="Certificates Issued" value={certificateOverview.issued} />
                <p className="col-span-3 mt-2 text-[12px] text-[#929292]">
                  Switch to the Learners, Courses, Assessments, or Certificates tabs for a detailed breakdown.
                </p>
              </div>
            )}

            {tab === "Learners" && (
              <>
                <h2 className="mt-6 text-[15px] font-medium text-[#161616]">Learner Overview</h2>
                <div className="mt-4 flex gap-4">
                  <MiniStat icon={<BarChart3 size={16} className="text-[#08a24a]" />} label="Overall Progress" value={`${learnerOverview.overallProgress}%`} valueColor="#08a24a" />
                  <MiniStat icon={<Users size={16} className="text-[#4285ff]" />} label="Total Learners" value={learnerOverview.totalLearners} valueColor="#929292" />
                  <MiniStat icon={<BookOpen size={16} className="text-[#4285ff]" />} label="Active Learners" value={learnerOverview.activeLearners} valueColor="#929292" />
                  <MiniStat icon={<CheckCircle2 size={16} className="text-[#08a24a]" />} label="Completed" value={learnerOverview.completed} valueColor="#929292" />
                  <MiniStat icon={<Users size={16} className="text-[#c9c9c9]" />} label="Inactive" value={learnerOverview.inactive} valueColor="#929292" />
                </div>

                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[900px]">
                    <div className="grid grid-cols-[2fr_0.8fr_0.9fr_1fr_1.1fr_0.8fr] items-center bg-[#f3f3f3] px-4 py-3 text-[11px] font-semibold text-[#222]">
                      <div>Users</div>
                      <div className="text-center">Courses Enrolled</div>
                      <div className="text-center">Course Completion</div>
                      <div className="text-center">Assessment Completion</div>
                      <div>Cohort Progress</div>
                      <div className="text-center">Status</div>
                    </div>

                    {learners.map((learner, i) => (
                      <div
                        key={i}
                        className="grid min-h-[62px] grid-cols-[2fr_0.8fr_0.9fr_1fr_1.1fr_0.8fr] items-center border-b border-[#ededed] px-4"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar src={learner.image} initials={learner.initials} size={32} />
                          <div>
                            <p className="text-[12px] font-medium text-[#222]">{learner.name}</p>
                            <p className="text-[10px] text-[#929292]">{learner.email}</p>
                          </div>
                        </div>
                        <div className="text-center text-[11px] text-[#222]">{learner.coursesEnrolled}</div>
                        <div className="text-center text-[11px] text-[#222]">{learner.courseCompletion}%</div>
                        <div className="text-center text-[11px] text-[#222]">{learner.assessmentCompletion}%</div>
                        <div>
                          <ProgressBar value={learner.cohortProgress} />
                        </div>
                        <div className="flex justify-center">
                          <StatusBadge status={learner.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Pagination showingFrom={1} showingTo={5} total={200} itemLabel="Learners" lastPage={40} />
                <ExportPanel title="Export Learners Report" defaultEmail="maryjohnson@gmail.com" />
              </>
            )}

            {tab === "Courses" && (
              <>
                <h2 className="mt-6 text-[15px] font-medium text-[#161616]">Course Overview</h2>
                <div className="mt-4 flex gap-4">
                  <MiniStat icon={<BarChart3 size={16} className="text-[#08a24a]" />} label="Avg. Completion" value={`${courseOverview.avgCompletion}%`} valueColor="#08a24a" />
                  <MiniStat icon={<BookOpen size={16} className="text-[#4285ff]" />} label="Assigned Courses" value={courseOverview.assignedCourses} valueColor="#929292" />
                  <MiniStat icon={<CheckCircle2 size={16} className="text-[#08a24a]" />} label="Completed Courses" value={courseOverview.completedCourses} valueColor="#929292" />
                  <MiniStat icon={<FileText size={16} className="text-[#f3a000]" />} label="In Progress" value={courseOverview.inProgress} valueColor="#929292" />
                  <MiniStat icon={<Users size={16} className="text-[#c9c9c9]" />} label="Not Started" value={courseOverview.notStarted} valueColor="#929292" />
                </div>

                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[950px]">
                    <div className="grid grid-cols-[1.8fr_1fr_0.9fr_0.8fr_0.9fr_0.9fr_1fr] items-center bg-[#f3f3f3] px-4 py-3 text-[11px] font-semibold text-[#222]">
                      <div>Course</div>
                      <div>Instructors</div>
                      <div className="text-center">Status</div>
                      <div className="text-center">Enrollees</div>
                      <div className="text-center">Certificates issued</div>
                      <div className="text-center">Course Completion</div>
                      <div className="text-center">Assessment Completion</div>
                    </div>

                    {cohortCourses.map((course, i) => (
                      <div
                        key={i}
                        className="grid min-h-[62px] grid-cols-[1.8fr_1fr_0.9fr_0.8fr_0.9fr_0.9fr_1fr] items-center border-b border-[#ededed] px-4"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar src={course.image} initials={course.initials} size={32} />
                          <div>
                            <p className="text-[12px] font-medium text-[#222]">{course.name}</p>
                            <p className="text-[10px] text-[#929292]">{course.lessonsModules}</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-[#222]">{course.instructor}</div>
                        <div className="flex justify-center">
                          <StatusBadge status={course.status} />
                        </div>
                        <div className="text-center text-[11px] text-[#222]">{course.enrollees}</div>
                        <div className="text-center text-[11px] text-[#222]">{course.certificatesIssued}</div>
                        <div className="text-center text-[11px] text-[#222]">{course.courseCompletion}%</div>
                        <div className="text-center text-[11px] text-[#222]">{course.assessmentCompletion}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <ExportPanel title="Export Courses Report" defaultEmail="maryjohnson@gmail.com" />
              </>
            )}

            {tab === "Assessments" && (
              <>
                <h2 className="mt-6 text-[15px] font-medium text-[#161616]">Assessment Overview</h2>
                <div className="mt-4 flex gap-4">
                  <MiniStat icon={<BarChart3 size={16} className="text-[#08a24a]" />} label="Avg. Completion" value={`${assessmentOverview.avgCompletion}%`} valueColor="#08a24a" />
                  <MiniStat icon={<FileText size={16} className="text-[#929292]" />} label="Total Assessment" value={assessmentOverview.totalAssessments} valueColor="#929292" />
                  <MiniStat icon={<BarChart3 size={16} className="text-[#929292]" />} label="Avg. Pass" value={`${assessmentOverview.avgPass}%`} valueColor="#929292" />
                  <MiniStat icon={<BarChart3 size={16} className="text-[#929292]" />} label="Avg. Score" value={`${assessmentOverview.avgScore}%`} valueColor="#929292" />
                </div>

                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[950px]">
                    <div className="grid grid-cols-[1.2fr_0.9fr_1.6fr_0.8fr_0.9fr_1fr] items-center bg-[#f3f3f3] px-4 py-3 text-[11px] font-semibold text-[#222]">
                      <div>Assignment</div>
                      <div>Type</div>
                      <div>Course</div>
                      <div className="text-center">Pass Rate</div>
                      <div className="text-center">Average Score</div>
                      <div className="text-center">Assessment Completion</div>
                    </div>

                    {assessments.map((a, i) => (
                      <div
                        key={i}
                        className="grid min-h-[62px] grid-cols-[1.2fr_0.9fr_1.6fr_0.8fr_0.9fr_1fr] items-center border-b border-[#ededed] px-4"
                      >
                        <div className="text-[12px] font-medium text-[#222]">{a.name}</div>
                        <div className="text-[11px] text-[#222]">{a.type}</div>
                        <div className="flex items-center gap-3">
                          <Avatar src={a.courseImage} initials={a.courseInitials} size={32} />
                          <div>
                            <p className="text-[12px] text-[#222]">{a.course}</p>
                            <p className="text-[10px] text-[#929292]">{a.courseDetail}</p>
                          </div>
                        </div>
                        <div className="text-center text-[11px] text-[#222]">{a.passRate}%</div>
                        <div className="text-center text-[11px] text-[#222]">{a.averageScore}%</div>
                        <div className="text-center text-[11px] text-[#222]">{a.completion}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Pagination showingFrom={1} showingTo={5} total={89} itemLabel="Assessments" />
                <ExportPanel title="Export Assessment Report" defaultEmail="maryjohnson@gmail.com" />
              </>
            )}

            {tab === "Certificates" && (
              <>
                <h2 className="mt-6 text-[15px] font-medium text-[#161616]">Certificates Overview</h2>
                <div className="mt-4 flex gap-4">
                  <MiniStat icon={<BarChart3 size={16} className="text-[#08a24a]" />} label="Completion Rate" value={`${certificateOverview.completionRate}%`} valueColor="#08a24a" />
                  <MiniStat icon={<Award size={16} className="text-[#929292]" />} label="Certificates" value={certificateOverview.certificates} valueColor="#929292" />
                  <MiniStat icon={<Award size={16} className="text-[#929292]" />} label="Issued" value={certificateOverview.issued} valueColor="#929292" />
                  <MiniStat icon={<Award size={16} className="text-[#929292]" />} label="Pending" value={certificateOverview.pending} valueColor="#929292" />
                  <MiniStat icon={<Award size={16} className="text-[#929292]" />} label="Ineligible" value={certificateOverview.ineligible} valueColor="#929292" />
                </div>

                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[950px]">
                    <div className="grid grid-cols-[2fr_1fr_0.9fr_0.9fr_0.9fr_0.9fr] items-center bg-[#f3f3f3] px-4 py-3 text-[11px] font-semibold text-[#222]">
                      <div>Certificate</div>
                      <div>Instructors</div>
                      <div className="text-center">Course Status</div>
                      <div className="text-center">Certificates issued</div>
                      <div className="text-center">Course Completion</div>
                      <div className="text-center">Issued Date</div>
                    </div>

                    {certificateRows.map((c, i) => (
                      <div
                        key={i}
                        className="grid min-h-[62px] grid-cols-[2fr_1fr_0.9fr_0.9fr_0.9fr_0.9fr] items-center border-b border-[#ededed] px-4"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar src={c.image} initials={c.initials} size={32} />
                          <p className="text-[12px] text-[#222]">{c.name}</p>
                        </div>
                        <div className="text-[11px] text-[#222]">{c.instructor}</div>
                        <div className="flex justify-center">
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="text-center text-[11px] text-[#222]">{c.certificatesIssued}</div>
                        <div className="text-center text-[11px] text-[#222]">{c.courseCompletion}%</div>
                        <div className="text-center text-[11px] text-[#222]">{c.issuedDate}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <ExportPanel title="Export Certificate Report" defaultEmail="maryjohnson@gmail.com" />
              </>
            )}
          </section>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
