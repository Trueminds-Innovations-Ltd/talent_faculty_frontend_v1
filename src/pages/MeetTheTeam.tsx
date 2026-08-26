import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import CalltoAction from '../components/CalltoAction'
import Team from '../components/team'
import Hero from '../components/hero'

export default function MeetTheTeam() {
    return (
        <div className="relative min-h-screen bg-white text-black overflow-x-hidden flex flex-col justify-between">
            <TopNav />
            <Hero />
            <Team />
            <CalltoAction />
            <Footer />
        </div>
    )
}
