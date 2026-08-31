import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterButton({
  children,
  width,
}: {
  children: ReactNode;
  width: string;
}) {
  return (
    <button
      type="button"
      style={{ width }}
      className="flex h-9 shrink-0 items-center justify-between rounded-[10px] border border-[#e8e8e8] bg-white px-3 text-[11px] text-[#555]"
    >
      <span>{children}</span>
      <ChevronDown size={13} strokeWidth={1.8} />
    </button>
  );
}
