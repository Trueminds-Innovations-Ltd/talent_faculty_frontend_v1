import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string
  value: string | null
  options: string[]
  onChange: (value: string | null) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          value ? 'text-admin-primary bg-admin-primary-light' : 'text-admin-ash-2 hover:bg-admin-ash-7/60'
        }`}
      >
        {value ?? label}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-1 w-44 rounded-xl border border-admin-ash-7 bg-white py-1.5 shadow-lg">
          <button
            onClick={() => { onChange(null); setOpen(false) }}
            className="block w-full px-3 py-2 text-left text-sm text-admin-ash-2 hover:bg-admin-primary-light"
          >
            All {label}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`block w-full px-3 py-2 text-left text-sm hover:bg-admin-primary-light ${
                value === opt ? 'text-admin-primary font-semibold' : 'text-admin-ash-2'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
