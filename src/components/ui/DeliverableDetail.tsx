import React, { useState } from 'react'
import { 
  ChevronLeft, 
  Download, 
  Calendar, 
  Star, 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react'
import DashboardLayout from '../layout/DashboardLayout'

interface DeliverableDetailProps {
  onBack?: () => void
}

export default function DeliverableDetail({ onBack }: DeliverableDetailProps) {
  // Flow States: 'pending' | 'confirming' | 'success_modal' | 'submitted'
  const [flowState, setFlowState] = useState<'pending' | 'confirming' | 'success_modal' | 'submitted'>('pending')

  // Form Fields
  const [link, setLink] = useState('')
  const [note, setNote] = useState('')
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null)

  // Triggered on "Submit Deliverable" click
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault()
    setFlowState('confirming')
  }

  // Action inside Confirmation Modal
  const handleConfirmSubmit = () => {
    if (!uploadedFile) {
      setUploadedFile({
        name: 'Landing Page Design.fig',
        size: '12.4MB',
        type: 'Figma file'
      })
    }
    if (!note) {
      setNote("I focused on creating and responsive layout while keeping the product's primary CTA prominent. Feedback is highly appreciated.")
    }
    if (!link) {
      setLink('https://figma.com/file/sample-landing-page')
    }
    setFlowState('success_modal')
  }

  const isSubmitted = flowState === 'submitted'

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans text-neutral-800">
        
        {/* Navigation Bar & Status Badge */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            Go back
          </button>

          {isSubmitted ? (
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#067A46]">
              Deliverable Submitted
            </span>
          ) : (
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF8E7] text-[#D97706]">
              Pending Submission
            </span>
          )}
        </div>

        {/* Deliverable Title & Cohort info */}
        <div>
          <h1 className="text-2xl font-bold text-[#067A46]">Landing Page Design</h1>
          <p className="text-xs font-medium text-neutral-400 mt-1">
            UI/UX Design <span className="mx-1">•</span> Cohort 3
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Deliverable Details */}
          <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xs">
            
            {/* About Section */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-neutral-900">About this Deliverable</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Design a responsive landing page for a fictional product using the design principles covered in this module.
              </p>
            </div>

            {/* Download Brief Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-neutral-100 bg-neutral-50/50">
              <div>
                <p className="text-xs font-bold text-neutral-800">Download Brief</p>
                <p className="text-xs text-neutral-400 mt-0.5">5MB</p>
              </div>
              <button className="p-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer">
                <Download size={18} />
              </button>
            </div>

            {/* Deadline & Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-white">
                <div className="p-3 rounded-xl bg-[#EFF6FF] text-[#3B82F6]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Deadline</p>
                  <p className="text-xs text-neutral-400 mt-0.5">25/09/2026, 11:59PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-white">
                <div className="p-3 rounded-xl bg-[#FFF7ED] text-[#F97316]">
                  <Star size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Maximum Points</p>
                  <p className="text-xs text-neutral-400 mt-0.5">100 Points</p>
                </div>
              </div>
            </div>

            {/* Requirements List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-neutral-900">Requirements</h3>
              <ul className="space-y-2.5 text-xs text-neutral-500 list-disc pl-4">
                <li>Submit your final design in Figma</li>
                <li>Include desktop and mobile screens</li>
                <li>Add a short explanation of your design decisions</li>
                <li>Ensure your prototype is accessible through the submitted link</li>
              </ul>
            </div>

            {/* Format Tags */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-neutral-900">Submission Format</h3>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 text-xs font-medium text-neutral-700">
                  <LinkIcon size={14} /> Figma Link
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 text-xs font-medium text-neutral-700">
                  <FileText size={14} /> PDF
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 text-xs font-medium text-neutral-700">
                  <ImageIcon size={14} /> PNG/JPG
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Submission Area / Submitted View */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Form Box */}
            <div className="bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#E8F5E9] text-[#067A46] rounded-xl">
                  <Upload size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900">
                    {isSubmitted ? 'Your Submission' : 'Submit your Work'}
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {isSubmitted ? 'View your submitted project and files.' : 'Upload your final work or provide a link to your submission.'}
                  </p>
                </div>
              </div>

              {!isSubmitted ? (
                /* PENDING SUBMISSION FORM */
                <form onSubmit={handleSubmitClick} className="space-y-5">
                  
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-2">Upload file</label>
                    <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-6 text-center hover:border-[#067A46] transition-colors cursor-pointer bg-neutral-50/30">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-700">
                        <Upload size={18} />
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">
                        Drag and drop your file here or <span className="text-[#067A46] font-bold">browse</span>
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-neutral-200" />
                    <span className="px-3 text-xs text-neutral-400">or</span>
                    <div className="flex-1 border-t border-neutral-200" />
                  </div>

                  {/* Paste Link Input */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">Paste a link</label>
                    <input
                      type="url"
                      placeholder="https://figma.com/..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#067A46] transition-colors"
                    />
                  </div>

                  {/* Submission Note */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Submission note <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add a note for your instructor..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#067A46] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#067A46] hover:bg-[#056338] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Deliverable
                    <ArrowRight size={16} />
                  </button>

                </form>
              ) : (
                /* SUBMITTED STATE VIEW */
                <div className="space-y-5">
                  
                  {/* Uploaded File Card */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-12 bg-neutral-800 rounded-xl overflow-hidden flex items-center justify-center text-white text-xs font-bold">
                        UI/UX
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-800">{uploadedFile?.name}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{uploadedFile?.type} • {uploadedFile?.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer">
                      Download
                      <Download size={14} />
                    </button>
                  </div>

                  {/* Read-Only Link Input */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">Paste a link</label>
                    <input
                      type="text"
                      readOnly
                      value={link}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-500 outline-none cursor-not-allowed"
                    />
                  </div>

                  {/* Read-Only Submission Note */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Submission note <span className="text-neutral-400 font-normal">(optional)</span>
                    </label>
                    <div className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-500 min-h-[80px]">
                      {note}
                    </div>
                  </div>

                  {/* Disabled Submit Button */}
                  <button
                    disabled
                    className="w-full py-3.5 bg-[#A3D1B9] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <ArrowRight size={16} />
                    Submit Deliverable
                  </button>

                </div>
              )}

            </div>

            {/* Instructor Feedback Box */}
            {isSubmitted && (
              <div className="bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-2">
                <h3 className="text-sm font-bold text-neutral-900">Instructor's Feedback</h3>
                <p className="text-xs text-neutral-400">No feedback yet.</p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* CONFIRMATION MODAL */}
      {flowState === 'confirming' && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Submit your deliverable?</h3>
            <p className="text-xs text-neutral-500 leading-relaxed px-2">
              You're about to submit this work for review. Make sure you've uploaded the correct file or link before continuing.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setFlowState('pending')}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 px-4 rounded-xl bg-[#067A46] hover:bg-[#056338] text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Submit Work
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {flowState === 'success_modal' && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Deliverable Submitted</h3>
            <p className="text-xs text-neutral-500 leading-relaxed px-2">
              Your work has been successfully submitted for review. We'll notify you when feedback is available.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onBack}
                className="flex-1 py-3 px-4 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Back to Deliverables
              </button>
              <button
                onClick={() => setFlowState('submitted')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#067A46] hover:bg-[#056338] text-xs font-bold text-white transition-colors cursor-pointer"
              >
                View Submission
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  )
}