import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  FileText, 
  CheckCircle, 
  Clock, 
  Pencil, 
  Archive, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle,
  ShieldAlert,
  Check
} from 'lucide-react';
import AdminSidebar from '../../components/layout/admin/AdminSidebar';
import AdminTopBar from '../../components/layout/admin/AdminTopBar';

export const initialCertificateData = [
  {
    id: 1,
    title: 'Introduction to Basic Computer app..',
    certId: 'TF-CERT_BCA_TF-01-01-0001A',
    course: 'Introduction to Basic Computer...',
    learners: '230',
    issued: '200',
    pending: '30',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Introduction to Basic Computer Applications',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  },
  {
    id: 2,
    title: 'Introduction to Front End Development',
    certId: 'TF-CERT_FED_TF-01-11-0401A',
    course: 'Introduction to Front End Development',
    learners: '-',
    issued: '-',
    pending: '-',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Introduction to Front End Development',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  },
  {
    id: 3,
    title: 'Graphics Design Basics',
    certId: 'TF-CERT_GDE_TF-01-01-0601A',
    course: 'Graphic Design Basics',
    learners: '102',
    issued: '102',
    pending: '-',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Graphic Design Basics',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  },
  {
    id: 4,
    title: 'Web Development ESsentials',
    certId: 'TF-CERT_WDE_TF-01-51-0601A',
    course: 'Web Development ESsentials',
    learners: '-',
    issued: '-',
    pending: '-',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Web Development Essentials',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  },
  {
    id: 5,
    title: 'Time Mangement',
    certId: 'TF-CERT_TM_TF-01-01-0031A',
    course: 'Time Mangement',
    learners: '-',
    issued: '-',
    pending: '-',
    img: 'https://images.unsplash.com/photo-1506784951209-450b90059fc5?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Time Management',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  },
  {
    id: 6,
    title: 'Understanidng Talent Faculty LMS',
    certId: 'TF-CERT_UTF_TF-01-01-0002A',
    course: 'Understanidng Talent Faculty LMS',
    learners: '2000',
    issued: '300',
    pending: '1800',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'Awarded to those who have completed Understanding Talent Faculty LMS',
    issueDate: 'Automated',
    expiryDate: 'No expiry',
    allowDownload: true,
    autoIssue: true
  }
];

export type CertificateItem = typeof initialCertificateData[0];

export default function AdminCertificates() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [certificates, setCertificates] = useState<CertificateItem[]>(initialCertificateData);

  // Modal & Toast States
  const [activeModal, setActiveModal] = useState<'archive' | 'delete' | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogoutClick = () => {
    console.log("User logged out");
  };

  const openModal = (type: 'archive' | 'delete', cert: CertificateItem) => {
    setSelectedCert(cert);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedCert(null);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleConfirmArchive = () => {
    if (!selectedCert) return;
    setCertificates((prev) => prev.filter((item) => item.id !== selectedCert.id));
    triggerToast(`Certificate "${selectedCert.title}" archived successfully`);
    closeModal();
  };

  const handleConfirmDelete = () => {
    if (!selectedCert) return;
    setCertificates((prev) => prev.filter((item) => item.id !== selectedCert.id));
    triggerToast(`Certificate "${selectedCert.title}" deleted successfully`);
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-white font-sans relative">
      {/* Top-Right Screen Fixed Toast Message */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white border border-gray-100 px-5 py-3 rounded-2xl shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 rounded-full border-2 border-[#067A46] flex items-center justify-center text-[#067A46]">
            <Check size={14} strokeWidth={3} />
          </div>
          <span className="text-sm font-medium text-gray-700">{toastMessage}</span>
        </div>
      )}

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
          <main className="p-6 md:p-8 w-full max-w-[1400px] mx-auto bg-white min-h-full">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-xl font-bold text-[#067A46] tracking-tight">Certificates</h1>
                <p className="text-sm text-gray-500 mt-1">Create, manage and view all certificate issued in the Platform</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => navigate('/admin/certificates/reports')}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  <BarChart2 size={18} className="text-gray-500" /> Generate Report
                </button>
                <button 
                  onClick={() => navigate('/admin/certificates/generate')}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#067A46] text-white rounded-xl text-sm font-semibold hover:bg-[#056439] transition-colors w-full sm:w-auto"
                >
                  Generate Certificate
                </button>
              </div>
            </div>

            {/* Overview Cards Section */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Certificates Overview</h2>
              <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-6">
                
                {/* Total Generated Card */}
                <div className="bg-[#eff6ff] rounded-2xl p-6 flex-1 min-w-[240px] border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-500 mb-3">
                    <FileText size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Generated</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-500 mb-2">20</div>
                  <div className="text-xs font-semibold text-[#067A46] mb-1">+10 this month</div>
                  <div className="text-xs text-gray-400 font-medium">All Certs</div>
                </div>

                {/* Total Issued Card */}
                <div className="bg-[#f0fdf4] rounded-2xl p-6 flex-1 min-w-[240px] border border-green-100">
                  <div className="flex items-center gap-2 text-green-500 mb-3">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Issued</span>
                  </div>
                  <div className="text-3xl font-bold text-[#067A46] mb-2">800</div>
                  <div className="text-xs font-semibold text-[#067A46] mb-1">+1 this month</div>
                  <div className="text-xs text-gray-400 font-medium">All received by learners</div>
                </div>

                {/* Total Pending Card */}
                <div className="bg-[#fff7ed] rounded-2xl p-6 flex-1 min-w-[240px] border border-orange-100">
                  <div className="flex items-center gap-2 text-orange-400 mb-3">
                    <Clock size={20} />
                    <span className="text-sm font-medium text-gray-600">Total Pending</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">2089</div>
                  <div className="text-xs font-semibold text-[#067A46] mb-1">+2 this month</div>
                  <div className="text-xs text-gray-400 font-medium">All still in Process</div>
                </div>

              </div>
            </div>

            {/* Table Section */}
            <div className="w-full">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative w-full md:w-[350px]">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search users, courses or lessons..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-300 transition-colors text-gray-800"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left min-w-[1000px]">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-4 w-[50px]">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 accent-[#067A46]"
                          checked={selectAll}
                          onChange={() => setSelectAll(!selectAll)}
                        />
                      </th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800">Certificates</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800">Course</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800 text-center">learners</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800 text-center">Issued</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800 text-center">Pending</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-800 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {certificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="py-4 px-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#067A46]" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={cert.img} 
                              alt="Course Thumbnail" 
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{cert.title}</p>
                              <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">{cert.certId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-semibold text-gray-700">{cert.course}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm text-gray-600 font-medium">{cert.learners}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm text-gray-600 font-medium">{cert.issued}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm text-gray-600 font-medium">{cert.pending}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-4">
                            <button 
                              onClick={() => navigate(`/admin/certificates/${cert.id}/edit`)}
                              className="text-blue-500 hover:text-blue-600 transition-colors"
                              title="Edit Certificate"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => openModal('archive', cert)}
                              className="text-orange-400 hover:text-orange-500 transition-colors"
                              title="Archive Certificate"
                            >
                              <Archive size={18} />
                            </button>
                            <button 
                              onClick={() => openModal('delete', cert)}
                              className="text-red-400 hover:text-red-500 transition-colors"
                              title="Delete Certificate"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm text-gray-500">
                <p>Showing 1 to {certificates.length} of 20 Certificates</p>
                
                <div className="flex items-center gap-1.5">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors">
                    3
                  </button>
                  
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                  
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors">
                    4
                  </button>

                  <button className="flex items-center gap-2 md:h-8 px-3 ml-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors text-gray-700">
                    Last page <ChevronDown size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* ARCHIVE MODAL */}
      {activeModal === 'archive' && selectedCert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[460px] w-full text-center shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-20 mx-auto flex items-center justify-center text-red-400">
              <ShieldAlert size={64} strokeWidth={1.2} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Are You Sure?</h3>

            <p className="text-sm text-gray-500 leading-relaxed px-4">
              You are about to archive <span className="font-semibold text-gray-700">{selectedCert.title}</span>. Archived items can be recovered!
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleConfirmArchive}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Yes, Archive!
              </button>
              <button 
                onClick={closeModal}
                className="flex-1 py-3 px-4 bg-[#067A46] text-white font-bold rounded-xl hover:bg-[#056439] transition-colors text-sm"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {activeModal === 'delete' && selectedCert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[460px] w-full text-center shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-20 mx-auto flex items-center justify-center text-red-400">
              <AlertTriangle size={64} strokeWidth={1.2} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Are You Sure?</h3>

            <p className="text-sm text-gray-500 leading-relaxed px-4">
              You are about to permanently delete <span className="font-semibold text-gray-700">{selectedCert.title}</span>. Deleted items cannot be recovered!
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={handleConfirmDelete}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Yes, Delete!
              </button>
              <button 
                onClick={closeModal}
                className="flex-1 py-3 px-4 bg-[#067A46] text-white font-bold rounded-xl hover:bg-[#056439] transition-colors text-sm"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}