import React, { useState } from 'react'

interface AddModulePanelProps {
  onCancel: () => void
  onCreated: (moduleName: string) => void
}

const AddModulePanel: React.FC<AddModulePanelProps> = ({ onCancel, onCreated }) => {
  const [moduleName, setModuleName] = useState('')
  const [description, setDescription] = useState('')
  const [numberOfLessons, setNumberOfLessons] = useState('')

  const isValid = moduleName.trim().length > 0 && description.trim().length > 0

  const handleCancel = () => {
    setModuleName('')
    setDescription('')
    setNumberOfLessons('')
    onCancel()
  }

  const handleCreate = () => {
    if (!isValid) return
    onCreated(moduleName.trim())
    // Fields are intentionally left filled after creation, matching the
    // design reference — whoever wires this into real course data can
    // decide whether to reset/redirect once module persistence is hooked up.
  }

  return (
    <div className="rounded-2xl border border-admin-ash-7 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold text-admin-ink">Add a New Module</h2>
      <p className="mt-1 text-sm text-admin-ash-3">
        Create a new module to organize related lessons within your course.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="module-name" className="block text-sm font-semibold text-admin-ink mb-2">
            Modules name
          </label>
          <input
            id="module-name"
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="eg Introduction to UX design"
            className="w-full rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink placeholder-admin-ash-4 outline-none focus:border-admin-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="module-description" className="block text-sm font-semibold text-admin-ink mb-2">
            Description
          </label>
          <textarea
            id="module-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Learn the fundamentals of user experience and interface design, from research and wireframing to prototyping and creating intuitive digital experiences."
            rows={4}
            className="w-full resize-none rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink placeholder-admin-ash-4 outline-none focus:border-admin-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="module-lessons" className="block text-sm font-semibold text-admin-ink mb-2">
            Number of Lessons
          </label>
          <input
            id="module-lessons"
            type="number"
            min={0}
            value={numberOfLessons}
            onChange={(e) => setNumberOfLessons(e.target.value)}
            placeholder="eg 0"
            className="w-full rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink placeholder-admin-ash-4 outline-none focus:border-admin-primary transition-colors"
          />
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
          Create Module
        </button>
      </div>
    </div>
  )
}

export default AddModulePanel
