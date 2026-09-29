import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import { getProject, CURRENT_USER_ID } from "../data/data";
import DashboardLayout from "../components/layout/DashboardLayout";
import OverviewTab from "../tabs/OverviewTab";
import TasksTab from "../tabs/TasksTab";
import FilesTab from "../tabs/FilesTab";
import DiscussionsTab from "../tabs/DiscussionsTab";

const TABS = ["Overview", "Tasks", "Files", "Discussions"] as const;
type Tab = (typeof TABS)[number];

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Overview");
  const project = getProject(projectId);

  if (!project) return (
    <DashboardLayout title="Project Details">
      <p className="p-8">Project not found.</p>
    </DashboardLayout>
  );

  const isLead = project.members.find((m) => m.id === CURRENT_USER_ID)?.isLead ?? false;

  // Final submission unlocks at 100% and only until it has been submitted, for team lead only.
  const canSubmit = project.progress === 100 && !project.submittedAt && isLead;

  return (
    <DashboardLayout title={project.title} subtitle={`${project.track} • ${project.cohort}`}>
      <div className="space-y-6">
        <button onClick={() => navigate("/group-projects")} className="flex items-center gap-2 text-black rounded-full bg-gray-100 px-4 py-2.5 text-sm font-medium">
          <ArrowLeft size={18} color="#000" /> Go back
        </button>

        <div className="mt-6 flex flex-wrap items-start gap-8">
          <div>
            <h1 className="text-2xl font-semibold text-primary">{project.title}</h1>
            <p className="mt-2 text-sm text-black">{project.track} <span className="mx-2">•</span> {project.cohort}</p>
          </div>

          <div className="min-w-[280px] flex-1 max-w-sm">
            <div className="flex justify-between text-sm text-black">
              <span className="font-medium">Project Progress</span>
              <span className="text-primary">{project.progress}% Complete</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-primary/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
            </div>
          </div>

          <div className="ml-auto flex flex-col items-end gap-1">
            <button
              disabled={!canSubmit}
              onClick={() => navigate(`/group-projects/${project.id}/submit`)}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition enabled:hover:opacity-90 disabled:opacity-30"
              title={!isLead ? "Only the team lead can submit the final project" : undefined}
            >
              <ArrowRight size={20} color="#fff" /> Submit Final Project
            </button>
            {!isLead && !project.submittedAt && (
              <p className="text-xs text-black">Only the team lead can submit</p>
            )}
          </div>
        </div>

        <div role="tablist" className="mt-8 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-3 font-medium transition ${tab === t ? "border-primary text-primary" : "border-transparent text-black/60 hover:text-black"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "Overview" && <OverviewTab project={project} />}
          {tab === "Tasks" && <TasksTab project={project} />}
          {tab === "Files" && <FilesTab project={project} />}
          {tab === "Discussions" && <DiscussionsTab project={project} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
