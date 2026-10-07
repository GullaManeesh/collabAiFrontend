import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Clock, Briefcase, Plus, X, Layers, LogOut, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const initialWorkspacesList = [
  {
    id: 'sprint-launch',
    name: 'MajorProject / Sprint Launch',
    description: 'Autonomous team workspace for product architecture & release milestone tracking',
    member_count: 5,
    last_activity_at: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Revamp',
    description: 'UI design system, iOS & Android component specs and user feedback RAG index',
    member_count: 8,
    last_activity_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ai-research',
    name: 'AI Agent RAG Lab',
    description: 'Testing vector chunking, multi-agent critic loops, and prompt telemetry data',
    member_count: 3,
    last_activity_at: new Date(Date.now() - 172800000).toISOString()
  }
]

const Workspaces = () => {
  const navigate = useNavigate()

  const [workspaces, setWorkspaces] = useState(initialWorkspacesList)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setCreating(true)
    setTimeout(() => {
      const newWs = {
        id: `ws-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || 'Collaborative human-agent workspace',
        member_count: 1,
        last_activity_at: new Date().toISOString()
      }
      setWorkspaces(prev => [newWs, ...prev])
      setShowModal(false)
      setName('')
      setDescription('')
      setCreating(false)
      navigate(`/w/${newWs.id}/chat`)
    }, 400)
  }

  const handleWorkspaceClick = (id) => {
    navigate(`/w/${id}/chat`)
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F8F6] text-[#1A2E22] p-4 sm:p-8 lg:p-10 font-sans overflow-y-auto selection:bg-zinc-200 selection:text-zinc-900">
      {/* Top Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between border-b border-[#E4E4E0] pb-6 mb-8 select-none">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#14532D] border border-[#BBF7D0] flex items-center justify-center shadow-xs shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#143A23] tracking-tight">CollabAI Workspaces</h1>
            <p className="text-[#166534] text-xs mt-0.5">Select a workspace or create a new team environment</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-1.5 text-xs sm:text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">New Workspace</span>
            <span className="xs:hidden">New</span>
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="inline-flex items-center space-x-1 text-[#166534] hover:text-[#DC2626] hover:bg-[#FEE2E2]/50 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main content grid */}
      <main className="max-w-6xl mx-auto">
        {workspaces.length === 0 ? (
          <div className="bg-white border border-[#E4E4E0] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto mt-12 flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#14532D] mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#143A23]">No workspaces found</h3>
            <p className="text-[#166534] text-xs max-w-sm mt-1.5 mb-6 leading-relaxed">
              Create your first team workspace to start organizing documents, tracking tasks, and collaborating with context-aware AI agents.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create First Workspace</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workspaces.map((ws) => (
              <motion.div 
                key={ws.id} 
                whileHover={{ y: -2 }}
                onClick={() => handleWorkspaceClick(ws.id)}
                className="bg-white border border-[#E4E4E0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#15803D] hover:shadow-md cursor-pointer transition-all group duration-150"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#14532D] border border-[#BBF7D0] flex items-center justify-center font-bold text-xs">
                      {ws.name.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-[#166534] group-hover:text-[#14532D] flex items-center space-x-0.5">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#143A23] group-hover:text-[#15803D] transition-colors truncate">
                    {ws.name}
                  </h3>
                  <div className="mt-1 text-[#166534] text-xs line-clamp-2 min-h-8 leading-relaxed">
                    {ws.description}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F0FDF4] text-xs text-[#166534]">
                  <div className="flex items-center space-x-1.5 bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#DCFCE7]">
                    <Users className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>{ws.member_count} {ws.member_count === 1 ? 'member' : 'members'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-[#15803D] text-[11px] font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Creation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-[#143A23]/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-white border border-[#E4E4E0] rounded-2xl p-6 sm:p-7 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 text-[#166534] hover:text-[#14532D] p-1 rounded-lg hover:bg-[#F0FDF4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display font-bold text-xl text-[#143A23] tracking-tight mb-1">Create New Workspace</h3>
              <p className="text-[#166534] text-xs mb-6 leading-relaxed">Set up an isolated project room with dedicated documents, tasks, and memory.</p>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#143A23]">Workspace Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Major Project - Team 7"
                    className="w-full bg-[#F8F8F6] border border-[#E4E4E0] text-[#143A23] text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 focus:border-[#15803D] transition-all placeholder:text-[#A1A1AA]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#143A23]">Description (Optional)</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what this workspace is for..."
                    rows="3"
                    className="w-full bg-[#F8F8F6] border border-[#E4E4E0] text-[#143A23] text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/10 focus:border-[#15803D] transition-all placeholder:text-[#A1A1AA] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#F0FDF4]">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={creating}
                    className="btn-primary"
                  >
                    {creating ? (
                      <span className="w-4 h-4 border-2 border-[#14532D] border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <span>Create Workspace</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Workspaces
