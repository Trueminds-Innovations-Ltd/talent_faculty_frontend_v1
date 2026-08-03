import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutGrid, Users, Bookmark, UsersRound, TrendingUp,
  Award, MessageSquare, Bell, User, LogOut, ChevronDown, ChevronUp, X,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'

interface SidebarProps {
  onLogoutClick: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const mainMenuItems = [
  { label: 'Dashboard', icon: <LayoutGrid size={20} />, path: '/admin/dashboard' },
  { label: 'Users', icon: <Users size={20} />, path: '/admin/users' },
  { label: 'Courses', icon: <Bookmark size={20} />, path: '/admin/courses' },
  { label: 'Cohorts', icon: <UsersRound size={20} />, path: '/admin/cohorts' },
  { label: 'Reports', icon: <TrendingUp size={20} />, path: '/admin/reports' },
  { label: 'Certificates', icon: <Award size={20} />, path: '/admin/certificates' },
  { label: 'Announcements', icon: <MessageSquare size={20} />, path: '/admin/announcements' },
  { label: 'Notifications', icon: <Bell size={20} />, path: '/admin/notifications' },
  { label: 'Profile', icon: <User size={20} />, path: '/admin/profile' },
]

const AdminSidebar: React.FC<SidebarProps> = ({ onLogoutClick, mobileOpen, onMobileClose }) => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(true)

  // Persist collapsed state in localStorage
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(collapsed))
  }, [collapsed])

  const isActive = (path: string) => location.pathname === path

  // Only close mobile sidebar on mobile viewport
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onMobileClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen bg-admin-primary-light flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-[84px]' : 'w-[250px] sm:w-[260px]'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2 px-5 py-6 ${collapsed ? 'lg:justify-center lg:px-3' : ''}`}>
          <Link to="/admin/dashboard" className="flex items-center overflow-hidden min-w-0">
            <img
              src="../logo1.png"
              alt="Talent Faculty logo"
              className={`h-18 object-contain transition-all duration-300 ${collapsed ? 'lg:h-8' : ''}`}
            />
          </Link>
          
          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex p-1.5 rounded-lg text-admin-ash-3 hover:text-admin-primary hover:bg-admin-primary/10 transition-all ${collapsed ? '' : 'ml-auto'}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden text-admin-ash-2 hover:text-admin-ink ml-auto"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {/* Main Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-admin-ash-4 uppercase tracking-wider hover:text-admin-ash-2 transition-colors ${collapsed ? 'lg:justify-center' : ''}`}
          >
            {menuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {!collapsed && <span>Main Menu</span>}
          </button>

          {menuOpen && (
            <div className="space-y-1 mt-1">
              {mainMenuItems.map((item) => {
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`
                      group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${collapsed ? 'lg:justify-center lg:px-2' : ''}
                      ${active
                        ? 'bg-admin-primary text-white shadow-sm'
                        : 'text-admin-ink hover:bg-admin-primary/10 hover:text-admin-primary'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>

                    <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
                      {item.label}
                    </span>

                    {collapsed && (
                      <span className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-admin-ink text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
                        {item.label}
                        <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-admin-ink rotate-45" />
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="my-3 border-t border-admin-primary-dark/10 mx-2" />

          <button
            onClick={() => { onLogoutClick(); handleNavClick() }}
            className={`
              group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
              text-admin-ink hover:bg-admin-danger-light hover:text-admin-danger transition-all duration-200 w-full text-left
              ${collapsed ? 'lg:justify-center lg:px-2' : ''}
            `}
          >
            <span className="flex-shrink-0"><LogOut size={20} /></span>
            <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
              Log Out
            </span>
            {collapsed && (
              <span className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-admin-ink text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
                Log Out
                <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-admin-ink rotate-45" />
              </span>
            )}
          </button>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar
