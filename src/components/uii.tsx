import type { ReactNode } from "react";
import type { Member, TaskStatus } from "../types/types";

export const fmtDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-US", opts ?? { month: "short", day: "numeric", year: "numeric" });

export const Avatar = ({ member, size = 40 }: { member: Member; size?: number }) => (
  <img
    src={member.avatar}
    alt={member.name}
    style={{ width: size, height: size }}
    className="shrink-0 rounded-full bg-gray-200 object-cover ring-2 ring-white"
  />
);

export function AvatarStack({ members, max = 3, size = 32 }: { members: Member[]; max?: number; size?: number }) {
  const extra = members.length - max;
  return (
    <div className="flex items-center">
      {members.slice(0, max).map((m, i) => (
        <div key={m.id} className={i ? "-ml-2" : ""}>
          <Avatar member={m} size={size} />
        </div>
      ))}
      {extra > 0 && <span className="ml-1 text-[10px] text-black">+{extra}</span>}
    </div>
  );
}

export function ProgressRing({ value, size = 44 }: { value: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-primary/15" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} className="stroke-primary"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">{value}%</span>
    </div>
  );
}

const statusStyles: Record<TaskStatus | "Under Review", string> = {
  Completed: "bg-green-50 text-green-500",
  "In Progress": "bg-blue-50 text-blue-500",
  Pending: "bg-orange-50 text-orange-400",
  "Under Review": "bg-orange-50 text-orange-400",
};

export const StatusBadge = ({ status }: { status: TaskStatus | "Under Review" }) => (
  <span className={`inline-block rounded-full px-3 py-1.5 text-sm ${statusStyles[status]}`}>{status}</span>
);

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white p-6 ${className}`}>{children}</div>
);

export const PrimaryButton = ({ className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...p}
    className={`flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
  />
);

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center">{children}</div>
    </div>
  );
}
