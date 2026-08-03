import React from 'react'

interface Segment {
  name: string
  value: number
  color: string
}

interface CompletionDonutProps {
  data: Segment[]
}

const CompletionDonut: React.FC<CompletionDonutProps> = ({ data }) => {
  const stops = data
    .reduce<{ start: number; parts: string[] }>(
      (acc, seg) => {
        const end = acc.start + seg.value
        acc.parts.push(`${seg.color} ${acc.start}% ${end}%`)
        return { start: end, parts: acc.parts }
      },
      { start: 0, parts: [] }
    )
    .parts.join(', ')

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Donut */}
      <div
        className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full transition-transform duration-300 hover:scale-105"
        style={{
          background: `conic-gradient(${stops})`,
        }}
      >
        <div className="absolute inset-[25%] rounded-full bg-white" />
      </div>

      {/* Legend */}
      <div className="w-full space-y-2">
        {data.map((seg) => (
          <div
            key={seg.name}
            className="relative flex items-center justify-between text-xs group cursor-pointer"
          >
            {/* Tooltip */}
            <div className="absolute left-0 -top-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
              <div className="rounded-lg bg-neutral-900 text-white px-3 py-2 shadow-lg whitespace-nowrap">
                <p className="font-semibold">{seg.name}</p>
                <p>{seg.value}% Complete</p>
              </div>

              <div className="ml-5 h-2 w-2 rotate-45 bg-neutral-900 -mt-1" />
            </div>

            <span className="flex items-center gap-2 text-neutral-500">
              <span
                className="h-4.5 w-4.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: seg.color,
                }}
              />
              {seg.name}
            </span>

            <span className="font-semibold text-neutral-700">
              {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompletionDonut