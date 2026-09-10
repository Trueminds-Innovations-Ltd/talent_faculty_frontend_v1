import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronsRight, 
  Check, 
  ChevronDown,
  Search,
  Download,
  Mail
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

export default function GenerateCertificatesReport() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Section 1 State
  const [includedData, setIncludedData] = useState({
    certificateInfo: false,
    courseInfo: false,
    certificateStatus: true,
    learnersInfo: false,
    customFields: false
  });

  // Section 2 Filters State
  const [filters, setFilters] = useState({
    status: '',
    cohort: '',
    course: '',
    issuedBy: '',
    certificate: '',
    startDate: '',
    endDate: '',
    quickSelect: 'all', // 'all' | 'issued' | 'pending'
    searchQuery: ''
  });

  // Section 3 Export Format State
  const [exportFormat, setExportFormat] = useState<'CSV' | 'EXCEL' | 'PDF' | 'JSON'>('PDF');
  const [sendToAdminEmail, setSendToAdminEmail] = useState(true);
  const [sendToCustomEmail, setSendToCustomEmail] = useState(false);
  const [customEmail, setCustomEmail] = useState('maryjohnson@gmail.com');

  const handleLogoutClick = () => {
    console.log("User logged out");
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCancel = () => {
    navigate('/admin/certificates');
  };

  const toggleIncludedData = (key: keyof typeof includedData) => {
    setIncludedData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-white font-sans relative">
      {/* Sidebar Component */}
      <AdminSidebar 
        mobileOpen={mobileOpen} 
        onMobileClose={() => setMobileOpen(false)} 
        onLogoutClick={handleLogoutClick} 
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TopBar Component */}
        <AdminTopBar 
          onMenuClick={() => setMobileOpen(true)} 
          onLogoutClick={handleLogoutClick} 
        />
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 md:p-8 w-full max-w-[1200px] mx-auto bg-white min-h-full">
            
            {/* Header & Breadcrumb */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#067A46] tracking-tight">Generate Certificates Report</h1>
              <p className="text-sm text-gray-400 mt-0.5">Generate and export a detailed reports of certificates,</p>
              
              <div className="flex items-center gap-2 mt-4 text-sm font-semibold">
                <button type="button" onClick={handleCancel} className="text-[#067A46] hover:underline">
                  Certificates
                </button>
                <ChevronsRight size={16} className="text-gray-400" />
                <span className="text-gray-800">Reports</span>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleExportSubmit} className="space-y-6 max-w-[1100px]">
              
              {/* 1. Select data to include Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-gray-900">1. Select data to include</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Choose the information you want to include in the report.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Certificate Information */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleIncludedData('certificateInfo')}
                      className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${includedData.certificateInfo ? 'bg-[#067A46] border-[#067A46] text-white' : 'border-gray-300'}`}
                    >
                      {includedData.certificateInfo && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-black">Certificate Information</p>
                      <p className="text-xs text-gray-400">Name, id, template, etc,</p>
                    </div>
                  </label>

                  {/* Course Information */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleIncludedData('courseInfo')}
                      className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${includedData.courseInfo ? 'bg-[#067A46] border-[#067A46] text-white' : 'border-gray-300'}`}
                    >
                      {includedData.courseInfo && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-black">Course Information</p>
                      <p className="text-xs text-gray-400">Name, code, category, Instructors name</p>
                    </div>
                  </label>

                  {/* Certificate Status */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleIncludedData('certificateStatus')}
                      className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${includedData.certificateStatus ? 'bg-[#067A46] border-[#067A46] text-white' : 'border-gray-300'}`}
                    >
                      {includedData.certificateStatus && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-black">Certificate Status</p>
                      <p className="text-xs text-gray-400">Issued, expired, Issue date etc</p>
                    </div>
                  </label>

                  {/* Learners Information */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleIncludedData('learnersInfo')}
                      className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${includedData.learnersInfo ? 'bg-[#067A46] border-[#067A46] text-white' : 'border-gray-300'}`}
                    >
                      {includedData.learnersInfo && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-black">Learners Information</p>
                      <p className="text-xs text-gray-400">Name, email, username, chort</p>
                    </div>
                  </label>

                  {/* Custom Fields */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleIncludedData('customFields')}
                      className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors ${includedData.customFields ? 'bg-[#067A46] border-[#067A46] text-white' : 'border-gray-300'}`}
                    >
                      {includedData.customFields && <Check size={14} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-black">Custom Fields</p>
                      <p className="text-xs text-gray-400">Include custom profile fields</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 2. Apply Filters (Optional) Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-gray-900">2. Apply Filters (Optional)</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Narrow down the data to export.</p>
                </div>

                {/* Filter Grid - Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <div className="relative">
                      <select 
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select Status</option>
                        <option value="issued">Issued</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Cohort */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cohort</label>
                    <div className="relative">
                      <select 
                        value={filters.cohort}
                        onChange={(e) => setFilters({ ...filters, cohort: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select Cohort</option>
                        <option value="2026-q1">2026 Q1 Cohort</option>
                        <option value="2026-q2">2026 Q2 Cohort</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                    <div className="relative">
                      <select 
                        value={filters.course}
                        onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select Course</option>
                        <option value="graphic-design">Graphic Design Basics</option>
                        <option value="front-end">Introduction to Front End</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Filter Grid - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Issued by */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Issued by</label>
                    <div className="relative">
                      <select 
                        value={filters.issuedBy}
                        onChange={(e) => setFilters({ ...filters, issuedBy: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select Instructor</option>
                        <option value="inst-1">John Doe</option>
                        <option value="inst-2">Jane Smith</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Certificates */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Certificates</label>
                    <div className="relative">
                      <select 
                        value={filters.certificate}
                        onChange={(e) => setFilters({ ...filters, certificate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      >
                        <option value="">Select Certificate</option>
                        <option value="cert-1">Graphic Design Basics Cert</option>
                        <option value="cert-2">Front End Development Cert</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Issue Date Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Date Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Start Date"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                      />
                      <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="End date"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                      />
                      <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Quick Select Buttons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quick Select</label>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, quickSelect: 'all' })}
                      className={`px-8 py-3 rounded-xl border text-sm font-bold transition-colors ${
                        filters.quickSelect === 'all' 
                          ? 'border-gray-400 text-gray-800 bg-gray-50' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      All Certificates
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, quickSelect: 'issued' })}
                      className={`px-8 py-3 rounded-xl border text-sm font-bold transition-colors ${
                        filters.quickSelect === 'issued' 
                          ? 'border-gray-400 text-gray-800 bg-gray-50' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Issued Certificates
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, quickSelect: 'pending' })}
                      className={`px-8 py-3 rounded-xl border text-sm font-bold transition-colors ${
                        filters.quickSelect === 'pending' 
                          ? 'border-gray-400 text-gray-800 bg-gray-50' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Pending Certificates
                    </button>
                  </div>
                </div>

                {/* Additional Filter Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Filter</label>
                  <div className="relative max-w-lg">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search by name, email or username"
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* 3. Choose Export Format Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-gray-900">3. Choose Export Format</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Select the file format for your report</p>
                </div>

                {/* Radio Buttons */}
                <div className="flex flex-wrap items-center gap-8 pt-2">
                  {(['CSV', 'EXCEL', 'PDF', 'JSON'] as const).map((format) => (
                    <label key={format} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        exportFormat === (format === 'EXCEL' ? 'EXCEL' : format) 
                          ? 'border-[#067A46]' 
                          : 'border-gray-300'
                      }`}>
                        {exportFormat === (format === 'EXCEL' ? 'EXCEL' : format) && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#067A46]" />
                        )}
                      </div>
                      <input 
                        type="radio" 
                        name="exportFormat" 
                        value={format}
                        checked={exportFormat === (format === 'EXCEL' ? 'EXCEL' : format)}
                        onChange={() => setExportFormat(format === 'EXCEL' ? 'EXCEL' : format)}
                        className="sr-only"
                      />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-black">
                        {format === 'EXCEL' ? 'EXCEL (XLSX)' : format}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Email Toggles */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4 border-t border-gray-100">
                  
                  {/* Toggle 1: Send to Admin Email */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSendToAdminEmail(!sendToAdminEmail)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors relative ${sendToAdminEmail ? 'bg-[#067A46]' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${sendToAdminEmail ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Send to Admin Email</p>
                      <p className="text-xs text-gray-400">Send report to admin registered email</p>
                    </div>
                  </div>

                  {/* Toggle 2: Send to Custom Email address */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setSendToCustomEmail(!sendToCustomEmail)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative ${sendToCustomEmail ? 'bg-[#067A46]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${sendToCustomEmail ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">Send to Custom Email address</span>
                    </div>

                    <div className="relative w-full sm:w-[260px]">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" 
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="maryjohnson@gmail.com"
                        disabled={!sendToCustomEmail}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 disabled:opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Action Controls */}
              <div className="md:flex items-center justify-between pt-4 pb-12">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="text-sm font-bold text-gray-800 hover:underline max-md:mb-5"
                >
                  Back to Certificates
                </button>

                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-[#067A46] text-white text-sm font-bold rounded-xl hover:bg-[#056439] transition-colors shadow-sm"
                  >
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

            </form>

          </main>
        </div>
      </div>

      {/* REPORT GENERATED SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[480px] w-full text-center shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Green Checkmark Circle Icon */}
            <div className="w-16 h-16 rounded-full border-2 border-[#067A46] flex items-center justify-center text-[#067A46] mx-auto">
              <Check size={36} strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Report Generated</h3>

            <p className="text-sm text-gray-500 leading-relaxed px-4">
              The new certificate report has been exported and also sent to your mail, you should see a download request soon.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="button"
                onClick={() => navigate('/admin/certificates')}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Back to dashboard
              </button>
              <button 
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-3 px-4 bg-[#067A46] text-white font-bold rounded-xl hover:bg-[#056439] transition-colors text-sm whitespace-nowrap"
              >
                Generate New Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}