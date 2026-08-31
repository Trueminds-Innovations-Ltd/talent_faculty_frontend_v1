import React, { useMemo, useState } from 'react'
import { BookOpen, BookCheck, FileClock, Archive, ChartColumnBig, BookPlus, ListFilter, Pencil, Trash2, Ban, Search } from 'lucide-react'
import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'
import StatCard from '../../components/ui/admin/StatCard'
import Card from '../../components/common/admin/Card'
import PageActionButton from '../../components/common/admin/PageActionButton'
import FilterDropdown from '../../components/ui/admin/FilterDropdown'
import StatusBadge, { type CourseStatus } from '../../components/ui/admin/StatusBadge'
import Avatar from '../../components/ui/admin/Avatar'
import Pagination from '../../components/ui/admin/Pagination'

interface CourseRow {
  id: string
  course: string
  courseAvatar?: string
  instructor: string
  instructorAvatar?: string
  status: CourseStatus
  enrollees: number
  created: string
}

const avatars = ['./james.jpg', './rita.png', './supon.png']

const rawCourses: Array<Omit<CourseRow, 'courseAvatar' | 'instructorAvatar'>> = [
  { id: '1', course: 'Introduction to  Basix Computer Appreciation', instructor: 'Ogundele Isaac', status: 'Published', enrollees: 200, created: '2/3/26' },
  { id: '2', course: 'Introduction to Front End Development', instructor: 'Matthew Coker', status: 'Draft', enrollees: 245, created: '2/3/26' },
  { id: '3', course: 'GRaphic Design Bssics', instructor: 'Abdul FEmi', status: 'Archived', enrollees: 102, created: '2/3/26' },
  { id: '4', course: 'Web Development ESsentials', instructor: 'Ngozi Favour', status: 'Published', enrollees: 99, created: '2/3/26' },
  { id: '5', course: 'Time Mangement', instructor: 'John Akike', status: 'Draft', enrollees: 367, created: '2/3/26' },
  { id: '6', course: 'Understanidng Talent Faculty LMS', instructor: 'Trueminds INNovation', status: 'Published', enrollees: 2000, created: '2/3/26' },
  { id: '7', course: 'Advanced React Patterns', instructor: 'Chidera Obi', status: 'Published', enrollees: 154, created: '2/1/26' },
  { id: '8', course: 'UI/UX Design Fundamentals', instructor: 'Kelechi Nnamdi', status: 'Draft', enrollees: 88, created: '1/28/26' },
  { id: '9', course: 'Data Analysis with Python', instructor: 'Halima Bello', status: 'Published', enrollees: 312, created: '1/24/26' },
  { id: '10', course: 'Project Management Essentials', instructor: 'Tunde Bakare', status: 'Archived', enrollees: 76, created: '1/20/26' },
]

const allCourses: CourseRow[] = rawCourses.map((c, i) => ({
  ...c,
  courseAvatar: avatars[i % avatars.length],
  instructorAvatar: avatars[(i + 1) % avatars.length],
}))

const courseOverview = [
  { label: 'Total Courses', value: '102', delta: '+10', period: 'This Month', tone: 'blue' as const, icon: <BookOpen size={18} /> },
  { label: 'Total Published', value: '82', delta: '+4', period: 'In last 7 days', tone: 'green' as const, icon: <BookCheck size={18} /> },
  { label: 'Total Draft', value: '10', delta: '+2', period: 'This Month', tone: 'orange' as const, icon: <FileClock size={18} /> },
  { label: 'Total Archived', value: '10', delta: '+1', period: 'This Month', tone: 'red' as const, icon: <Archive size={18} /> },
]

const instructorOptions = Array.from(new Set(allCourses.map((c) => c.instructor)))
const statusOptions: CourseStatus[] = ['Published', 'Draft', 'Archived']

const Courses: React.FC = () => {
  const [courseFilter, setCourseFilter] = useState<string | null>(null)
  const [instructorFilter, setInstructorFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [selected, setSelected] = useState<string[]>([])

  const courseTitleOptions = useMemo(() => Array.from(new Set(allCourses.map((c) => c.course))), [])

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      if (courseFilter && c.course !== courseFilter) return false
      if (instructorFilter && c.instructor !== instructorFilter) return false
      if (statusFilter && c.status !== statusFilter) return false
      if (search && !`${c.course} ${c.instructor}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [courseFilter, instructorFilter, statusFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const hasFilters = Boolean(courseFilter || instructorFilter || statusFilter || search)

  const clearFilters = () => {
    setCourseFilter(null)
    setInstructorFilter(null)
    setStatusFilter(null)
    setSearch('')
    setPage(1)
  }

  const toggleAll = () => {
    if (selected.length === pageRows.length) setSelected([])
    else setSelected(pageRows.map((r) => r.id))
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <AdminDashboardLayout title="Course Management" subtitle="Continue to monitor the courses">
      <div className="space-y-6 max-w-[1400px] mx-auto">
        {/* Header actions */}
        <div className="flex justify-end gap-3 flex-wrap">
          <PageActionButton icon={<ChartColumnBig size={16} />} variant="outline">
            Generate Report
          </PageActionButton>
          <PageActionButton icon={<BookPlus size={16} />} variant="filled">
            Create Course
          </PageActionButton>
        </div>

        {/* Course Overview */}
        <section>
          <h2 className="text-base font-bold text-admin-ink mb-3">Course Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {courseOverview.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>
        </section>

        {/* Table card */}
        <Card bodyClassName="!px-0 !pb-0">
          {/* Filters row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
            <div className="flex items-center gap-1 flex-wrap">
              <FilterDropdown label="Course" value={courseFilter} options={courseTitleOptions} onChange={(v) => { setCourseFilter(v); setPage(1) }} />
              <FilterDropdown label="Instructor" value={instructorFilter} options={instructorOptions} onChange={(v) => { setInstructorFilter(v); setPage(1) }} />
              <FilterDropdown label="Status" value={statusFilter} options={statusOptions} onChange={(v) => { setStatusFilter(v); setPage(1) }} />
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-admin-ash-3 hover:text-admin-danger transition-colors"
                >
                  Clear filter <ListFilter size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center bg-admin-ash-7/40 border border-admin-ash-7 rounded-full px-4 py-2 w-full lg:w-72 shrink-0">
              <Search size={16} className="text-admin-ash-4 mr-2 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search users, courses or lessons..."
                className="bg-transparent text-sm text-admin-ash placeholder-admin-ash-4 outline-none w-full min-w-0"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="bg-admin-ash-7/40 text-left">
                  <th className="px-4 sm:px-5 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={pageRows.length > 0 && selected.length === pageRows.length}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded accent-admin-primary"
                    />
                  </th>
                  <th className="px-3 py-3 text-sm font-semibold text-admin-ash-1">Course</th>
                  <th className="px-3 py-3 text-sm font-semibold text-admin-ash-1">Instructor</th>
                  <th className="px-3 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
                  <th className="px-3 py-3 text-sm font-semibold text-admin-ash-1">Enrollees</th>
                  <th className="px-3 py-3 text-sm font-semibold text-admin-ash-1">Created</th>
                  <th className="px-3 sm:pr-5 py-3 text-sm font-semibold text-admin-ash-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                    <td className="px-4 sm:px-5 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleOne(row.id)}
                        className="h-4 w-4 rounded accent-admin-primary"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <Avatar name={row.course} src={row.courseAvatar} />
                        <span className="text-sm font-medium text-admin-ink">{row.course}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-[160px]">
                        <Avatar name={row.instructor} src={row.instructorAvatar} />
                        <span className="text-sm text-admin-ash-1">{row.instructor}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3"><StatusBadge status={row.status} /></td>
                    <td className="px-3 py-3 text-sm text-admin-ash-1">{row.enrollees}</td>
                    <td className="px-3 py-3 text-sm text-admin-ash-1">{row.created}</td>
                    <td className="px-3 sm:pr-5 py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-admin-info hover:text-admin-info/70" title="Edit"><Pencil size={16} /></button>
                        <button className="text-admin-danger hover:text-admin-danger/70" title="Delete"><Trash2 size={16} /></button>
                        <button className="text-admin-secondary hover:text-admin-secondary/70" title="Archive"><Ban size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-sm text-admin-ash-3">
                      No courses match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-5 pb-4">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              showingFrom={filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              showingTo={Math.min(currentPage * pageSize, filtered.length)}
              totalCount={filtered.length}
              pageSize={pageSize}
              onPageSizeChange={(size) => { setPageSize(size); setPage(1) }}
            />
          </div>
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}

export default Courses
