import { useNavigate } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { projects, CURRENT_USER_ID } from "../../data/data";
import { AvatarStack, ProgressRing, fmtDate } from "../../components/uii";

const stats = [
  { label: "Active Projects", value: 2, box: "border-primary/20 bg-primary/5", text: "text-primary" },
  { label: "Due Soon", value: 2, box: "border-red-200 bg-red-50", text: "text-red-500" },
  { label: "My Tasks", value: 5, box: "border-blue-200 bg-blue-50", text: "text-blue-500" },
  { label: "Completed", value: 8, box: "border-orange-200 bg-orange-50", text: "text-orange-500" },
];

export default function GroupProjects() {
  const navigate = useNavigate();
  return (
    <DashboardLayout title="Group Projects" subtitle="Work with your team, track your tasks and bring your project to life.">
      <div className="space-y-6">
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-2xl border p-5 ${s.box}`}>
              <p className={`text-sm ${s.text}`}>{s.label}</p>
              <p className={`mt-4 text-2xl font-bold ${s.text}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => {
            const remaining = p.tasks.filter((t) => t.status !== "Completed" && (t.assignedTo === CURRENT_USER_ID || t.assignedTo === "team")).length;
            return (
              <div key={p.id} className="rounded-3xl bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl text-black font-semibold">{p.title}</h2>
                <p className="mt-2 text-black">{p.track} · {p.cohort}</p>

                <div className="mt-6 flex items-center text-black justify-between">
                  <AvatarStack members={p.members} />
                  <ProgressRing value={p.progress} />
                </div>

                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-[10px] text-black">Deadline</p>
                    <p className="mt-1 text-black">{fmtDate(p.deadline, { month: "long", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <div className="h-8 w-px bg-black" />
                  <div>
                    <p className="text-[10px] text-black">Your Tasks</p>
                    <p className="mt-1 text-black">{remaining || 2} remaining</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/group-projects/${p.id}`)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white transition hover:opacity-90"
                >
                  <ArrowRight size={20} color="#fff" /> Open Project
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
