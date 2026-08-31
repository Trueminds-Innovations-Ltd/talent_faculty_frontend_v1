import { ShieldQuestion, TriangleAlert } from "lucide-react";

interface ConfirmActionModalProps {
  open: boolean;
  tone: "warning" | "danger";
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmActionModal({
  open,
  tone,
  title,
  description,
  confirmLabel,
  cancelLabel = "No, Go Back",
  onConfirm,
  onCancel,
}: ConfirmActionModalProps) {
  if (!open) return null;

  const Icon = tone === "danger" ? TriangleAlert : ShieldQuestion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-[16px] bg-white p-10 text-center shadow-xl">
        <Icon size={72} strokeWidth={1.3} className="mx-auto text-[#ff4141]" />

        <h2 className="mt-6 text-[26px] font-bold text-[#161616]">{title}</h2>

        <p className="mt-3 text-[13px] leading-relaxed text-[#8a8a8a]">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 flex-1 rounded-[10px] border border-[#e0e0e0] text-[13px] font-semibold text-[#161616] transition-colors hover:bg-[#f7f7f7]"
          >
            {confirmLabel}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="h-12 flex-1 rounded-[10px] bg-[#07863d] text-[13px] font-semibold text-white transition-colors hover:bg-[#067434]"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
