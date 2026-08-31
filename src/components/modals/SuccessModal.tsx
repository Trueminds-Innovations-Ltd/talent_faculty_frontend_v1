import { Check } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

export default function SuccessModal({
  open,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-[16px] bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#07863d]">
          <Check size={28} strokeWidth={2.5} className="text-[#07863d]" />
        </div>

        <h2 className="mt-6 text-[26px] font-bold text-[#161616]">{title}</h2>

        <p className="mt-3 text-[13px] leading-relaxed text-[#8a8a8a]">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onSecondary}
            className="h-12 flex-1 rounded-[10px] border border-[#e0e0e0] text-[13px] font-semibold text-[#161616] transition-colors hover:bg-[#f7f7f7]"
          >
            {secondaryLabel}
          </button>

          <button
            type="button"
            onClick={onPrimary}
            className="h-12 flex-1 rounded-[10px] bg-[#07863d] text-[13px] font-semibold text-white transition-colors hover:bg-[#067434]"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
