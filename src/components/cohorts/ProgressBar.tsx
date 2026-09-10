export default function ProgressBar({ value }: { value: number }) {
  const barColor = value === 0 ? "bg-[#ff4141]" : value >= 100 ? "bg-[#08a24a]" : "bg-[#4385ff]";

  return (
    <div className="flex items-center gap-2">
      <div className="h-[7px] w-[110px] overflow-hidden rounded-full bg-[#ececec]">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${Math.max(value, 3)}%` }}
        />
      </div>
      <span className="text-[10px] text-[#222]">{value}%</span>
    </div>
  );
}
