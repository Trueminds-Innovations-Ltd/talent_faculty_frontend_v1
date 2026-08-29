import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import CalltoAction from '../components/CalltoAction'
import Team from '../components/team'
import Herom from '../components/herom'

export default function MeetTheTeam() {
    return (
        <div className="relative min-h-screen bg-white text-black overflow-x-hidden flex flex-col justify-between">
            <TopNav />
            <Herom />
            <Team />
            <CalltoAction />
            <Footer />
        </div>
    )
}
