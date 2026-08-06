import React, { useCallback, useRef, useState } from 'react'
import { CloudUpload, CircleCheck, Video, X } from 'lucide-react'

const DESCRIPTION_LIMIT = 150

interface CreateLessonPanelProps {
  /** Display context — which module this lesson is being added to */
  moduleTitle: string
  onCancel: () => void
  onCreated: (lessonName: string) => void
}

const CreateLessonPanel: React.FC<CreateLessonPanelProps> = ({ moduleTitle, onCancel, onCreated }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [lessonName, setLessonName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const isValid = lessonName.trim().length > 0 && description.trim().length > 0 && Boolean(videoFile)

  const handleFile = useCallback((file: File | null) => {
    if (file && !file.type.startsWith('video/')) return
    setVideoFile(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFile(e.dataTransfer.files[0] ?? null)
  }, [handleFile])

  const handleCancel = () => {
    setLessonName('')
    setDescription('')
    setVideoFile(null)
    onCancel()
  }

  const handleCreate = () => {
    if (!isValid) return
    onCreated(lessonName.trim())
    // Fields are intentionally left filled after creation, matching the
    // design reference — whoever wires this into real course data can
    // decide whether to reset/redirect once lesson persistence is hooked up.
  }

  return (
    <div className="rounded-2xl border border-admin-ash-7 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold text-admin-ink">Add a New lesson</h2>
      <p className="mt-1 text-sm text-admin-ash-3">
        Create a new lesson and add content to build your course.
      </p>
      <p className="mt-1 text-xs text-admin-ash-4">
        Adding to <span className="font-semibold text-admin-ash-2">{moduleTitle}</span>
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="lesson-name" className="block text-sm font-semibold text-admin-ink mb-2">
            Lesson name
          </label>
          <input
            id="lesson-name"
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            placeholder="eg Introduction to UX design"
            className="w-full rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink placeholder-admin-ash-4 outline-none focus:border-admin-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="lesson-description" className="block text-sm font-semibold text-admin-ink mb-2">
            Description
          </label>
          <textarea
            id="lesson-description"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))}
            placeholder="Learn the fundamentals of user experience and interface design, from research and wireframing to prototyping and creating intuitive digital experiences."
            rows={4}
            maxLength={DESCRIPTION_LIMIT}
            className="w-full resize-none rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink placeholder-admin-ash-4 outline-none focus:border-admin-primary transition-colors"
          />
          <p className="mt-1.5 text-right text-xs text-admin-ash-4">
            {description.length}/{DESCRIPTION_LIMIT}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-admin-ink mb-2">Video</label>

          {videoFile ? (
            <div className="rounded-xl border border-admin-ash-6 px-4 py-3">
              <div className="flex items-center gap-3">
                <CircleCheck size={20} className="text-admin-success shrink-0" />
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-admin-info-light text-admin-info shrink-0">
                  <Video size={13} />
                </span>
                <span className="text-sm text-admin-ink truncate flex-1">{videoFile.name}</span>
                <button
                  onClick={() => setVideoFile(null)}
                  className="text-admin-ash-4 hover:text-admin-danger transition-colors shrink-0"
                  title="Remove video"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-1 pl-[52px] text-xs text-admin-ash-3">Uploaded</p>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-admin-primary bg-admin-primary-light/40' : 'border-admin-ash-6 hover:bg-admin-ash-7/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,.mp4,.mov"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <CloudUpload size={28} className="text-admin-ash-4" />
              <p className="text-sm text-admin-ash-3">Drag and drop a video here</p>
              <p className="text-sm font-semibold text-admin-primary">Or Browse files</p>
            </div>
          )}
          {!videoFile && (
            <p className="mt-1.5 text-xs text-admin-ash-4">Supports MP4 and MOV</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={handleCancel}
          className="rounded-xl bg-admin-ash-7/60 px-8 py-3 text-sm font-semibold text-admin-ash-2 hover:bg-admin-ash-7 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={!isValid}
          className={`rounded-xl px-8 py-3 text-sm font-semibold transition-colors ${
            isValid
              ? 'bg-admin-primary text-white hover:bg-admin-primary-dark'
              : 'bg-admin-ash-7/60 text-admin-ash-4 cursor-not-allowed'
          }`}
        >
          Create lesson
        </button>
      </div>
    </div>
  )
}

export default CreateLessonPanel
