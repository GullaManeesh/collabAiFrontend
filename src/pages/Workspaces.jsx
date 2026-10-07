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
    <div className="min-h-screen w-full bg-[#F8F8F6] text-[#18181B] p-4 sm:p-8 lg:p-10 font-sans overflow-y-auto selection:bg-zinc-200 selection:text-zinc-900">
      {/* Top Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between border-b border-[#E4E4E0] pb-6 mb-8 select-none">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#18181B] text-white border border-[#18181B] flex items-center justify-center shadow-xs shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#18181B] tracking-tight">CollabAI Workspaces</h1>
            <p className="text-[#52525B] text-xs mt-0.5">Select a workspace or create a new team environment</p>
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
            className="inline-flex items-center space-x-1 text-[#52525B] hover:text-[#DC2626] hover:bg-[#FEE2E2]/50 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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
            <div className="w-12 h-12 rounded-2xl bg-[#18181B] flex items-center justify-center text-white mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#18181B]">No workspaces found</h3>
            <p className="text-[#52525B] text-xs max-w-sm mt-1.5 mb-6 leading-relaxed">
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
                className="bg-white border border-[#E4E4E0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#18181B] hover:bg-[#E7F0E9]/50 hover:shadow-md cursor-pointer transition-all group duration-150"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#18181B] text-white border border-[#18181B] flex items-center justify-center font-bold text-xs">
                      {ws.name.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-[#52525B] group-hover:text-[#18181B] flex items-center space-x-0.5">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#18181B] group-hover:text-[#18181B] transition-colors truncate">
                    {ws.name}
                  </h3>
                  <div className="mt-1 text-[#52525B] text-xs line-clamp-2 min-h-8 leading-relaxed">
                    {ws.description}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E4E4E0] text-xs text-[#52525B]">
                  <div className="flex items-center space-x-1.5 bg-[#F4F4F5] px-2 py-0.5 rounded-md border border-[#E4E4E0]">
                    <Users className="w-3.5 h-3.5 text-[#52525B]" />
                    <span>{ws.member_count} {ws.member_count === 1 ? 'member' : 'members'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-[#18181B] text-[11px] font-medium">
                    <Clock className="w-3 h-3 text-[#52525B]" />
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
          <div className="fixed inset-0 bg-[#18181B]/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-white border border-[#E4E4E0] rounded-2xl p-6 sm:p-7 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 text-[#52525B] hover:text-[#18181B] p-1 rounded-lg hover:bg-[#F4F4F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#18181B] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#18181B]">Create Workspace</h3>
                  <p className="text-xs text-[#52525B]">Set up a team room for documents, chat, and AI copilot.</p>
                </div>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#18181B]">Workspace Name *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mobile App Revamp"
                    className="w-full bg-[#F8F8F6] border border-[#E4E4E0] text-[#18181B] text-sm px-3.5 py-2 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18181B]/10 focus:border-[#18181B] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#18181B]">Description</label>
                  <textarea 
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this workspace focused on?"
                    className="w-full bg-[#F8F8F6] border border-[#E4E4E0] text-[#18181B] text-sm px-3.5 py-2 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#18181B]/10 focus:border-[#18181B] transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2.5 pt-3">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="btn-secondary text-xs px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={creating}
                    className="btn-primary text-xs px-5 py-2 cursor-pointer"
                  >
                    {creating ? 'Creating...' : 'Create Workspace'}
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
