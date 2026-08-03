import React, { useState } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TopBarProps {
  title?: string
  subtitle?: string
  onMenuClick: () => void
}

const AdminTopBar: React.FC<TopBarProps> = ({ title, subtitle, onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-admin-ash-7">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-admin-ash-7/60 text-admin-ash-2 shrink-0">
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            {title && <h1 className="text-base sm:text-lg font-bold text-primary truncate">{title}</h1>}
            {subtitle && <p className="text-xs sm:text-sm text-admin-ash-3 truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden md:flex items-center bg-admin-ash-7/40 border border-admin-ash-7 rounded-full px-4 py-2 w-56 lg:w-72">
            <Search size={16} className="text-admin-ash-4 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search users, courses or lessons..."
              className="bg-transparent text-sm text-admin-ash placeholder-admin-ash-4 outline-none w-full min-w-0"
            />
          </div>

          <button className="hidden sm:flex md:hidden p-2 rounded-full hover:bg-admin-ash-7/60 text-admin-ash-2">
            <Search size={20} />
          </button>

          <Link to="/admin/notifications">
            <button className="relative p-2 rounded-full hover:bg-admin-ash-7/60 text-admin-ash-2 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-admin-danger border-2 border-white" />
            </button>
          </Link>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1.5 hover:bg-admin-ash-7/40 rounded-full pl-1 pr-1.5 sm:pr-2 py-1 transition-colors"
            >
              <img
                src="../avatar.png"
                alt="Admin profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDown size={16} className="text-admin-ash-4 hidden sm:block" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-admin-ash-7 py-2 z-50">
                  <div className="px-4 py-2 border-b border-admin-ash-7">
                    <p className="text-sm font-semibold text-admin-ink">Samuel Johnson</p>
                    <p className="text-xs text-admin-ash-3">samuel@example.com</p>
                  </div>
                  <Link to="/admin/profile" className="block px-4 py-2 text-sm text-admin-ash-2 hover:bg-admin-ash-7/40">Profile</Link>
                  <a className="block px-4 py-2 text-sm text-admin-ash-2 hover:bg-admin-ash-7/40">Settings</a>
                  <div className="border-t border-admin-ash-7 mt-1" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-admin-danger hover:bg-admin-danger-light">Log Out</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminTopBar
