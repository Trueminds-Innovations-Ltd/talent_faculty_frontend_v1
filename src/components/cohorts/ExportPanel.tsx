import { useState } from "react";
import { Download, Mail } from "lucide-react";

const formats = ["CSV", "EXCEL (XLSX)", "PDF", "JSON"] as const;

export default function ExportPanel({
  title,
  defaultEmail,
  onExport,
}: {
  title: string;
  defaultEmail: string;
  onExport?: () => void;
}) {
  const [format, setFormat] = useState<(typeof formats)[number]>("EXCEL (XLSX)");
  const [sendToAdmin, setSendToAdmin] = useState(false);
  const [sendToCustom, setSendToCustom] = useState(false);

  return (
    <section className="mt-9 rounded-[11px] border border-[#e8e8e8] p-6">
      <h2 className="text-[15px] font-medium text-[#161616]">{title}</h2>
      <p className="mt-1 text-[11px] text-[#929292]">Select the file format for your report</p>

      <div className="mt-5 flex flex-wrap items-center gap-8">
        {formats.map((f) => (
          <label key={f} className="flex cursor-pointer items-center gap-2 text-[12px] text-[#222]">
            <input
              type="radio"
              name="export-format"
              checked={format === f}
              onChange={() => setFormat(f)}
              className="h-[15px] w-[15px] accent-[#07863d]"
            />
            {f}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-10">
        <label className="flex cursor-pointer items-center gap-3">
          <span
            onClick={() => setSendToAdmin((v) => !v)}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              sendToAdmin ? "bg-[#07863d]" : "bg-[#d9d9d9]"
            }`}
          >
            <span
              className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
                sendToAdmin ? "translate-x-[18px]" : "translate-x-[2px]"
              }`}
            />
          </span>
          <span>
            <span className="block text-[12px] font-medium text-[#222]">Send to Admin Email</span>
            <span className="block text-[10px] text-[#929292]">Send report to admin registered email</span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <span
            onClick={() => setSendToCustom((v) => !v)}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              sendToCustom ? "bg-[#07863d]" : "bg-[#d9d9d9]"
            }`}
          >
            <span
              className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
                sendToCustom ? "translate-x-[18px]" : "translate-x-[2px]"
              }`}
            />
          </span>
          <span className="text-[12px] font-medium text-[#222]">Send to Custom Email address</span>
        </label>

        <div className="flex h-10 items-center gap-2 rounded-[10px] border border-[#e0e0e0] px-3">
          <Mail size={14} className="text-[#929292]" />
          <input
            defaultValue={defaultEmail}
            className="w-[190px] bg-transparent text-[12px] text-[#222] outline-none"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onExport}
          className="flex h-11 items-center gap-2 rounded-[10px] bg-[#07863d] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#067434]"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </section>
  );
}
