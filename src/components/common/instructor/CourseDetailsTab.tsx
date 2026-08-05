import { ChevronDown } from 'lucide-react'

export default function CourseDetailsTab() {
  return (
    <div className="pt-6 max-w-[700px] space-y-8">
      <div className="space-y-1">
        <h2 className="text-[17px] font-bold text-gray-800">Course details</h2>
        <p className="text-[13px] text-gray-400">Provide essential information about your course.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-800">Course Title</label>
          <input 
            type="text"
            defaultValue="UX Research Fundamentals"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-800">Course description</label>
          <textarea 
            rows={4}
            defaultValue="Learn the fundamentals of UX research, from understanding user needs and selecting research methods to analyzing insights and presenting findings that support better design decisions."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
          />
          <div className="text-right text-[11px] font-medium text-gray-400">120/150</div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-800">Learning outcomes</label>
          <textarea 
            rows={5}
            defaultValue={`By the end of this course, learners will be able to :\n- Understand UX research principles.\n- Conduct basic user research.\n- Analyze research findings.\n- Present actionable insights.`}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
          />
          <div className="text-right text-[11px] font-medium text-gray-400">120/150</div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-bold text-gray-800">Course duration</label>
          <div className="relative">
            <select 
              defaultValue="1 month"
              className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer bg-white"
            >
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="1 month">1 month</option>
              <option value="1 month 2 weeks">1 month 2 weeks</option>
              <option value="2 months">2 months</option>
              <option value="2 months 2 weeks">2 months 2 weeks</option>
              <option value="3 months">3 months</option>
              <option value="4 months">4 months</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button className="flex-1 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[14px] font-bold text-gray-600 hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        <button className="flex-1 py-3.5 rounded-xl bg-[#0F833C] text-[14px] font-bold text-white hover:bg-[#0c6b31] transition-colors shadow-sm">
          Save changes
        </button>
      </div>
    </div>
  )
}