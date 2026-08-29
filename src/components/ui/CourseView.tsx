import { useState } from 'react'
// import { PlayCricle } from 'iconsax-react'
import { ChevronLeft, Minimize2, Play, Download, NotebookPen, Share2, ChevronDown, CheckCircle2, PlayCircle, Circle, Pause } from 'lucide-react'
interface CourseViewProps {
  course: {
    title: string
    instructor: string
  }
}
interface LectureItem {
  id: number
  title: string
  duration: string
  status: 'completed' | 'playing' | 'upcoming'
}

const lectures: LectureItem[] = [
  { id: 1, title: 'Fundamental principles of Prototyping in UI/UX Design', duration: '12:00', status: 'completed' },
  { id: 2, title: 'Animations & Motion Graphics in UI/UX Design', duration: '26:00', status: 'playing' },
  { id: 3, title: 'Capstone Project 2', duration: '03:00', status: 'upcoming' },
]

const tabItems = [
  { id: 'overview', label: 'Course Overview' },
  { id: 'transcript', label: 'Live Transcript' },
  { id: 'resources', label: 'Resources' }
]

const transcriptData = [
  {
    id: 1,
    timestamp: '00:00 — Introduction',
    text: "Welcome to this course on UI Animation and Motion Graphics. In this lesson, we’ll explore how motion can transform a static interface into an experience that feels responsive, intuitive, and alive."
  },
  {
    id: 2,
    timestamp: '02:15 — Why Motion Matters in UI/UX',
    text: "Animation isn't just about making a design look beautiful. Good motion communicates what is happening, guides attention, and helps users understand changes within an interface."
  },
  {
    id: 3,
    timestamp: '05:40 — Understanding Timing & Easing',
    text: "One of the first things you need to understand as a UI designer is timing. An animation that moves too slowly can feel frustrating, while one that moves too quickly can feel abrupt. Easing helps us make that movement feel more natural."
  },
  {
    id: 4,
    timestamp: '09:25 — Micro-interactions',
    text: "Think about what happens when you tap a button, submit a form, or switch a toggle. Those tiny responses are micro-interactions. They give users feedback and reassure them that their action has been recognised."
  }
]


function CourseView({ course }: CourseViewProps) {
  const [showNotes, setShowNotes] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [playStatus, setPlayStatus] =useState('play')
  return (
    <div className="w-full space-y-6">
      <div className="relative h-[363px] w-full">
        <img src="./course-image.jpg" className=" h-[363px] w-full object-cover rounded-[16px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img src="./Ellipse 1.png" className="w-[80px] h-[80px]" />
          <div className="absolute flex items-center justify-center pl-[4px]">
            <Play size={24} fill="#F57C00" className="text-[#F57C00]" />
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          {/* Left Button */}
          <button className="flex items-center justify-center w-[48px] h-[48px] rounded-[34px] bg-white/25 hover:bg-white/35 backdrop-blur-sm text-white transition-colors">
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button className="flex items-center justify-center w-[48px] h-[48px] rounded-[34px] bg-white/25 hover:bg-white/35 backdrop-blur-sm text-white transition-colors">
            <Minimize2 size={24} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between gap-4">
          <span className="text-[16px] font-medium text-white/90 font-mono select-none w-[44px] h-[24px]">
            04:32
          </span>
          {/* Interactive Progress Track Line */}
          <div className="flex-1 relative h-[37px] flex items-center cursor-pointer group">
            <div className=" w-full bg-white h-[6px] rounded-[3px] overflow-hidden relative">
              {/* Green Active Progress Bar*/}
              <div className="absolute top-0 left-0 h-full bg-[#057834] w-[104px]" />
            </div>
            <div className="absolute w-[16px] h-[16px] bg-[#057834] border-2 border-white rounded-full left-[104px]" />
          </div>
          <span className="text-[12px] font-medium text-white/90 font-mono select-none">
            26:00
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] ">
        <div>
          <p className="text-[#808080] text-[16px] w-[128px]">Lecture 24 of 38</p>
          <h3 className="font-[600] text-[24px] text-black">{course.title}</h3>
          <p className="text-[#808080] font-[400] text-[16px]">Course by: <span className="text-[#3B82F6] border-b">{course.instructor}</span></p>
        </div>
        <div className="flex gap-[24px]">
          <button className="flex border border-[#D1D1D1] py-[15px] px-[20px] rounded-[16px] gap-[10px] font-[600] text-black">
            <Download size={24} />
            Download Course
          </button>
          {<button onClick={() => setShowNotes(!showNotes)}
            className={`flex py-[15px] px-[20px] rounded-[16px] gap-[10px] font-[600] transition-colors ${showNotes ? "bg-[#057834] border-[#057834] text-white" : "border border-[#D1D1D1] text-black hover:bg-neutral-50 "}`}>
            <NotebookPen size={24} />
            Add Notes
          </button>}
          <button className="flex border border-[#D1D1D1] py-[15px] px-[20px] rounded-[16px] gap-[10px] font-[600] text-black">
            <Share2 />
            Share Course
          </button>
        </div>
        {showNotes && (
          <div className="w-full p-4">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="write your notes here..."
              className="w-full gap-[10px] rounded-[16px] h-[142px] text-[16px] text-black border border-[#999999] p-4"
            />
          </div>
        )}
      </div>
      {/* Map through tabItem  */}
      <div className="flex">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-[15px] gap-[10px] font-[600] text-[16px] transition-colors ${activeTab === tab.id ? " text-[#057834] border-b-2 border-[#057834] " : "text-[#999999]"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Conditionally render tab content */}
      <div className="w-full ">
        {activeTab === 'overview' && (
          <p className="font-[400] text-[16px] text-black h-[72px] ">
            Learn how to use animation and motion to create engaging, intuitive, and memorable digital experiences. This course covers micro-interactions, transitions, motion principles, and practical techniques for bringing UI designs to life while maintaining usability and consistency.
          </p>
        )}
        {activeTab === 'transcript' && (
          <div className="flex flex-col gap-[24px]">
            {transcriptData.map((item) => (
              <div className="flex flex-col gap-[10px] ">
                <h4 className="text-[16px] font-[600] gap-[8px] text-black">
                  {item.timestamp}
                </h4>
                <p className="text-[14px] font-[400] text-black">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'resources' && (
          <div className="h-[59px] gap-[8px] ">
            <h2 className="font-[500] text-[18px] text-black">
              UI Animation & Motion Graphics Resources
            </h2>
            <p className=" font-[400] text-[16px] text-[#3B82F6] border-b-[#3B82F6] ">drive.google.com/drive/folders/...</p>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col">
        {lectures.map((lecture) => {
          const isPlaying = lecture.status === 'playing'
          const isCompleted = lecture.status === 'completed'

          return (
            <div
              key={lecture.id}
              className={`w-full h-[94px] px-6 flex items-center justify-between    transition-colors rounded-[16px] ${isPlaying ? 'bg-[#EBF5EE]' : 'bg-white'
                }`}
            >
              {/* Left Content Area: Status Circle and Details */}
              <div className="flex items-center gap-4">
                {/* Conditional status icons mapping perfectly */}
                {isCompleted && <CheckCircle2 size={24} className="text-white fill-[#057834]" />}
                {isPlaying && <div className="w-[24px] h-[24px] rounded-full bg-[#057834] flex items-center justify-center pl-[2px]">
                  <Pause size={12} className="text-white fill-white" />
                </div>}
                {!isCompleted && !isPlaying && <Circle className="text-neutral-300" size={24} />}

                {/* Stacked labels */}
                <div className="flex flex-col gap-1">
                  <span className={`text-[16px] font-medium ${isPlaying ? 'text-[#057834]' : 'text-neutral-700'}`}>
                    {lecture.title}
                  </span>
                  <span className="text-[12px] text-neutral-400 font-mono">
                    {lecture.duration}
                  </span>
                </div>
              </div>

              {/* Right Action Callouts matching your design states */}
              {isPlaying ? (
                <button className="w-[135px] h-[48px] rounded-[12px] bg-[#057834] text-white text-[14px] font-semibold flex items-center justify-center">
                  Playing Now
                </button>
              ) : (
                <button className="w-[112px] h-[48px] rounded-[12px] border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-[14px] font-semibold flex items-center justify-center gap-2">
                  <Play size={16} className="text-neutral-800" />
                  <span>Replay</span>
                </button>
              )}

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CourseView
