import React, { useState } from 'react'
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import DeliverableDetail from '../../components/ui/DeliverableDetail'

type TabKey = 'all' | 'pending' | 'submitted' | 'reviewed'

interface Deliverable {
  id: number
  title: string
  course: string
  dueDate: string
  status: 'pending' | 'submitted' | 'reviewed'
}

const initialDeliverables: Deliverable[] = [
  { id: 1, title: 'Landing Page Design', course: 'UI/UX Design', dueDate: 'Sept 25, 2026', status: 'pending' },
  { id: 2, title: 'User Research Report', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'pending' },
  { id: 3, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'pending' },
  { id: 4, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'pending' },
  { id: 5, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'pending' },
  { id: 6, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'pending' },
  { id: 7, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'submitted' },
  { id: 8, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Sept 28, 2026', status: 'reviewed' },
  { id: 9, title: 'Portfolio Case Study', course: 'UI/UX Design', dueDate: 'Oct 2, 2026', status: 'reviewed' },
]

const Deliverables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [courseFilter, setCourseFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('deadline')
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null)

  const counts = {
    all: initialDeliverables.length,
    pending: initialDeliverables.filter((d) => d.status === 'pending').length,
    submitted: initialDeliverables.filter((d) => d.status === 'submitted').length,
    reviewed: initialDeliverables.filter((d) => d.status === 'reviewed').length,
  }

  const filteredDeliverables = initialDeliverables.filter((item) => {
    const matchesTab = activeTab === 'all' || item.status === activeTab
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter
    return matchesTab && matchesCourse
  })

  const getStatusBadge = (status: Deliverable['status']) => {
    switch (status) {
      case 'pending':
        return <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#FFF8E7] text-[#D97706]">Pending</span>
      case 'submitted':
        return <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#3B82F6]">Submitted</span>
      case 'reviewed':
        return <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#067A46]">Reviewed</span>
    }
  }

  const getActionText = (status: Deliverable['status']) => {
    switch (status) {
      case 'pending':
        return 'Submit'
      case 'submitted':
        return 'View'
      case 'reviewed':
        return 'View Feedback'
    }
  }

  // Render detail view if a deliverable is selected
  if (selectedDeliverable) {
    return <DeliverableDetail onBack={() => setSelectedDeliverable(null)} />
  }

  return (
    <DashboardLayout
      title="Deliverables"
      subtitle="Submit your course work, projects and other required deliverables in one place."
    >
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#E8F5E9]/60 p-5 rounded-2xl border border-neutral-100">
            <p className="text-xs font-semibold text-[#067A46] mb-3">Total Deliverables</p>
            <span className="text-3xl font-bold text-[#067A46]">12</span>
          </div>

          <div className="bg-[#FDF2F2] p-5 rounded-2xl border border-neutral-100">
            <p className="text-xs font-semibold text-[#EF4444] mb-3">Pending</p>
            <span className="text-3xl font-bold text-[#EF4444]">{counts.pending}</span>
          </div>

          <div className="bg-[#EFF6FF] p-5 rounded-2xl border border-neutral-100">
            <p className="text-xs font-semibold text-[#3B82F6] mb-3">Submitted</p>
            <span className="text-3xl font-bold text-[#3B82F6]">{counts.submitted}</span>
          </div>

          <div className="bg-[#FFF7ED] p-5 rounded-2xl border border-neutral-100">
            <p className="text-xs font-semibold text-[#F97316] mb-3">Reviewed</p>
            <span className="text-3xl font-bold text-[#F97316]">{counts.reviewed}</span>
          </div>
        </div>

        {/* Tabs & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-8">
            {(['all', 'pending', 'submitted', 'reviewed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-medium transition-colors capitalize cursor-pointer ${
                  activeTab === tab ? 'text-[#067A46] font-bold' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab === 'all' ? 'All' : tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#067A46] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="appearance-none pl-9 pr-9 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-medium text-neutral-600 outline-none hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <option value="All">Filter by course</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pl-9 pr-9 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-medium text-neutral-600 outline-none hover:border-neutral-300 transition-colors cursor-pointer"
              >
                <option value="deadline">Sort by deadline</option>
                <option value="name">Sort by name</option>
              </select>
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Deliverables Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-2xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-neutral-100 text-xs font-bold text-neutral-800">
                <th className="py-3 px-2">Deliverable</th>
                <th className="py-3 px-2">Course</th>
                <th className="py-3 px-2">Due Date</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filteredDeliverables.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors text-sm">
                  <td className="py-4 px-2 font-medium text-neutral-800">{item.title}</td>
                  <td className="py-4 px-2 text-neutral-600">{item.course}</td>
                  <td className="py-4 px-2 text-neutral-600">{item.dueDate}</td>
                  <td className="py-4 px-2 text-center">{getStatusBadge(item.status)}</td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => setSelectedDeliverable(item)}
                      className="text-[#067A46] font-semibold text-sm hover:underline cursor-pointer"
                    >
                      {getActionText(item.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-400">
            <p>Showing 1 to 9 of 40 deliverables</p>

            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 transition-colors cursor-pointer">
                <ChevronLeft size={16} />
              </button>

              <button className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#067A46] font-bold flex items-center justify-center">
                1
              </button>

              <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-600 font-medium flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer">
                2
              </button>

              <span className="px-1 text-neutral-400">...</span>

              <button className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-600 font-medium flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer">
                43
              </button>

              <button className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </button>

              <div className="relative ml-2">
                <select className="appearance-none pl-3 pr-7 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs font-medium text-neutral-700 outline-none cursor-pointer">
                  <option>Last page</option>
                  <option>First page</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Deliverables