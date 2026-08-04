import React, { useState } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TopBarProps {
  onMenuClick: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600">
            <Menu size={22} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-neutral-50 border border-neutral-100 rounded-full px-4 py-2 w-64">
            <Search size={16} className="text-neutral-400 mr-2" />
            <input
              type="text"
              placeholder="Search courses or lessons..."

              className="bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none w-full"
            />
          </div>
          <Link to='/notifications'>
            <button className="relative p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </Link>
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:bg-neutral-50 rounded-full px-2 py-1 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">SJ</span>
              </div>
              <ChevronDown size={16} className="text-neutral-400 hidden sm:block" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-sm font-semibold text-neutral-800">Samuel Johnson</p>
                    <p className="text-xs text-neutral-400">samuel@example.com</p>
                  </div>
                  <a className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Profile</a>
                  <a className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">Settings</a>
                  <div className="border-t border-neutral-100 mt-1" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Log Out</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar