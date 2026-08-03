import React from 'react'
import { Download, Share2 } from 'lucide-react'
import type { Certificate } from '../../pages/student/Certificates'

interface CertificateRowProps {
  certificate: Certificate
  onDownload: (certificate: Certificate) => void
  onShare: (certificate: Certificate) => void
}

const CertificateRow: React.FC<CertificateRowProps> = ({
  certificate,
  onDownload,
  onShare,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-neutral-50 last:border-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="h-16 w-16 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden">
          <img
            src="./course-image.jpg"
            alt={certificate.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-neutral-800 truncate">
            {certificate.title}
          </h4>

          <p className="text-xs text-neutral-400 mt-0.5">
            {certificate.instructor}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 sm:flex-shrink-0">
        <button
          onClick={() => onDownload(certificate)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Download size={16} />
          Download Certificate
        </button>

        <button
          onClick={() => onShare(certificate)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
        >
          <Share2 size={16} />
          Share Certificate
        </button>
      </div>
    </div>
  )
}

export default CertificateRow