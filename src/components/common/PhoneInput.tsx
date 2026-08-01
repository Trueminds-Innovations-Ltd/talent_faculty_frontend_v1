import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import {
  getCountries,
  getCountryCallingCode,
  type Country as LibCountry,
} from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en'
import flags from 'react-phone-number-input/flags'

interface PhoneInputProps {
  label?: React.ReactNode
  error?: string
  value?: string
  placeholder?: string
  defaultCountry?: LibCountry
  onChange?: (value: string, country: LibCountry) => void
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  value = '',
  placeholder,
  defaultCountry = 'NG',
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<LibCountry>(
    defaultCountry
  )
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const allCountries = useMemo(() => getCountries(), [])

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allCountries
    return allCountries.filter((c) => {
      const name = (en[c] || c).toLowerCase()
      const dial = getCountryCallingCode(c)
      return name.includes(q) || dial.includes(q) || c.toLowerCase().includes(q)
    })
  }, [allCountries, search])

  const selectCountry = (country: LibCountry) => {
    setSelectedCountry(country)
    setOpen(false)
    setSearch('')
    onChange?.(value, country)
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCountries[highlightedIndex]) {
          selectCountry(filteredCountries[highlightedIndex])
        }
        break
      case 'Escape':
        setOpen(false)
        setSearch('')
        break
    }
  }

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[highlightedIndex] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, open])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    onChange?.(raw, selectedCountry)
  }

  const Flag = flags[selectedCountry]
  const dialCode = `+${getCountryCallingCode(selectedCountry)}`
  const countryName = en[selectedCountry] || selectedCountry

  return (
    <div className="w-full relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}

      <div className="flex gap-3">
        {/* Country selector */}
        <button
          type="button"
          onClick={() => {
            setOpen(!open)
            if (open) setSearch('')
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`
            h-12 min-w-[100px] rounded-xl border bg-white flex items-center
            justify-center gap-2 transition px-3 cursor-pointer
            ${error ? 'border-red-500' : 'border-neutral-300 hover:border-primary'}
          `}
        >
          {Flag && (
            <span className="w-6 h-4 flex items-center justify-center overflow-hidden">
              <Flag title={countryName} />
            </span>
          )}
          <span className="font-medium text-neutral-700 text-sm">{dialCode}</span>
          <ChevronDown
            size={16}
            className={`text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Phone input */}
        <input
          type="tel"
          inputMode="tel"
          value={value}
          placeholder={placeholder}
          onChange={handlePhoneChange}
          className={`
            flex-1 h-12 rounded-xl border bg-white px-4 text-sm text-neutral-700
            outline-none transition placeholder:text-neutral-400
            ${error ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/10'}
          `}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-[320px] rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-neutral-100">
            <div className="flex items-center rounded-lg border border-neutral-200 px-3 h-10 bg-neutral-50 focus-within:bg-white focus-within:border-primary transition">
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                ref={searchInputRef}
                placeholder="Search countries..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setHighlightedIndex(0)
                }}
                className="ml-2 flex-1 outline-none text-sm text-neutral-800 bg-transparent placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Countries list */}
          <div ref={listRef} className="max-h-72 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-neutral-400">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country, index) => {
                const CountryFlag = flags[country]
                const name = en[country] || country
                const code = `+${getCountryCallingCode(country)}`
                return (
                  <button
                    key={country}
                    type="button"
                    role="option"
                    aria-selected={country === selectedCountry}
                    onClick={() => selectCountry(country)}
                    className={`
                      w-full px-4 py-3 flex items-center justify-between transition
                      ${country === selectedCountry ? 'bg-primary/5' : ''}
                      ${index === highlightedIndex ? 'bg-neutral-100' : 'hover:bg-neutral-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-4 flex items-center justify-center overflow-hidden shrink-0">
                        {CountryFlag && <CountryFlag title={name} />}
                      </span>
                      <span className="text-sm text-neutral-700 truncate">
                        {name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-neutral-500 w-14 text-right shrink-0">
                      {code}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PhoneInput
