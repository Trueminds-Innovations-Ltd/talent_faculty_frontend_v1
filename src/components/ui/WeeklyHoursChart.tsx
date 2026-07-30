import React from 'react'

interface DayHours {
  day: string
  hours: number
  color: string
}

interface WeeklyHoursChartProps {
  data: DayHours[]
  maxScale?: number
}

const WeeklyHoursChart: React.FC<WeeklyHoursChartProps> = ({
  data,
  maxScale = 72,
}) => {
  const gridLines = [maxScale, (maxScale / 3) * 2, maxScale / 3, 0]

  return (
    <div className="flex gap-3">
      {/* Y axis */}
      <div className="flex flex-col justify-between text-xs text-neutral-400 h-56 pb-6 pt-1">
        {gridLines.map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 relative h-56">
        {/* Grid Lines */}
        <div className="absolute inset-0 bottom-6 flex flex-col justify-between">
          {gridLines.map((val) => (
            <div key={val} className="border-t border-neutral-100 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 bottom-6 flex items-end justify-between gap-2 sm:gap-3 px-1">
          {data.map((item) => (
            <div
              key={item.day}
              className="relative flex-1 h-full flex items-end justify-center group"
            >
              {/* Tooltip */}
              <div className="absolute bottom-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                <div className="rounded-lg bg-neutral-900 text-white px-3 py-2 text-xs shadow-lg whitespace-nowrap">
                  <p className="font-semibold">{item.day}</p>
                  <p>{item.hours} Hours</p>
                </div>

                <div className="mx-auto h-2 w-2 rotate-45 bg-neutral-900 -mt-1" />
              </div>

              <div
                className="w-12 rounded-t-md transition-all duration-300 hover:brightness-110 hover:scale-y-[1.02]"
                style={{
                  height: `${Math.min(100, (item.hours / maxScale) * 100)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          ))}
        </div>

        {/* X Axis */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between gap-2 sm:gap-3 px-1">
          {data.map((item) => (
            <span
              key={item.day}
              className="flex-1 text-center text-xs text-neutral-400"
            >
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyHoursChart