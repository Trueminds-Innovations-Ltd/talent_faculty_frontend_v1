interface AvatarProps {
  src?: string;
  initials: string;
  size?: number;
  rounded?: "full" | "lg";
}

export default function Avatar({ src, initials, size = 36, rounded = "full" }: AvatarProps) {
  const radius = rounded === "full" ? "rounded-full" : "rounded-[10px]";
  const dimension = { width: size, height: size };

  if (src) {
    return (
      <img
        src={src}
        alt=""
        style={dimension}
        className={`shrink-0 object-cover ${radius}`}
      />
    );
  }

  return (
    <div
      style={dimension}
      className={`flex shrink-0 items-center justify-center ${radius} bg-[#dfe9e2] text-[9px] font-semibold text-[#087b3c]`}
    >
      {initials}
    </div>
  );
}
