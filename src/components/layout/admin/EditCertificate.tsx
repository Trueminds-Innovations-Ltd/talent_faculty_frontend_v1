import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ChevronsRight, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import { initialCertificateData } from '../../../pages/admin/Certificates';

export default function EditCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    certName: '',
    course: '',
    description: '',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  });

  useEffect(() => {
    if (id) {
      const existingCert = initialCertificateData.find((item) => item.id === Number(id));
      if (existingCert) {
        setFormData({
          certName: `Certificate of Completion in ${existingCert.course}`,
          course: existingCert.course,
          description: existingCert.description || `Awarded to those who have completed ${existingCert.course}`,
          issueDate: existingCert.issueDate || 'Automated',
          expiryDate: existingCert.expiryDate || 'No expiry',
          allowDownload: existingCert.allowDownload ?? true,
          autoIssue: existingCert.autoIssue ?? true
        });
      }
    }
  }, [id]);

  const handleLogoutClick = () => {
    console.log("User logged out");
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedSuccess(true);
  };

  const handleBackToList = () => {
    navigate('/admin/certificates');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
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
            
            {/* Edit Header & Success Alert */}
            <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-[#067A46] tracking-tight">Edit Certificate</h1>
                <p className="text-sm text-gray-400 mt-0.5">Edit and manage certificate.</p>
                
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mt-4 text-sm font-semibold">
                  <button onClick={handleBackToList} className="text-[#067A46] hover:underline">
                    Certificates
                  </button>
                  <ChevronsRight size={16} className="text-gray-400" />
                  <span className="text-gray-800">Edit Certificate</span>
                </div>
              </div>

              {/* Success Toast Notification */}
              {isSavedSuccess && (
                <div className="flex items-center gap-3 bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-md transition-all animate-in fade-in duration-300">
                  <div className="w-6 h-6 rounded-full border-2 border-[#067A46] flex items-center justify-center text-[#067A46]">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Certificate changes saved successfully</span>
                </div>
              )}
            </div>

            {/* Form Container */}
            <form onSubmit={handleSaveChanges} className="space-y-6 max-w-[1000px]">
              
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
                    value={formData.certName}
                    onChange={(e) => setFormData({ ...formData, certName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-gray-300 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-gray-300 appearance-none bg-white transition-colors cursor-pointer"
                      required
                    >
                      <option value="Graphic Design Basics">Graphic Design Basics</option>
                      <option value="Introduction to Basic Computer...">Introduction to Basic Computer...</option>
                      <option value="Introduction to Front End Development">Introduction to Front End Development</option>
                      <option value="Web Development ESsentials">Web Development ESsentials</option>
                      <option value="Time Mangement">Time Mangement</option>
                      <option value="Understanidng Talent Faculty LMS">Understanidng Talent Faculty LMS</option>
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
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-gray-300 transition-colors resize-none"
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
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-gray-300 transition-colors"
                      required
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
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full pl-4 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-gray-300 transition-colors"
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
                {!isSavedSuccess ? (
                  <>
                    <button 
                      type="button"
                      onClick={handleBackToList}
                      className="px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-[#067A46] text-white text-sm font-semibold rounded-xl hover:bg-[#056439] transition-colors shadow-sm"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    type="button"
                    onClick={handleBackToList}
                    className="px-6 py-2.5 border-2 border-gray-700 text-gray-800 text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm"
                  >
                    Back to Certificates
                  </button>
                )}
              </div>

            </form>

          </main>
        </div>
      </div>
    </div>
  );
}