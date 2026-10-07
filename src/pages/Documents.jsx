import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Upload, FileText, Trash2, X, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const initialDocs = [
  {
    id: 'doc-1',
    filename: 'system_architecture.pdf',
    size_bytes: 2516582,
    chunk_count: 48,
    page_count: 14,
    status: 'indexed',
    uploader_name: 'Maya',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    summary: 'Contains backend system design, WebSocket hub event schemas, vector database partitioning, and rate-limiting middleware rules.'
  },
  {
    id: 'doc-2',
    filename: 'api_contract_v2.md',
    size_bytes: 143360,
    chunk_count: 12,
    page_count: 3,
    status: 'indexed',
    uploader_name: 'Alex',
    created_at: new Date(Date.now() - 18000000).toISOString(),
    summary: 'Specifies JSON payload schemas for Copilot orchestration turns, user authentication headers, and multi-agent channel routing.'
  },
  {
    id: 'doc-3',
    filename: 'sprint_launch_notes.txt',
    size_bytes: 43008,
    chunk_count: 6,
    page_count: 1,
    status: 'indexed',
    uploader_name: 'You',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    summary: 'Meeting transcript covering sprint goals, milestone task owners, and release criteria.'
  }
]

const Documents = () => {
  const { id } = useParams()
  
  const [documents, setDocuments] = useState(initialDocs)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  
  const [selectedDoc, setSelectedDoc] = useState(initialDocs[0])
  const fileInputRef = useRef(null)

  const handleDocClick = (doc) => {
    setSelectedDoc(doc)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    simulateUpload(selectedFile)
  }

  const simulateUpload = (fileObj) => {
    setUploading(true)
    setUploadError(null)

    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        filename: fileObj.name,
        size_bytes: fileObj.size || 524288,
        chunk_count: 16,
        page_count: 2,
        status: 'indexed',
        uploader_name: 'You',
        created_at: new Date().toISOString(),
        summary: 'Newly uploaded document chunked and indexed into workspace RAG memory.'
      }
      setDocuments(prev => [newDoc, ...prev])
      setSelectedDoc(newDoc)
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }, 1200)
  }

  const handleDelete = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId))
    if (selectedDoc?.id === docId) {
      setSelectedDoc(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      simulateUpload(droppedFile)
    }
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="absolute inset-0 flex relative bg-[#F8F8F6] text-[#18181B] h-full overflow-hidden select-none">
      {/* Left documents view */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#18181B] tracking-tight">Documents Repository</h2>
          <p className="text-[#71717A] text-xs mt-0.5">Upload specs, technical documents, or research notes to index into the Workspace Brain.</p>
        </div>

        {/* Drag and Drop Zone */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#E4E4E0] hover:border-[#18181B] bg-white hover:bg-[#E7F0E9]/50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all mb-6 shadow-xs group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            className="hidden" 
            accept=".pdf,.docx,.txt,.md"
          />
          <div className="w-11 h-11 rounded-xl bg-[#F4F4F2] group-hover:bg-[#E7F0E9] group-hover:text-[#365742] flex items-center justify-center text-[#18181B] transition-colors mb-3">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#18181B] group-hover:text-[#365742] transition-colors">
            {uploading ? 'Parsing and indexing document chunks...' : 'Click or drag file to index into workspace'}
          </span>
          <span className="text-[11px] text-[#71717A] mt-1 font-mono">
            Supported formats: PDF, DOCX, TXT, MD up to 20MB
          </span>
        </div>

        {uploadError && (
          <div className="mb-5 p-3 bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Documents cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-20 bg-white border border-[#E4E4E0] rounded-xl animate-pulse shadow-xs"></div>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white border border-[#E4E4E0] rounded-2xl p-10 flex flex-col items-center text-center shadow-xs max-w-md mx-auto my-6">
            <div className="w-10 h-10 rounded-xl bg-[#F4F4F2] flex items-center justify-center text-[#71717A] mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#18181B]">No documents indexed yet</span>
            <p className="text-[11px] text-[#71717A] mt-1">Uploaded files are chunked, parsed, and made retrievable by all workspace agents.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {documents.map((doc) => {
              const isIndexed = doc.status === 'indexed'
              const isSelected = selectedDoc?.id === doc.id
              
              return (
                <div 
                  key={doc.id}
                  onClick={() => handleDocClick(doc)}
                  className={`bg-white border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all hover:border-[#18181B] hover:shadow-xs ${
                    isSelected ? 'border-[#18181B] ring-2 ring-[#18181B]/10 shadow-xs' : 'border-[#E4E4E0]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#18181B] text-white' : 'bg-[#F4F4F2] text-[#18181B]'}`}>
                      <FileText className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="truncate min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#18181B] truncate leading-snug">{doc.filename}</h4>
                      <div className="flex items-center space-x-2 text-[11px] text-[#71717A] mt-0.5">
                        <span>{formatSize(doc.size_bytes)}</span>
                        <span>·</span>
                        <span>{doc.chunk_count} chunks</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="ml-2 shrink-0">
                    {isIndexed && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
                        <CheckCircle className="w-3 h-3 text-[#15803D]" />
                        <span className="hidden xs:inline">Indexed</span>
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Right Details Sidebar Drawer */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[22rem] lg:static lg:w-[22rem] bg-white border-l border-[#E4E4E0] flex flex-col h-full overflow-y-auto shadow-2xl lg:shadow-none z-30"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E4E4E0] flex items-center justify-between">
              <h3 className="font-display font-bold text-xs text-[#18181B] truncate pr-3">{selectedDoc.filename}</h3>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-[#71717A] hover:text-[#18181B] p-1.5 rounded-lg hover:bg-[#F4F4F2] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Details */}
            <div className="p-5 space-y-5 flex-grow">
              <div className="space-y-5">
                {/* Meta details */}
                <div className="space-y-2.5 font-sans text-xs bg-[#F8F8F6] p-3.5 rounded-xl border border-[#E4E4E0]">
                  <div className="flex justify-between text-[#52525B]">
                    <span className="text-[11px] font-semibold uppercase text-[#71717A]">Uploaded by</span>
                    <span className="font-semibold text-[#18181B]">{selectedDoc.uploader_name}</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span className="text-[11px] font-semibold uppercase text-[#71717A]">Memory Chunks</span>
                    <span className="font-semibold text-[#18181B]">{selectedDoc.chunk_count}</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span className="text-[11px] font-semibold uppercase text-[#71717A]">Pages Count</span>
                    <span className="font-semibold text-[#18181B]">{selectedDoc.page_count || 1}</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span className="text-[11px] font-semibold uppercase text-[#71717A]">Status</span>
                    <span className="font-semibold uppercase text-[10px] px-1.5 py-0.2 rounded bg-[#F0FDF4] text-[#15803D]">
                      {selectedDoc.status}
                    </span>
                  </div>
                </div>

                {/* AI Summary Section */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-[#18181B] font-semibold">
                    <FileText className="w-3.5 h-3.5 text-[#71717A]" />
                    <span>Workspace Brain Synthesis</span>
                  </div>
                  
                  <div className="text-xs leading-relaxed text-[#27272A] bg-[#F8F8F6] p-3.5 rounded-xl border border-[#E4E4E0] select-text font-sans">
                    {selectedDoc.summary}
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Button footer */}
            <div className="p-4 border-t border-[#E4E4E0] bg-[#F8F8F6] mt-auto">
              <button
                onClick={() => handleDelete(selectedDoc.id)}
                className="w-full bg-white hover:bg-[#FEF2F2] border border-[#E4E4E0] hover:border-[#FEE2E2] text-[#DC2626] py-2 rounded-xl font-semibold text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Document</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Documents
