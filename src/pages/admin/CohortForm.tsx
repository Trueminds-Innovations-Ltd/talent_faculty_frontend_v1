import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Upload, X, Check } from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";
import TagMultiSelect, { type TagOption } from "../../components/cohorts/TagMultiSelect";
import SuccessModal from "../../components/modals/SuccessModal";

import {
  getCohortById,
  courseDirectory,
  coordinatorDirectory,
  instructorDirectoryOptions,
  learnerDirectory,
  programTypeOptions,
} from "../../data/cohorts";
import type { CohortStatus } from "../../types/cohort";

const statuses: CohortStatus[] = ["Upcoming", "Active", "Completed"];
const enrollmentTypes = ["Automatic Enrollment", "Manual Enrollment", "Self-Service"];

export default function CohortForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit ? getCohortById(id) : undefined;

  const [name, setName] = useState(existing?.name.replace(/\s*\(.*\)$/, "") ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [capacity, setCapacity] = useState(existing?.capacity?.toString() ?? "");
  const [alias, setAlias] = useState(existing?.alias ?? "");
  const [start, setStart] = useState(existing?.start ?? "");
  const [end, setEnd] = useState(existing?.end ?? "");
  const [status, setStatus] = useState<CohortStatus>(existing?.status ?? "Upcoming");
  const [programType, setProgramType] = useState(existing?.programType ?? "");

  const [courses, setCourses] = useState<TagOption[]>(
    existing ? courseDirectory.slice(0, 4) : []
  );
  const [coordinators, setCoordinators] = useState<TagOption[]>(
    existing ? coordinatorDirectory : []
  );
  const [instructors, setInstructors] = useState<TagOption[]>(
    existing ? instructorDirectoryOptions.slice(0, 3) : []
  );
  const [learners, setLearners] = useState<TagOption[]>(
    existing
      ? Array.from({ length: 20 }, (_, i) => learnerDirectory[i % learnerDirectory.length]).map(
          (l, i) => ({ ...l, id: `${l.id}-${i}` })
        )
      : []
  );

  const [enrollmentType, setEnrollmentType] = useState(enrollmentTypes[0]);
  const [allowSelfEnrollment, setAllowSelfEnrollment] = useState(
    existing?.allowSelfEnrollment ?? false
  );
  const [requireApproval, setRequireApproval] = useState(
    existing?.requireEnrollmentApproval ?? false
  );
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(
    existing?.sendWelcomeEmail ?? true
  );
  const [visibleToAll, setVisibleToAll] = useState(existing?.visibleToAllLearners ?? true);

  const [showSaved, setShowSaved] = useState(false);
  const [showCreated, setShowCreated] = useState(false);

  const handleSubmit = () => {
    // Wire this up to your create/update cohort API call.
    if (isEdit) {
      setShowSaved(true);
    } else {
      setShowCreated(true);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white px-6 py-5">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[17px] font-semibold text-[#087b3c]">
                {isEdit ? "Edit Cohort" : "Create Cohort"}
              </h1>
              <p className="mt-2 text-[11px] text-[#888]">
                {isEdit ? "Edit and manage cohorts." : "Create and manage new cohorts."}
              </p>
            </div>

            {showSaved && (
              <div className="flex items-center gap-2 rounded-[10px] border border-[#dcefe6] bg-[#f2fbf6] px-4 py-2 text-[12px] text-[#161616]">
                <Check size={14} className="text-[#07863d]" />
                Changes to "{name}" has been saved successfully.
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[13px]">
            <span className="font-medium text-[#07863d]">Cohorts</span>
            <ChevronRight size={14} className="text-[#929292]" />
            <span className="font-semibold text-[#161616]">
              {isEdit ? "Edit Cohort" : "Create Cohort"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* ============== LEFT COLUMN ============== */}
            <div className="space-y-6">
              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">1. Cohort Information</h2>

                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[12px] font-medium text-[#222]">
                      Cohort Name <span className="text-[#ff4141]">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Cohort name"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">Cohort description</label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe cohort"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">Capacity</label>
                    <input
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="Maximum Number of learners"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                    <p className="mt-1 text-[10px] text-[#929292]">Leave empty for no limit</p>
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">Cohort Alias</label>
                    <input
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                      placeholder="Eg, Genesis"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">
                      Start Date <span className="text-[#ff4141]">*</span>
                    </label>
                    <input
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      placeholder="Select date"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                  </div>

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">End Date</label>
                    <input
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      placeholder="Select date"
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    />
                  </div>

                  {isEdit && (
                    <div>
                      <label className="text-[12px] font-medium text-[#222]">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as CohortStatus)}
                        className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] bg-[#dcefe6] px-3 text-[12px] font-medium text-[#07863d] outline-none"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="text-[12px] font-medium text-[#222]">Program Type</label>
                    <select
                      value={programType}
                      onChange={(e) => setProgramType(e.target.value)}
                      className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none focus:border-[#07863d]"
                    >
                      <option value="">Select Programe</option>
                      {programTypeOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isEdit && existing && (
                    <div>
                      <label className="text-[12px] font-medium text-[#222]">Cohort Code</label>
                      <input
                        value={existing.code}
                        disabled
                        className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] bg-[#f7f7f7] px-3 text-[12px] text-[#929292] outline-none"
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">2. Course Assignment</h2>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#222]">
                    Select Courses <span className="text-[#ff4141]">*</span>
                  </label>
                  <div className="mt-2">
                    <TagMultiSelect
                      placeholder="Search and select courses"
                      options={courseDirectory}
                      selected={courses}
                      onChange={setCourses}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[12px] text-[#555]">
                  Selected Courses
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#dcefe6] px-2 text-[11px] font-semibold text-[#07863d]">
                    {courses.length}
                  </span>
                </div>
              </section>

              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">5. Learner Assignment</h2>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#222]">Learners</label>
                  <div className="mt-2">
                    <TagMultiSelect
                      placeholder="Search and Select Learners"
                      options={learnerDirectory}
                      selected={learners}
                      onChange={setLearners}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[12px] text-[#555]">
                  Assigned learners
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#dcefe6] px-2 text-[11px] font-semibold text-[#07863d]">
                    {learners.length}
                  </span>
                </div>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#222]">Bulk Upload Learners</label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#e0e0e0] text-[#07863d]"
                    >
                      +
                    </button>
                    <div className="flex h-11 flex-1 items-center justify-between rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] text-[#929292]">
                      <span className="flex items-center gap-2">
                        <Upload size={14} />
                        select csv or excel file
                      </span>
                      <X size={14} />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ============== RIGHT COLUMN ============== */}
            <div className="space-y-6">
              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">3. Coordinator Assignment</h2>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#222]">
                    Coordinators <span className="text-[#ff4141]">*</span>
                  </label>
                  <div className="mt-2">
                    <TagMultiSelect
                      placeholder="Search and Select Coordinators"
                      options={coordinatorDirectory}
                      selected={coordinators}
                      onChange={setCoordinators}
                      columns={1}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[12px] font-medium text-[#222]">
                    Instructors <span className="text-[#ff4141]">*</span>
                  </label>
                  <div className="mt-2">
                    <TagMultiSelect
                      placeholder="Search and Select Instructors"
                      options={instructorDirectoryOptions}
                      selected={instructors}
                      onChange={setInstructors}
                      columns={1}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">4. Enrollment</h2>
                <p className="mt-1 text-[11px] text-[#929292]">Choose how learners will be added</p>

                <div className="mt-4">
                  <label className="text-[12px] font-medium text-[#222]">
                    Enrollment Type<span className="text-[#ff4141]">*</span>
                  </label>
                  <select
                    value={enrollmentType}
                    onChange={(e) => setEnrollmentType(e.target.value)}
                    className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none"
                  >
                    {enrollmentTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <ToggleRow
                  className="mt-5"
                  checked={allowSelfEnrollment}
                  onChange={setAllowSelfEnrollment}
                  title="Allow Self Enrollment"
                  description="Learners can enrol themselves in this cohort"
                />
                <ToggleRow
                  className="mt-4"
                  checked={requireApproval}
                  onChange={setRequireApproval}
                  title="Enrollment Approval"
                  description="Require admin approval before new enrolments"
                />
              </section>

              <section className="rounded-[14px] border border-[#e8e8e8] p-6">
                <h2 className="text-[15px] font-semibold text-[#161616]">6. Additional Settings</h2>

                <CheckboxRow
                  className="mt-4"
                  checked={sendWelcomeEmail}
                  onChange={setSendWelcomeEmail}
                  title="Send welcome email to enrolled learners"
                  description="Automatically send a welcome email with cohort details"
                />
                <CheckboxRow
                  className="mt-4"
                  checked={visibleToAll}
                  onChange={setVisibleToAll}
                  title="Make this cohort visible to all learners"
                  description="Learners will be able to see this cohort in their dashboard"
                />
              </section>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cohorts")}
              className="h-11 px-2 text-[13px] font-semibold text-[#161616]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-11 items-center gap-2 rounded-[10px] bg-[#07863d] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#067434]"
            >
              {isEdit ? "Save Changes" : "Create Cohort"}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        open={showCreated}
        title="Cohort Created"
        description="The new cohort has been added and can be managed from the cohorts page."
        primaryLabel="View Cohort"
        secondaryLabel="Back to dashboard"
        onPrimary={() => navigate("/admin/cohorts")}
        onSecondary={() => navigate("/admin/cohorts")}
      />
    </AdminDashboardLayout>
  );
}

function ToggleRow({
  checked,
  onChange,
  title,
  description,
  className = "",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#07863d]" : "bg-[#d9d9d9]"
        }`}
      >
        <span
          className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </button>
      <div>
        <p className="text-[12px] font-medium text-[#222]">{title}</p>
        <p className="text-[10px] text-[#929292]">{description}</p>
      </div>
    </div>
  );
}

function CheckboxRow({
  checked,
  onChange,
  title,
  description,
  className = "",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 ${className}`}>
      <span
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
          checked ? "border-[#07863d] bg-[#07863d]" : "border-[#c9c9c9] bg-white"
        }`}
      >
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
      </span>
      <span>
        <span className="block text-[12px] font-medium text-[#222]">{title}</span>
        <span className="block text-[10px] text-[#929292]">{description}</span>
      </span>
    </label>
  );
}
