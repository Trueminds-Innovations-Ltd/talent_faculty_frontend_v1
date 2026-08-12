import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ChevronLeft,
  AlertTriangle, 
  FileText, 
  Eye, 
  CheckCircle2,
  Send,
  Video,
  ExternalLink,
  BellDot
} from 'lucide-react'

// Initial Mock Learners with dynamic Rubric breakdowns
const INITIAL_LEARNERS = [
  { 
    id: '1', 
    name: 'Blake Nguyen', 
    status: 'Graded', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=1', 
    rubric: { objectives: '18', targetUsers: '16', methods: '16', insights: '23', organization: '15' },
    feedback: 'Good work on user flows.' 
  },
  { 
    id: '2', 
    name: 'Morgan Diaz', 
    status: 'Pending', 
    isLate: true, 
    avatar: 'https://i.pravatar.cc/150?u=2', 
    rubric: { objectives: '18', targetUsers: '16', methods: '16', insights: '22', organization: '13' },
    feedback: 'Strong research approach and clear documentation.' 
  },
  { 
    id: '3', 
    name: 'Juno Silva', 
    status: 'Pending', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=3', 
    rubric: { objectives: '', targetUsers: '', methods: '', insights: '', organization: '' },
    feedback: '' 
  },
  { 
    id: '4', 
    name: 'Bilal Patel', 
    status: 'Graded', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=4', 
    rubric: { objectives: '20', targetUsers: '18', methods: '19', insights: '22', organization: '13' },
    feedback: 'Excellent interview methodology.' 
  },
  { 
    id: '5', 
    name: 'Kai Rivera', 
    status: 'Pending', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=5', 
    rubric: { objectives: '', targetUsers: '', methods: '', insights: '', organization: '' },
    feedback: '' 
  },
  { 
    id: '6', 
    name: 'Farid Okafor', 
    status: 'Graded', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=6', 
    rubric: { objectives: '15', targetUsers: '14', methods: '15', insights: '20', organization: '14' },
    feedback: 'Needs deeper insights.' 
  },
  { 
    id: '7', 
    name: 'Elena Ford', 
    status: 'Graded', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=7', 
    rubric: { objectives: '18', targetUsers: '18', methods: '18', insights: '22', organization: '14' },
    feedback: 'Good work on your user interviews.' 
  },
  { 
    id: '8', 
    name: 'Zion Chen', 
    status: 'Graded', 
    isLate: false, 
    avatar: 'https://i.pravatar.cc/150?u=8', 
    rubric: { objectives: '17', targetUsers: '16', methods: '17', insights: '22', organization: '13' },
    feedback: 'Solid submission.' 
  },
]

export default function AssignmentGrading() {
  const [learners, setLearners] = useState(INITIAL_LEARNERS)
  const [selectedLearnerId, setSelectedLearnerId] = useState('2') // Morgan Diaz
  const [isReleased, setIsReleased] = useState(false)

  // Toast & Modal States
  const [showSaveToast, setShowSaveToast] = useState(false)
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const [showReleaseToast, setShowReleaseToast] = useState(false)

  // Current Selected Learner
  const selectedLearner = learners.find(l => l.id === selectedLearnerId) || learners[0]

  // Form State bound to selected learner
  const [rubricScores, setRubricScores] = useState(selectedLearner.rubric)
  const [feedback, setFeedback] = useState(selectedLearner.feedback)
  const [notifyLearner, setNotifyLearner] = useState(true)

  // Auto-calculated total score
  const computedScore = 
    (Number(rubricScores.objectives) || 0) +
    (Number(rubricScores.targetUsers) || 0) +
    (Number(rubricScores.methods) || 0) +
    (Number(rubricScores.insights) || 0) +
    (Number(rubricScores.organization) || 0)

  // Calculate Progression Metrics dynamically
  const totalSubmissions = learners.length
  const pendingCount = learners.filter(l => l.status === 'Pending').length
  const gradedCount = learners.filter(l => l.status === 'Graded' || l.status === 'Released').length
  const isAllGraded = pendingCount === 0

  // Handle Rubric Score Change with strict limits
  const handleRubricChange = (field: keyof typeof rubricScores, value: string) => {
    const MAX_SCORES: Record<keyof typeof rubricScores, number> = {
      objectives: 20,
      targetUsers: 20,
      methods: 20,
      insights: 25,
      organization: 15
    }

    if (value !== '') {
      const numValue = Number(value)
      // Block input if it exceeds the max allowed percentage or drops below 0
      if (numValue > MAX_SCORES[field] || numValue < 0) return
    }

    setRubricScores(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle Learner Switch
  const handleSelectLearner = (learner: typeof learners[0]) => {
    setSelectedLearnerId(learner.id)
    setRubricScores(learner.rubric || { objectives: '', targetUsers: '', methods: '', insights: '', organization: '' })
    setFeedback(learner.feedback)
    setShowSaveToast(false)
  }

  // Action: Save or Update Grade
  const handleSaveGrade = () => {
    const updatedLearners = learners.map(l => {
      if (l.id === selectedLearnerId) {
        return {
          ...l,
          rubric: rubricScores,
          score: String(computedScore),
          feedback,
          status: isReleased ? 'Released' : 'Graded'
        }
      }
      return l
    })

    setLearners(updatedLearners)

    const remainingPending = updatedLearners.filter(l => l.status === 'Pending')

    setShowSaveToast(true)
    setTimeout(() => setShowSaveToast(false), 3000)

    // Auto-advance to next pending learner if any remain
    if (remainingPending.length > 0 && !isReleased) {
      setTimeout(() => handleSelectLearner(remainingPending[0]), 800)
    }
  }

  // Action: Confirm Release
  const handleConfirmRelease = () => {
    setShowReleaseModal(false)
    setIsReleased(true)
    
    // Mark all as Released
    setLearners(prev => prev.map(l => ({ ...l, status: 'Released' })))
    
    setShowReleaseToast(true)
    setTimeout(() => setShowReleaseToast(false), 5000)
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white relative">
        <main className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto relative">
          
          {/* Breadcrumb & Header */}
          <div className="mb-8 space-y-6 relative">
            <Link to="/instructor/assessments" className="flex items-center text-[13px] font-bold text-gray-800 hover:text-emerald-700 transition-colors w-max">
              <ChevronLeft size={16} className="mr-1" />
              Back to Assessment
            </Link>

            {/* Stage 3 Toast: Grades Released Success */}
            {showReleaseToast && (
              <div className="absolute top-0 right-0 flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.1)] rounded-xl z-20 animate-in fade-in slide-in-from-top-4">
                <CheckCircle2 className="text-[#0F833C]" size={22} />
                <span className="text-[13px] font-medium text-gray-700">Grades released successfully. Learners can now view their results.</span>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">UX Research Fundamentals</h1>
                <p className="text-[15px] text-gray-500">Module: {isAllGraded ? 'User Interview' : 'Research Planning & Strategy'}</p>
                <div className="flex items-center gap-4 text-[12px] font-medium text-gray-400 pt-1">
                  <span>{totalSubmissions} Submissions</span>
                  {!isAllGraded && <span>{pendingCount} Pending</span>}
                  <span>{gradedCount} Graded</span>
                  <span>Due: August 15, 2026</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Release Grades Button: Only appears when 100% graded and not yet released */}
                {isAllGraded && !isReleased && (
                  <button 
                    onClick={() => setShowReleaseModal(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F833C] rounded-lg text-[13px] font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    <Send size={14} />
                    Release Grades
                  </button>
                )}

                <button 
                  disabled={isAllGraded}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-bold border shadow-sm whitespace-nowrap transition-colors ${
                    isAllGraded 
                      ? 'bg-white border-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BellDot size={14} />
                  Send Reminders ({pendingCount})
                </button>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            
            {/* Left Column: Learners List */}
            <div className="w-full lg:w-[320px] shrink-0 space-y-4">
              <h2 className="text-[15px] font-bold text-gray-900">Learners ({totalSubmissions})</h2>
              
              <div className="border border-gray-200 rounded-xl bg-white overflow-hidden flex flex-col h-[700px]">
                <div className="overflow-y-auto flex-1 divide-y divide-gray-100 p-2 space-y-1">
                  {learners.map((learner) => {
                    const isSelected = selectedLearnerId === learner.id
                    return (
                      <div 
                        key={learner.id}
                        onClick={() => handleSelectLearner(learner)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'bg-orange-50/50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={learner.avatar} 
                            alt={learner.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className={`text-[13px] font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            {learner.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            learner.status === 'Pending' 
                              ? 'bg-orange-50 text-orange-500 border border-orange-100' 
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {learner.status}
                          </span>
                          
                          {learner.isLate && (
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold border border-red-200 text-red-500">
                              Late
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Grading Panel */}
            <div className="flex-1 w-full bg-white max-w-[800px] relative">
              
              {/* Stage 1 Toast: Save Grade Success */}
              {showSaveToast && (
                <div className="absolute -top-14 right-0 flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.1)] rounded-xl z-20 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="text-[#0F833C]" size={22} />
                  <span className="text-[13px] font-medium text-gray-700">Grade saved successfully. Moving to the next learner.</span>
                </div>
              )}

              {selectedLearner && (
                <div className="space-y-8">
                  {/* Learner Header */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedLearner.avatar} 
                      alt={selectedLearner.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <h2 className="text-xl font-bold text-gray-900">{selectedLearner.name}</h2>
                  </div>

                  {/* Assignment Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[17px] font-bold text-gray-900">
                        {isAllGraded ? 'User Interview Report (Assignment)' : 'UX Research Plan (Assignment)'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          selectedLearner.status === 'Pending' 
                            ? 'bg-orange-50 text-orange-500 border border-orange-100' 
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {selectedLearner.status}
                        </span>
                        {selectedLearner.isLate && (
                          <span className="px-3 py-1 border border-red-200 text-red-500 rounded-full text-[11px] font-bold">
                            Late
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-[13px] text-gray-500 space-y-1">
                      <p>Submitted: Aug 12, 2026 - 2:14 PM</p>
                      {!isAllGraded && <p>Due: Aug 8, 2026 - 11:59 PM</p>}
                    </div>

                    {selectedLearner.isLate && (
                      <div className="space-y-1 pt-2">
                        <div className="flex items-center gap-2 text-red-500">
                          <AlertTriangle size={16} />
                          <span className="text-[13px] font-bold">Late submission</span>
                        </div>
                        <p className="text-[13px] text-gray-500">
                          This submission was received after the deadline.<br/>
                          A 10% penalty will be applied to the final score.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* File Attachments */}
                  <div className="space-y-3">
                    <h4 className="text-[14px] font-bold text-gray-900">File</h4>
                    <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                      <div className="flex items-center gap-3 bg-gray-50 w-max px-4 py-2 rounded-lg border border-gray-100">
                        <FileText size={18} className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-700">
                          {isAllGraded ? 'User_Interview_Report.pdf' : 'UX_Research_Plan.PDF'}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-gray-700 transition-colors w-max">
                        <Eye size={16} />
                        Preview document
                      </button>
                    </div>

                    {isAllGraded && (
                      <>
                        <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                          <div className="flex items-center gap-3 bg-gray-50 w-max px-4 py-2 rounded-lg border border-gray-100">
                            <Video size={18} className="text-[#3B82F6]" />
                            <span className="text-[13px] font-bold text-gray-700">Interview_Recording.mp4</span>
                          </div>
                          <button className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-gray-700 transition-colors w-max">
                            <Eye size={16} />
                            Watch
                          </button>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                          <div className="flex items-center gap-3 bg-emerald-50 w-max px-4 py-2 rounded-lg border border-emerald-100">
                            <ExternalLink size={18} className="text-emerald-500" />
                            <span className="text-[13px] font-bold text-gray-700">Figma Affinity Board</span>
                          </div>
                          <button className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-gray-700 transition-colors w-max">
                            <ExternalLink size={16} />
                            Open link
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Scoring Section */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-900">Total score</label>
                      <div className="flex items-center gap-3 text-gray-400 text-lg font-medium">
                        <input 
                          type="number"
                          value={computedScore}
                          readOnly
                          placeholder="0"
                          disabled={isReleased}
                          className="w-20 px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-center text-gray-900 font-bold outline-none transition-all appearance-none disabled:bg-gray-50 disabled:text-gray-500 cursor-not-allowed"
                        />
                        <span>/ 100</span>
                      </div>
                    </div>

                    {/* Rubric */}
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-900">Rubric</label>
                      <div className={`border border-gray-200 bg-white rounded-xl p-6 relative ${isReleased ? 'opacity-80' : ''}`}>
                        <ul className="text-[13px] text-gray-600 space-y-3 font-medium">
                          <li className="flex items-center justify-between">
                            <span>&bull; Research Objectives (20%)</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                max="20"
                                min="0"
                                value={rubricScores.objectives}
                                onChange={(e) => handleRubricChange('objectives', e.target.value)}
                                disabled={isReleased}
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:bg-gray-50"
                              />
                              <span className="text-gray-400">%</span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>&bull; Target Users & Participant Selection (20%)</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                max="20"
                                min="0"
                                value={rubricScores.targetUsers}
                                onChange={(e) => handleRubricChange('targetUsers', e.target.value)}
                                disabled={isReleased}
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:bg-gray-50"
                              />
                              <span className="text-gray-400">%</span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>&bull; Research Methods & Interview Process (20%)</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                max="20"
                                min="0"
                                value={rubricScores.methods}
                                onChange={(e) => handleRubricChange('methods', e.target.value)}
                                disabled={isReleased}
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:bg-gray-50"
                              />
                              <span className="text-gray-400">%</span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>&bull; Insights & Findings (25%)</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                max="25"
                                min="0"
                                value={rubricScores.insights}
                                onChange={(e) => handleRubricChange('insights', e.target.value)}
                                disabled={isReleased}
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:bg-gray-50"
                              />
                              <span className="text-gray-400">%</span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>&bull; Organization & Clarity (15%)</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                max="15"
                                min="0"
                                value={rubricScores.organization}
                                onChange={(e) => handleRubricChange('organization', e.target.value)}
                                disabled={isReleased}
                                placeholder="0"
                                className="w-16 px-2 py-1 border border-gray-200 rounded-md text-center text-gray-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:bg-gray-50"
                              />
                              <span className="text-gray-400">%</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="space-y-2">
                      <label className="text-[14px] font-bold text-gray-900">Feedback</label>
                      <textarea 
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write feedback for the learner........"
                        disabled={isReleased}
                        className="w-full p-4 border border-gray-200 rounded-xl text-[13px] text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>

                    {/* Notify Toggle */}
                    <div className={`flex items-center justify-between py-2 ${isReleased ? 'opacity-80' : ''}`}>
                      <span className="text-[14px] font-bold text-gray-900">Notify learner after grade release</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifyLearner}
                          onChange={() => setNotifyLearner(!notifyLearner)}
                          disabled={isReleased}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F833C]"></div>
                      </label>
                    </div>

                    {!isReleased && (
                      <div className="pt-4 pb-12">
                        <button 
                          onClick={handleSaveGrade}
                          className="px-8 py-3 rounded-xl bg-[#0F833C] text-white text-[14px] font-bold hover:bg-emerald-700 transition-all shadow-sm"
                        >
                          {isAllGraded ? 'Update Grade' : 'Save Grade'}
                        </button>
                      </div>
                    )}

                    {isReleased && <div className="pt-4 pb-12 h-[70px]"></div>}

                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showReleaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-[22px] font-extrabold text-center text-gray-900 mb-3">
              Release assignment grades?
            </h3>
            <p className="text-[14px] text-center text-gray-500 mb-5 leading-relaxed px-2">
              All submissions have been graded and final scores are ready to be released. Learners will be able to view their grades and feedback once released.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#D97706] text-[13px] font-bold mb-8">
              <AlertTriangle size={16} />
              <span>This action cannot be undone.</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowReleaseModal(false)}
                className="flex-1 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRelease}
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#0F833C] text-white text-[14px] font-bold hover:bg-emerald-700 transition-colors"
              >
                Yes, Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}