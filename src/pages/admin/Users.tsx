import { useState } from 'react'
import {
  Users,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  UserPlus,
  FileSpreadsheet,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Ban,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import AdminSidebar from '../../components/layout/admin/AdminSidebar'
import AdminTopBar from '../../components/layout/admin/AdminTopBar'

// Dummy user data matching your UI mock
const MOCK_USERS = [
  {
    id: '1',
    name: 'Adunola Elizabeth',
    email: 'eliz34@yahoomail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'Instructor',
    roleColor: 'text-amber-600',
    cohort: 'Batch 2',
    status: 'Active',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: '2',
    name: 'Musa Muhammad',
    email: 'amusaog@yahoomail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Administrator',
    roleColor: 'text-purple-600',
    cohort: '-',
    status: 'Active',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: '3',
    name: 'Kenneth Michael',
    email: 'ken4@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'Learner',
    roleColor: 'text-emerald-600',
    cohort: '-',
    status: 'Disabled',
    statusBg: 'bg-gray-400 text-white',
  },
  {
    id: '4',
    name: 'Ikediri Linus',
    email: 'Elkedi@yahoomail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    role: 'Administrator',
    roleColor: 'text-purple-600',
    cohort: 'Batch 2',
    status: 'Suspended',
    statusBg: 'bg-amber-200 text-amber-800',
  },
  {
    id: '5',
    name: 'Trueminds Innovations',
    email: 'admin@trueminds.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    role: 'Learner',
    roleColor: 'text-emerald-600',
    cohort: '-',
    status: 'Active',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
]

export default function AdminUsers() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'learners' | 'instructors' | 'administrators'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCohort, setSelectedCohort] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedProgramme, setSelectedProgramme] = useState('')

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCohort('')
    setSelectedRole('')
    setSelectedProgramme('')
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar Component */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TopBar Component */}
        <AdminTopBar
          title="Users Management"
          subtitle="Continue to monitor the progress of Users"
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 space-y-6 max-w-[1400px] mx-auto w-full">
          {/* Section 1: User Overview Cards */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">User Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Users */}
              <div className="bg-[#EEF2FF] p-5 rounded-2xl border border-blue-100/60 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <div className="p-2 bg-blue-100/80 rounded-lg text-blue-600">
                      <Users size={18} />
                    </div>
                    <span>Total Users</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">2,346</div>
                  <p className="text-xs font-semibold text-emerald-600">+120 <span className="text-gray-400 font-normal">This Month</span></p>
                </div>
              </div>

              {/* Total Admins */}
              <div className="bg-[#FDF4FF] p-5 rounded-2xl border border-purple-100/60 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <div className="p-2 bg-purple-100/80 rounded-lg text-purple-600">
                      <ShieldCheck size={18} />
                    </div>
                    <span>Total Admins</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">10</div>
                  <p className="text-xs font-semibold text-emerald-600">+4 <span className="text-gray-400 font-normal">This Month</span></p>
                </div>
              </div>

              {/* Total Learners */}
              <div className="bg-[#ECFDF5] p-5 rounded-2xl border border-emerald-100/60 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <div className="p-2 bg-emerald-100/80 rounded-lg text-emerald-600">
                      <GraduationCap size={18} />
                    </div>
                    <span>Total Learners</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">2,306</div>
                  <p className="text-xs font-semibold text-emerald-600">+118 <span className="text-gray-400 font-normal">In last 7 days</span></p>
                </div>
              </div>

              {/* Total Mentors */}
              <div className="bg-[#FFFBEB] p-5 rounded-2xl border border-amber-100/60 flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                    <div className="p-2 bg-amber-100/80 rounded-lg text-amber-600">
                      <UserCheck size={18} />
                    </div>
                    <span>Total Mentors</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">40</div>
                  <p className="text-xs font-semibold text-emerald-600">+2 <span className="text-gray-400 font-normal">This Month</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Quick Links */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Quick Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="p-3 bg-purple-50 rounded-full text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                  <UserPlus size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Administrator</span>
              </button>

              <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="p-3 bg-amber-50 rounded-full text-amber-600 mb-3 group-hover:scale-110 transition-transform">
                  <UserPlus size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Instructor</span>
              </button>

              <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                  <UserPlus size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Learner</span>
              </button>

              <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-sm transition-all group">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet size={22} />
                </div>
                <span className="text-sm font-medium text-gray-700">Generate Report</span>
              </button>
            </div>
          </section>

          {/* Section 3: Users Table & Filters */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Users</h2>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 space-x-8 text-sm font-medium max-lg:overflow-x-auto">
              {[
                { id: 'all', label: 'All Users' },
                { id: 'learners', label: 'Learners' },
                { id: 'instructors', label: 'Instructors' },
                { id: 'administrators', label: 'Administrators' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === tab.id
                    ? 'border-emerald-700 text-emerald-700 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="relative">
                  <select
                    value={selectedCohort}
                    onChange={(e) => setSelectedCohort(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-600 outline-none cursor-pointer hover:border-gray-300"
                  >
                    <option value="">Cohort</option>
                    <option value="batch-1">Batch 1</option>
                    <option value="batch-2">Batch 2</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-600 outline-none cursor-pointer hover:border-gray-300"
                  >
                    <option value="">Role</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrator</option>
                    <option value="learner">Learner</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedProgramme}
                    onChange={(e) => setSelectedProgramme(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-600 outline-none cursor-pointer hover:border-gray-300"
                  >
                    <option value="">Programme</option>
                    <option value="web-dev">Web Development</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 px-2 py-2 text-sm font-medium"
                >
                  Clear filter
                  <SlidersHorizontal size={14} />
                </button>
              </div>

              {/* Inline Search Bar */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full sm:w-72">
                <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search users, courses or lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 outline-none w-full"
                />
              </div>
            </div>

            {/* Users Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-100/70 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4 w-10">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    </th>
                    <th className="py-3 px-6">Users</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Cohort</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-6 font-semibold ${user.roleColor}`}>
                        {user.role}
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {user.cohort}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block ${user.statusBg}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3 text-blue-500">
                          <button className="hover:text-blue-700 transition-colors" title="Edit">
                            <Pencil size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                          <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Suspend/Block">
                            <Ban size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table Footer / Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 gap-4 text-xs text-gray-500">
                <span>Showing 1 to 5 of 2346</span>

                <div className="flex items-center gap-1">
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-400">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 font-bold">1</button>
                  <button className="px-3 py-1 rounded hover:bg-gray-100">2</button>
                  <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <ChevronRight size={16} />
                  </button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100 ml-1">43</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100 text-blue-600 font-medium">Last page</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}