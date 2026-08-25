import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronsRight, 
  Check, 
  ChevronDown,
  FileBadge
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

export default function GenerateCertificate() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    certName: '',
    course: '',
    description: '',
    issueDate: '',
    expiryDate: '',
    allowDownload: true,
    autoIssue: true
  });

  const handleLogoutClick = () => {
    console.log("User logged out");
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCancel = () => {
    navigate('/admin/certificates');
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
              <h1 className="text-xl font-bold text-[#067A46] tracking-tight">Generate Certificate</h1>
              <p className="text-sm text-gray-400 mt-0.5">Create and manage new certificate.</p>
              
              <div className="flex items-center gap-2 mt-4 text-sm font-semibold">
                <button onClick={handleCancel} className="text-[#067A46] hover:underline">
                  Certificates
                </button>
                <ChevronsRight size={16} className="text-gray-400" />
                <span className="text-gray-800">Generate Certificate</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerateSubmit} className="space-y-6 max-w-[1000px]">
              
              {/* 1. Certificate Details Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900">1. Certificate Details</h2>
                
                {/* Certificate Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter Certiface name"
                    value={formData.certName}
                    onChange={(e) => setFormData({ ...formData, certName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                    required
                  />
                </div>

                {/* Select Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select Course</option>
                      <option value="Graphic Design Basics">Graphic Design Basics</option>
                      <option value="Introduction to Basic Computer Applications">Introduction to Basic Computer Applications</option>
                      <option value="Introduction to Front End Development">Introduction to Front End Development</option>
                      <option value="Web Development Essentials">Web Development Essentials</option>
                      <option value="Time Management">Time Management</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Certificate Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Description
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* 2. Certificate Settings Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900">2. Certificate Settings</h2>
                
                {/* Issue Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Leave empty for automated"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                    />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="leave empty for no expiry"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 placeholder:text-gray-400 transition-colors"
                    />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.allowDownload ? 'bg-white border-[#067A46] text-[#067A46]' : 'border-gray-300'}`}>
                      {formData.allowDownload && <Check size={14} strokeWidth={3} />}
                    </div>
                    <input 
                      type="checkbox"
                      checked={formData.allowDownload}
                      onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      Allow download after completion
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.autoIssue ? 'bg-white border-[#067A46] text-[#067A46]' : 'border-gray-300'}`}>
                      {formData.autoIssue && <Check size={14} strokeWidth={3} />}
                    </div>
                    <input 
                      type="checkbox"
                      checked={formData.autoIssue}
                      onChange={(e) => setFormData({ ...formData, autoIssue: e.target.checked })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      Auto-issue on course completion
                    </span>
                  </label>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 pb-12">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#067A46] text-white text-sm font-semibold rounded-xl hover:bg-[#056439] transition-colors shadow-sm"
                >
                  <FileBadge size={18} />
                  Generate Certificate
                </button>
              </div>

            </form>

          </main>
        </div>
      </div>

      {/* GENERATED CERTIFICATE SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[460px] w-full text-center shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Green Checkmark Icon */}
            <div className="w-16 h-16 rounded-full border-2 border-[#067A46] flex items-center justify-center text-[#067A46] mx-auto">
              <Check size={36} strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Certificate Generated</h3>

            <p className="text-sm text-gray-500 leading-relaxed px-4">
              The new certificate has been created and can be managed from the Certificate page.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Back to dashboard
              </button>
              <button 
                type="button"
                onClick={() => navigate('/admin/certificates')}
                className="flex-1 py-3 px-4 bg-[#067A46] text-white font-bold rounded-xl hover:bg-[#056439] transition-colors text-sm"
              >
                View Certificates
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}