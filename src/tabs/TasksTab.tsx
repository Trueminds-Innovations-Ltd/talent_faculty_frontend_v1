import { useMemo, useState } from "react";
import { ArrowDown2, FolderAdd, More, Sort } from "iconsax-react";
import type { Project, TaskStatus } from "../types/types";
import { CURRENT_USER_ID } from "../data/data";
import { Avatar, AvatarStack, StatusBadge, fmtDate } from "../components/uii";

const FILTERS: ("All Tasks" | TaskStatus)[] = ["All Tasks", "In Progress", "Pending", "Completed"];

export default function TasksTab({ project }: { project: Project }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All Tasks");
  const [sortBy, setSortBy] = useState<"dueDate" | "title">("dueDate");
  const isLead = project.members.find((m) => m.id === CURRENT_USER_ID)?.isLead ?? false;

  const count = (f: (typeof FILTERS)[number]) =>
    f === "All Tasks" ? project.tasks.length : project.tasks.filter((t) => t.status === f).length;

  const rows = useMemo(() => {
    const list = filter === "All Tasks" ? project.tasks : project.tasks.filter((t) => t.status === filter);
    return [...list].sort((a, b) => (sortBy === "title" ? a.title.localeCompare(b.title) : a.dueDate.localeCompare(b.dueDate)));
  }, [project.tasks, filter, sortBy]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${filter === f ? "bg-primary text-white" : "text-black hover:bg-black/5"}`}
            >
              {f} <span className="ml-1">{count(f)}</span>
            </button>
          ))}
        </div>
        <label className="relative flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-black">
          <Sort size={16} /> Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "dueDate" | "title")}
            className="appearance-none bg-transparent pr-6 text-black outline-none"
          >
            <option value="dueDate">Due Date</option>
            <option value="title">Task</option>
          </select>
          <ArrowDown2 size={14} className="pointer-events-none absolute right-3 text-black" />
        </label>
      </div>

      <table className="mt-6 w-full text-left text-sm text-black">
        <thead>
          <tr className="font-medium">
            {["Task", "Assigned To", "Due Date", "Status", "Action"].map((h) => (
              <th key={h} className="px-3 py-4 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const assignee = project.members.find((m) => m.id === t.assignedTo);
            return (
              <tr key={t.id}>
                <td className="px-3 py-4">
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-black">{t.description}</p>
                </td>
                <td className="px-3 py-4">
                  {assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar member={assignee} size={40} />
                      {assignee.name.split(" ")[0]}
                      {assignee.id === CURRENT_USER_ID && <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] text-black">You</span>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <AvatarStack members={project.members} max={5} size={40} /> Team
                    </div>
                  )}
                </td>
                <td className="px-3 py-4">{fmtDate(t.dueDate)}</td>
                <td className="px-3 py-4"><StatusBadge status={t.status} /></td>
                <td className="px-3 py-4">
                  <button aria-label="Task actions" className="p-2"><More size={22} color="#000000" className="rotate-90" /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          disabled={!isLead}
          className="flex items-center gap-2 rounded-xl bg-primary px-12 py-4 font-semibold text-white transition enabled:hover:opacity-90 disabled:opacity-40"
        >
          <FolderAdd size={20} color="#fff" /> Add Task
        </button>
        <p className="text-xs text-black">Only the team lead can add or edit tasks</p>
      </div>
    </div>
  );
}
