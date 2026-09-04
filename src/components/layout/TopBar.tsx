import React, { useState } from 'react'
import { Search, Bell, ChevronDown, Menu, User as UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface TopBarProps {
  title?: string
  subtitle?: string
  onMenuClick: () => void
  onLogoutClick?: () => void
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, onMenuClick, onLogoutClick }) => {
  const { user } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)

  const fullName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || 'Learner'
    : 'Samuel Johnson'
  const email = user?.email || 'samuel@example.com'

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 cursor-pointer">
            <Menu size={22} />
          </button>
          <div>
            {title && <h1 className="text-lg font-bold text-neutral-800">{title}</h1>}
            {subtitle && <p className="text-sm text-neutral-400 hidden sm:block">{subtitle}</p>}
          </div>
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
          <Link to="/notifications">
            <button className="relative p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </Link>
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:bg-neutral-50 rounded-full px-2 py-1 transition-colors cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                {user?.first_name ? (
                  <span className="text-primary font-bold text-xs uppercase">
                    {user.first_name[0]}
                    {user.last_name ? user.last_name[0] : ''}
                  </span>
                ) : (
                  <UserIcon size={16} className="text-primary" />
                )}
              </div>
              <ChevronDown size={16} className="text-neutral-400 hidden sm:block" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="text-sm font-bold text-neutral-800 truncate">{fullName}</p>
                    <p className="text-xs text-neutral-400 truncate">{email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      onLogoutClick?.()
                    }}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Log Out
                  </button>
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