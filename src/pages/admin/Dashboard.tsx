import React from 'react'
import {
  Users, BookOpen, GraduationCap, Contact, UsersRound,
  Layers, Award, ClipboardList, ClipboardCheck,
  UserPlus, Megaphone, ChartColumnBig,
} from 'lucide-react'
import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'
import StatCard from '../../components/ui/admin/StatCard'
import ActivityCard from '../../components/ui/admin/ActivityCard'
import QuickLinkButton from '../../components/ui/admin/QuickLinkButton'
import ListRow from '../../components/ui/admin/ListRow'
import Card from '../../components/common/admin/Card'

const adminName = 'Samuel'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const platformOverview = [
  { label: 'Total Users', value: '2,346', delta: '+120', period: 'This Month', tone: 'blue' as const, icon: <Users size={18} /> },
  { label: 'Total Courses', value: '24', delta: '+4', period: 'This Month', tone: 'pink' as const, icon: <BookOpen size={18} /> },
  { label: 'Total Learners', value: '2,306', delta: '+118', period: 'In last 7 days', tone: 'green' as const, icon: <GraduationCap size={18} /> },
  { label: 'Total Mentors', value: '40', delta: '+2', period: 'This Month', tone: 'orange' as const, icon: <Contact size={18} /> },
  { label: 'Total Cohorts', value: '8', delta: '+0', period: 'This Month', tone: 'purple' as const, icon: <UsersRound size={18} /> },
]

const platformActivities = [
  { title: 'Active Users', subtitle: 'User logged in now', value: 406, icon: <Users size={18} /> },
  { title: 'Active Cohorts', subtitle: 'Running Cohorts', value: 2, icon: <Layers size={18} /> },
  { title: 'Active Courses', subtitle: 'Published Courses', value: 16, icon: <BookOpen size={18} /> },
  { title: 'Certificates Issued', subtitle: 'Total Generated', value: 800, icon: <Award size={18} /> },
  { title: 'Assignments Submitted', subtitle: 'Total this week', value: 23, icon: <ClipboardList size={18} /> },
  { title: 'Assessments Taken', subtitle: 'Total this week', value: 8, icon: <ClipboardCheck size={18} /> },
]

const quickLinks = [
  { label: 'Add User', tone: 'blue' as const, icon: <UserPlus size={20} /> },
  { label: 'Create Cohort', tone: 'purple' as const, icon: <UsersRound size={20} /> },
  { label: 'Create Announcemnet', tone: 'orange' as const, icon: <Megaphone size={20} /> },
  { label: 'Generate Report', tone: 'blue' as const, icon: <ChartColumnBig size={20} /> },
]

const recentActivities = [
  { text: 'Sarah completed Project Management', trailing: '2 Mins Ago', tone: 'blue' as const, icon: <BookOpen size={16} /> },
  { text: 'A new cohort was created', trailing: '10:45 am', tone: 'purple' as const, icon: <UsersRound size={16} /> },
  { text: 'A new cohort was created', trailing: '10:45 am', tone: 'purple' as const, icon: <UsersRound size={16} /> },
]

const pendingTasks = [
  { text: 'Courses waiting for approval', count: 2, tone: 'blue' as const, icon: <BookOpen size={16} /> },
  { text: 'Courses waiting for approval', count: 2, tone: 'blue' as const, icon: <BookOpen size={16} /> },
  { text: 'Courses waiting for approval', count: 2, tone: 'blue' as const, icon: <BookOpen size={16} /> },
  { text: 'Courses waiting for approval', count: 2, tone: 'blue' as const, icon: <BookOpen size={16} /> },
]

const SeeAllLink: React.FC = () => (
  <button className="text-sm font-semibold text-admin-primary hover:text-admin-primary-dark transition-colors">
    See all
  </button>
)

const Dashboard: React.FC = () => {
  return (
    <AdminDashboardLayout
      title={`${getGreeting()}, ${adminName} \uD83D\uDC4B`}
      subtitle="Continue to monitor the progress of the users and instructors!"
    >
      <div className="space-y-6 max-w-[1400px]">
        {/* Platform Overview */}
        <section>
          <h2 className="text-base font-bold text-admin-ink mb-3">Platform Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {platformOverview.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>
        </section>

        {/* Platform Activities */}
        <Card title="Platform Activities">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {platformActivities.map((item) => (
              <ActivityCard key={item.title} {...item} />
            ))}
          </div>
        </Card>

        {/* Quick Links */}
        <Card title="Quick Links">
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((item) => (
              <QuickLinkButton key={item.label} {...item} />
            ))}
          </div>
        </Card>

        {/* Recent Activities + Pending Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card title="Recent Activities" action={<SeeAllLink />}>
            <div>
              {recentActivities.map((item, i) => (
                <ListRow key={i} icon={item.icon} tone={item.tone} text={item.text} trailing={item.trailing} />
              ))}
            </div>
          </Card>

          <Card title="Pending Tasks" action={<SeeAllLink />}>
            <div>
              {pendingTasks.map((item, i) => (
                <ListRow key={i} icon={item.icon} tone={item.tone} text={item.text} trailing={`(${item.count})`} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

export default Dashboard
