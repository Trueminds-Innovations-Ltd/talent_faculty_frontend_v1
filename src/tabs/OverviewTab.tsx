import { Monitor, Edit2, LampCharge, Mobile, SearchNormal1, TickSquare } from "iconsax-react";
import type { Phase, Project } from "../types/types";
import { Avatar, Card, StatusBadge, fmtDate } from "../components/uii";

const icons: Record<Phase["icon"], typeof Monitor> = {
  research: SearchNormal1, ideation: LampCharge, design: Edit2, prototype: Mobile, presentation: Monitor,
};

function Brief({ project }: { project: Project }) {
  return (
    <Card className="p-8">
      <h2 className="text-xl text-black font-semibold">Project Brief</h2>
      <p className="mt-3 text-black">{project.brief}</p>
      <h2 className="mt-8 text-xl text-black font-semibold">Project Objectives</h2>
      <ul className="mt-4 space-y-3 text-black">
        {project.objectives.map((o) => (
          <li key={o} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-black" /> {o}
          </li>
        ))}
      </ul>
      {project.submittedAt && (
        <>
          <h2 className="mt-8 text-xl text-black font-semibold">Submission Status</h2>
          <div className="mt-3"><StatusBadge status="Under Review" /></div>
        </>
      )}
    </Card>
  );
}

export default function OverviewTab({ project }: { project: Project }) {
  if (project.submittedAt) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-6 py-5 font-semibold text-primary">
          <TickSquare size={22} variant="Bold" />
          Project submitted on {fmtDate(project.submittedAt, { month: "long", day: "numeric", year: "numeric" })} at{" "}
          {new Date(project.submittedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
          <Brief project={project} />
          <Card className="p-8">
            <h2 className="text-xl text-black font-semibold">Instructor's Feedback</h2>
            <p className="mt-3 text-black">{project.feedback ?? "No feedback yet."}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Brief project={project} />
        <Card className="p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl text-black font-semibold">Team Members</h2>
            <span className="text-sm text-black">{project.members.length - 1} members</span>
          </div>
          <ul className="mt-6 space-y-4 text-black">
            {project.members.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <Avatar member={m} size={48} />
                <div className="flex-1">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-black">{m.role}</p>
                </div>
                {m.isLead ? (
                  <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">Team Lead</span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-primary" aria-label="Active" />
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-8">
        <h2 className="text-xl text-black font-semibold">Project Timeline</h2>
        <ol className="relative mt-8 grid grid-cols-5">
          <div className="absolute left-0 right-0 top-6 h-1 -translate-y-1/2 bg-primary/10" />
          <div
            className="absolute left-0 top-6 h-1 -translate-y-1/2 bg-primary"
            style={{ width: `${(project.currentPhase / (project.phases.length - 1)) * 100}%` }}
          />
          {project.phases.map((ph, i) => {
            const Icon = icons[ph.icon];
            const done = i <= project.currentPhase;
            return (
              <li key={ph.label} className="relative flex flex-col items-center text-center">
                <span className={`z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${done ? "bg-primary text-white" : "bg-white text-black"}`}>
                  <Icon size={22} color="#000" />
                </span>
                <p className="mt-3 text-black font-medium">{ph.label}</p>
                <p className="mt-1 text-xs text-black">{ph.range}</p>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
