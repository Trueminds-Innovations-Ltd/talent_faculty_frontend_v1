import { Pencil, Archive, Trash2 } from "lucide-react";

interface RowActionsProps {
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export default function RowActions({ onEdit, onArchive, onDelete }: RowActionsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Edit cohort"
        onClick={onEdit}
        className="text-[#4385ff] transition-opacity hover:opacity-60"
      >
        <Pencil size={15} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        aria-label="Archive cohort"
        onClick={onArchive}
        className="text-[#f0a000] transition-opacity hover:opacity-60"
      >
        <Archive size={15} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        aria-label="Delete cohort"
        onClick={onDelete}
        className="text-[#ff4141] transition-opacity hover:opacity-60"
      >
        <Trash2 size={15} strokeWidth={1.8} />
      </button>
    </div>
  );
}
