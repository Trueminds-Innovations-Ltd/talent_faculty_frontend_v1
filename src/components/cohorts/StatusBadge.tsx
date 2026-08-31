type Status = "Completed" | "Active" | "Upcoming" | "Inactive" | "In Progress" | "Not Started";

const styles: Record<Status, string> = {
  Completed: "bg-[#dcefe6] text-[#008342]",
  Active: "bg-[#dfebff] text-[#377fff]",
  Upcoming: "bg-[#fff0d8] text-[#f29400]",
  Inactive: "bg-[#ececec] text-[#8a8a8a]",
  "In Progress": "bg-[#dfebff] text-[#377fff]",
  "Not Started": "bg-[#ececec] text-[#6b6b6b]",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-3 py-2 text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
