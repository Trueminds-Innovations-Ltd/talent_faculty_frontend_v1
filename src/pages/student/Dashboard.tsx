import { useEffect, useState } from "react";
import StatsRow from "../../components/dash/StatsRow";
import ContinueLearningCard from "../../components/dash/ContinueLearningCard";
import StayOnTrack from "../../components/dash/StayOnTrack";
import EmptyState from "../../components/dash/EmptyState";
import FindNextCohort from "../../components/dash/FindNextCohort";
import TrackSelectionModal from "../../components/dash/TrackSelectionModal";
import ConfirmJoinModal from "../../components/dash/ConfirmJoinModal";
import SuccessModal from "../../components/dash/SuccessModal";
import CohortExplorer from "../../components/dash/CohortExplorer";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SearchingIllustration from "../../components/dash/SearchingIllustration";
import { useAuth } from "../../context/AuthContext";
import { dashboardService } from "../../services/dashboardService";
import { genericService } from "../../services/genericService";
import type { Cohort, Course, Track } from "../../types";
import {
  activeCourse,
  cohorts as initialCohorts,
  courses,
  newStudentStats,
  returningStats,
  student,
  tracks,
  upcomingAssessments,
  upcomingAssignments,
} from "../../data/mockData";

type JoinStep = "closed" | "track" | "confirm" | "success";
type View = "dashboard" | "explorer";

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [dashboardUserName, setDashboardUserName] = useState(
    user ? [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "Samuel" : student.name,
  );

  // New users should start in the onboarding state until they join a cohort.
  const [hasJoined, setHasJoined] = useState(false);
  const [joinedCohortId, setJoinedCohortId] = useState<string | number | null>(null);
  const [hasEnrolledCourse, setHasEnrolledCourse] = useState(false);
  const [hasStartedCourse, setHasStartedCourse] = useState(false);

  const [cohorts, setCohorts] = useState<Cohort[]>(initialCohorts);
  const [view, setView] = useState<View>("dashboard");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        const payload = Array.isArray(response?.data) ? response.data[0] : response?.data;
        const apiUser = payload?.user;

        if (apiUser) {
          const nextName = [apiUser.first_name, apiUser.last_name].filter(Boolean).join(" ") || apiUser.username || "Samuel";
          setDashboardUserName(nextName);

          if (user) {
            updateUser({
              first_name: apiUser.first_name || user.first_name,
              last_name: apiUser.last_name || user.last_name,
              username: apiUser.username || user.username,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    loadDashboardData();
  }, [updateUser, user]);

  useEffect(() => {
    const loadCohorts = async () => {
      try {
        const response = await genericService.getCohorts();
        const rawCohorts = Array.isArray(response?.data) ? response.data : [];

        if (rawCohorts.length > 0) {
          const mappedCohorts: Cohort[] = rawCohorts.map((cohort, index) => {
            const statusValue = String((cohort as { status?: string }).status ?? "").toLowerCase();
            const isActive = Boolean((cohort as { is_active?: boolean }).is_active);
            const startDate = (cohort as { start_date?: string }).start_date;
            const endDate = (cohort as { end_date?: string }).end_date;

            let status: Cohort["status"] = "upcoming";
            if (isActive || statusValue.includes("active") || statusValue.includes("in-session")) {
              status = "in-session";
            } else if (statusValue.includes("complete") || statusValue.includes("completed")) {
              status = "completed";
            } else {
              const now = new Date();
              const start = startDate ? new Date(startDate) : null;
              const end = endDate ? new Date(endDate) : null;

              if (start && end && now >= start && now <= end) {
                status = "in-session";
              } else if (start && now < start) {
                status = "upcoming";
              } else if (end && now > end) {
                status = "completed";
              } else if (index === 2) {
                status = "in-session";
              }
            }

            const code = (cohort as { code?: string }).code ?? `COHORT ${index + 1}`;
            const name = (cohort as { name?: string }).name ?? `Cohort ${index + 1}`;
            const description =
              (cohort as { description?: string }).description ??
              "Build practical skills and grow with your learning track.";

            return {
              id: String((cohort as { id?: string | number }).id ?? index + 1),
              code,
              name,
              description,
              status,
              opensLabel:
                status === "upcoming" && startDate
                  ? `Opens ${new Date(startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`
                  : undefined,
            };
          });

          setCohorts(mappedCohorts);
        }
      } catch (error) {
        console.error("Failed to load cohorts", error);
        setCohorts(initialCohorts);
      }
    };

    loadCohorts();
  }, []);

  const [joinStep, setJoinStep] = useState<JoinStep>("closed");
  const [joinCohort, setJoinCohort] = useState<Cohort | null>(null);
  const [joinTrack, setJoinTrack] = useState<Track | null>(null);

  const [enrolledCourse, setEnrolledCourse] = useState<Course | null>(null);

  const enrolledStats = {
    overallProgress: 0,
    presentCohort: "Jul - Sept",
    pendingAssignments: 0,
    assessmentAverage: 0,
    learningStreakDays: 0,
  };

  // Stats update once user has joined a cohort
  const stats = hasStartedCourse ? returningStats : hasEnrolledCourse ? enrolledStats : hasJoined ? returningStats : newStudentStats;

  const startCohortJoin = (cohort: Cohort) => {
    setJoinCohort(cohort);
    setJoinStep("track");
  };

  const confirmTrack = (track: Track) => {
    setJoinTrack(track);
    setJoinStep("confirm");
  };

  const finishJoin = () => {
    if (!joinCohort) return;
    setCohorts((prev) =>
      prev.map((c) => (c.id === joinCohort.id ? { ...c, status: "in-session" } : c)),
    );
    setJoinedCohortId(joinCohort.id);
    setJoinStep("success");
  };

  // "Go to My Cohort" - updates stats and unlocks Explore Cohorts, but does NOT show courses yet
  const closeJoinFlow = () => {
    setHasJoined(true);
    setJoinStep("closed");
    setJoinCohort(null);
    setJoinTrack(null);
  };

  // Called when user clicks Enroll on a course inside CohortExplorer
  const handleEnroll = (course: Course) => {
    setEnrolledCourse(course);
  };

  return (
    <DashboardLayout
      title={`Good Morning, ${dashboardUserName}`}
      subtitle="Continue your learning journey and stay on track!"
    >
      <div className="flex min-h-screen w-full bg-white">
        <main className="flex-1 space-y-8 px-1 md:px-8 py-8">
          {view === "dashboard" ? (
            <>
              <StatsRow stats={stats} />

              {!hasEnrolledCourse && (
                <EmptyState
                  title="Explore Courses"
                  ctaLabel={hasJoined ? "Explore Your Cohort" : "Find Your Next Course"}
                  footerNote={
                    hasJoined
                      ? "You've joined a cohort! Click above to explore and enroll in courses."
                      : "Nothing for now. Click the button above to start your learning journey."
                  }
                  onCtaClick={hasJoined ? () => setView("explorer") : undefined}
                />
              )}

              {hasEnrolledCourse && (
                <>
                  <ContinueLearningCard
                    course={activeCourse}
                    started={hasStartedCourse}
                    onAction={() => setHasStartedCourse(true)}
                  />

                  {hasStartedCourse ? (
                    <StayOnTrack
                      assignments={upcomingAssignments}
                      assessments={upcomingAssessments}
                    />
                  ) : (
                    <section className="space-y-4 pt-2">
                      <h2 className="text-lg font-bold text-slate-900">You&apos;re Just Getting Started</h2>
                      <p className="text-sm text-slate-500">
                        No assignments yet. Keep learning — it will show up here once available.
                      </p>

                      <div className="flex justify-center py-6">
                        <SearchingIllustration className="h-72 w-auto" />
                      </div>

                      <div className="flex justify-center">
                        <p className="rounded-full bg-slate-100 px-5 py-2 text-sm text-slate-500">
                          Nothing for now
                        </p>
                      </div>
                    </section>
                  )}
                </>
              )}

              <FindNextCohort
                cohorts={cohorts}
                onCohortAction={startCohortJoin}
                onExploreCohorts={hasJoined ? () => setView("explorer") : undefined}
                explorerDisabled={!hasJoined}
                joinedCohortId={joinedCohortId ?? undefined}
                onViewDetails={hasJoined ? () => setView("explorer") : undefined}
              />
            </>
          ) : (
            <CohortExplorer
              cohort={cohorts.find((c) => c.status === "in-session") ?? cohorts[0]}
              courses={courses}
              onGoBack={() => setView("dashboard")}
              onEnroll={handleEnroll}
            />
          )}
        </main>

        <TrackSelectionModal
          isOpen={joinStep === "track"}
          cohort={joinCohort}
          tracks={tracks}
          onCancel={closeJoinFlow}
          onContinue={confirmTrack}
        />

        <ConfirmJoinModal
          isOpen={joinStep === "confirm"}
          cohort={joinCohort}
          track={joinTrack}
          onGoBack={() => setJoinStep("track")}
          onConfirm={finishJoin}
        />

        <SuccessModal
          isOpen={joinStep === "success"}
          title="You're In!"
          message={`You've successfully joined the ${joinCohort?.name.replace(" Cohort", "")} cohort for ${joinTrack?.name}. Your learning journey starts here. Get ready to learn, build, and grow with other learners.`}
          ctaLabel="Go to My Cohort"
          onCta={closeJoinFlow}
        />

        <SuccessModal
          isOpen={enrolledCourse !== null}
          title="You're Enrolled!"
          message={`You've successfully enrolled in ${enrolledCourse?.title} under the July - September cohort. Your course is now part of your learning journey. You're all set to get started!`}
          ctaLabel="Start Learning"
          onCta={() => {
            setEnrolledCourse(null);
            setHasEnrolledCourse(true);
            setHasStartedCourse(false);
            setView("dashboard");
          }}
        />
      </div>
    </DashboardLayout>
  );
}
