import React, { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadProps {
  label?: string
  accept?: string
  maxSize?: string
  onFileSelect?: (file: File | null) => void
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = 'CV',
  accept = '.pdf,.doc,.docx',
  maxSize = '500MB',
  onFileSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      onFileSelect?.(file)
    }
  }, [onFileSelect])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
    } else {
      setFileName(null)
    }
    onFileSelect?.(file)
  }, [onFileSelect])

  return (
    <div className="w-full">
      {label && (
        <label className="auth-label">
          {label}
        </label>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary-light/50' 
            : 'border-neutral-100 bg-white hover:border-primary/40 hover:bg-primary-light/30'
          }
        `}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-6 h-6 text-neutral-300" />
          {fileName ? (
            <p className="text-sm font-medium text-primary">{fileName}</p>
          ) : (
            <>
              <p className="text-sm text-neutral-400">Click to upload here</p>
              <p className="text-xs text-neutral-300">PDF, DOC - {maxSize}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload
