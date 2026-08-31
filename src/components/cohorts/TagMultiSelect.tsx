import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface TagOption {
  id: string;
  label: string;
  sublabel?: string;
  initials?: string;
}

interface TagMultiSelectProps {
  placeholder: string;
  options: TagOption[];
  selected: TagOption[];
  onChange: (next: TagOption[]) => void;
  columns?: 1 | 2;
}

export default function TagMultiSelect({
  placeholder,
  options,
  selected,
  onChange,
  columns = 2,
}: TagMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const availableOptions = options.filter(
    (o) => o.label.toLowerCase().includes(query.toLowerCase())
  );

  const toggleOption = (option: TagOption) => {
    const exists = selected.some((s) => s.id === option.id);
    onChange(exists ? selected.filter((s) => s.id !== option.id) : [...selected, option]);
  };

  const removeOption = (id: string) => {
    onChange(selected.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-full items-center justify-between rounded-[10px] border border-[#e0e0e0] px-3 text-left text-[12px] text-[#929292]"
        >
          {placeholder}
          <ChevronDown size={14} />
        </button>

        {open && (
          <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-[10px] border border-[#e0e0e0] bg-white p-2 shadow-lg">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="mb-2 w-full rounded-[8px] border border-[#ededed] px-2 py-1.5 text-[12px] outline-none"
            />
            {availableOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option)}
                className="flex w-full items-center justify-between rounded-[8px] px-2 py-1.5 text-left text-[12px] hover:bg-[#f4f4f4]"
              >
                <span>
                  {option.label}
                  {option.sublabel && (
                    <span className="ml-1 text-[10px] text-[#929292]">{option.sublabel}</span>
                  )}
                </span>
                {selected.some((s) => s.id === option.id) && (
                  <span className="text-[#07863d]">✓</span>
                )}
              </button>
            ))}
            {availableOptions.length === 0 && (
              <p className="px-2 py-1.5 text-[12px] text-[#929292]">No matches</p>
            )}
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className={`mt-3 grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {selected.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between rounded-[10px] border border-[#ededed] px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-[#222]">{option.label}</p>
                {option.sublabel && (
                  <p className="truncate text-[10px] text-[#929292]">{option.sublabel}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="ml-2 shrink-0 text-[#929292] hover:text-[#ff4141]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
