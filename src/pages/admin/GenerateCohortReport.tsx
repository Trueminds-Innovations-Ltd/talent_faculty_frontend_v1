import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Mail, Download } from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";
import SuccessModal from "../../components/modals/SuccessModal";

const dataOptions = [
  { key: "basic", title: "Basic Information", description: "Cohort name, code, description, status etc" },
  { key: "enrolment", title: "Course Enrolment", description: "Courses enrolled, date, progress etc." },
  { key: "dates", title: "Cohort Dates", description: "Start date, end date, duration etc." },
  { key: "learners", title: "Learners Information", description: "Total enrollments, active learners, etc" },
  { key: "staff", title: "Instructors/Coordinators", description: "Name, email, role, etc" },
  { key: "assessments", title: "Assessments", description: "Quiz/assessments scores, attempts" },
  { key: "certificates", title: "Certificates", description: "Certificate name, issue date, etc." },
  { key: "login", title: "Login Activity", description: "Last login date and time." },
] as const;

const quickSelects = ["All Cohorts", "Active Cohorts", "Inactive Cohorts", "New Registrations (This month)"];
const formats = ["CSV", "EXCEL (XLSX)", "PDF", "JSON"] as const;

export default function GenerateCohortReport() {
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState<Set<string>>(new Set());
  const [quickSelect, setQuickSelect] = useState<string | null>(null);
  const [format, setFormat] = useState<(typeof formats)[number]>("EXCEL (XLSX)");
  const [sendToAdmin, setSendToAdmin] = useState(false);
  const [sendToCustom, setSendToCustom] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);

  const toggleData = (key: string) => {
    setSelectedData((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white px-6 py-5">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-[19px] font-semibold text-[#07863d]">Generate Cohort Report</h1>
          <p className="mt-1 text-[12px] text-[#888]">
            Generate and export a detailed reports of Cohorts, settings, enrollments and performance.
          </p>

          <div className="mt-4 flex items-center gap-2 text-[13px]">
            <span className="font-medium text-[#07863d]">Cohorts</span>
            <ChevronRight size={14} className="text-[#929292]" />
            <span className="font-semibold text-[#161616]">Reports</span>
          </div>

          {/* ============== SELECT DATA ============== */}
          <section className="mt-6 rounded-[14px] border border-[#e8e8e8] p-6">
            <h2 className="text-[15px] font-semibold text-[#161616]">1. Select data to include</h2>
            <p className="mt-1 text-[12px] text-[#929292]">
              Choose the information you want to include in the report.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {dataOptions.map((option) => (
                <label key={option.key} className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedData.has(option.key)}
                    onChange={() => toggleData(option.key)}
                    className="mt-0.5 h-4 w-4 accent-[#07863d]"
                  />
                  <span>
                    <span className="block text-[13px] font-medium text-[#222]">{option.title}</span>
                    <span className="block text-[11px] text-[#929292]">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* ============== FILTERS ============== */}
          <section className="mt-6 rounded-[14px] border border-[#e8e8e8] p-6">
            <h2 className="text-[15px] font-semibold text-[#161616]">2. Apply Filters (Optional)</h2>
            <p className="mt-1 text-[12px] text-[#929292]">Narrow down the data to export.</p>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormSelect label="Instructor" placeholder="Select Instructor" />
              <FormSelect label="Cohort" placeholder="Select Cohort" />
              <FormSelect label="Status" placeholder="Select Status" />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormSelect label="Enrollment Status" placeholder="Select Status" />
              <div>
                <label className="text-[12px] font-medium text-[#222]">Cohort Date Range</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <input placeholder="Start Date" className="h-11 rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none" />
                  <input placeholder="End date" className="h-11 rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[12px] border border-[#ededed] p-4">
              <p className="text-[12px] font-medium text-[#222]">Quick Select</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickSelects.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setQuickSelect(label)}
                    className={`h-11 rounded-[10px] border text-[12px] font-medium transition-colors ${
                      quickSelect === label
                        ? "border-[#07863d] bg-[#dcefe6] text-[#07863d]"
                        : "border-[#e0e0e0] text-[#555]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[12px] font-medium text-[#222]">Additional Filter</label>
              <input
                placeholder="Search by name, email or username"
                className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] outline-none"
              />
            </div>
          </section>

          {/* ============== EXPORT FORMAT ============== */}
          <section className="mt-6 rounded-[14px] border border-[#e8e8e8] p-6">
            <h2 className="text-[15px] font-semibold text-[#161616]">3. Choose Export Format</h2>
            <p className="mt-1 text-[12px] text-[#929292]">Select the file format for your report</p>

            <div className="mt-5 flex flex-wrap items-center gap-8">
              {formats.map((f) => (
                <label key={f} className="flex cursor-pointer items-center gap-2 text-[12px] text-[#222]">
                  <input
                    type="radio"
                    name="report-format"
                    checked={format === f}
                    onChange={() => setFormat(f)}
                    className="h-[15px] w-[15px] accent-[#07863d]"
                  />
                  {f}
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-10">
              <ToggleRow checked={sendToAdmin} onChange={setSendToAdmin} title="Send to Admin Email" description="Send report to admin registered email" />
              <ToggleRow checked={sendToCustom} onChange={setSendToCustom} title="Send to Custom Email address" />

              <div className="flex h-10 items-center gap-2 rounded-[10px] border border-[#e0e0e0] px-3">
                <Mail size={14} className="text-[#929292]" />
                <input defaultValue="maryjohnson@gmail.com" className="w-[190px] bg-transparent text-[12px] text-[#222] outline-none" />
              </div>
            </div>
          </section>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/admin/cohorts")}
              className="text-[13px] font-semibold text-[#161616]"
            >
              Back to Cohorts
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/cohorts")}
                className="h-11 rounded-[10px] border border-[#e0e0e0] px-5 text-[13px] font-semibold text-[#161616]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowGenerated(true)}
                className="flex h-11 items-center gap-2 rounded-[10px] bg-[#07863d] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#067434]"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        open={showGenerated}
        title="Report Generated"
        description="The new cohort report has been exported and also sent to your mail, you should see a download request soon."
        primaryLabel="Generate New Report"
        secondaryLabel="Back to dashboard"
        onPrimary={() => setShowGenerated(false)}
        onSecondary={() => navigate("/admin/cohorts")}
      />
    </AdminDashboardLayout>
  );
}

function FormSelect({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[12px] font-medium text-[#222]">{label}</label>
      <select className="mt-2 h-11 w-full rounded-[10px] border border-[#e0e0e0] px-3 text-[12px] text-[#929292] outline-none">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}

function ToggleRow({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-[#07863d]" : "bg-[#d9d9d9]"
        }`}
      >
        <span
          className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </span>
      <span>
        <span className="block text-[12px] font-medium text-[#222]">{title}</span>
        {description && <span className="block text-[10px] text-[#929292]">{description}</span>}
      </span>
    </label>
  );
}
