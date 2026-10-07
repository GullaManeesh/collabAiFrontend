import React, { useState } from 'react'
import { Outlet, NavLink, useParams, Link, useLocation } from 'react-router-dom'
import { 
  MessageSquare, 
  Bot, 
  FileText, 
  CheckSquare, 
  Settings as SettingsIcon, 
  Layers, 
  Menu, 
  X, 
  ArrowLeft,
  Brain
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WorkspaceLayout = () => {
  const { id = 'demo-workspace' } = useParams()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Pure frontend state mock for outlet context to satisfy nested routes
  const [wsMessages, setWsMessages] = useState([])
  const [lastWsMessage, setLastWsMessage] = useState(null)
  const [typingUsers, setTypingUsers] = useState({})

  const mockWorkspace = {
    id: id,
    name: 'MajorProject / Sprint Launch',
    description: 'Autonomous multi-agent workspace for sprint management',
    channels: {
      team_chat: 'team_chat_channel',
      copilot: 'copilot_channel'
    },
    members: [
      { user_id: 'u1', name: 'Maya', role: 'owner', joined_at: new Date().toISOString() },
      { user_id: 'u2', name: 'Alex', role: 'member', joined_at: new Date().toISOString() },
      { user_id: 'u3', name: 'You', role: 'member', joined_at: new Date().toISOString() }
    ]
  }

  const navItems = [
    { path: `/w/${id}/chat`, label: 'Team Chat', icon: MessageSquare, badge: 'Live' },
    { path: `/w/${id}/copilot`, label: 'Project Copilot', icon: Bot, badge: 'AI' },
    { path: `/w/${id}/docs`, label: 'Documents', icon: FileText },
    { path: `/w/${id}/tasks`, label: 'Milestones Kanban', icon: CheckSquare },
    { path: `/w/${id}/settings`, label: 'Settings', icon: SettingsIcon },
  ]

  const contextValue = {
    wsStatus: 'open',
    sendMessage: (channelId, content) => console.log('Mock send:', content),
    sendTyping: (channelId, isTyping) => console.log('Mock typing:', isTyping),
    typingUsers,
    wsMessages,
    setWsMessages,
    lastWsMessage,
    setLastWsMessage,
    workspace: mockWorkspace,
    refreshStats: () => {}
  }

  return (
    <div className="flex h-screen w-full bg-[#F8F8F6] text-[#18181B] overflow-hidden select-none">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-[#E4E4E0] bg-white z-20 shrink-0">
        {/* Workspace Brand Header */}
        <div className="p-5 border-b border-[#E4E4E0] flex items-center justify-between">
          <Link to="/workspaces" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#18181B] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider block">Workspace</span>
              <h1 className="font-display font-bold text-sm text-[#18181B] truncate group-hover:text-[#52525B] transition-colors">
                {mockWorkspace.name}
              </h1>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] px-3 mb-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#E7F0E9] text-[#18181B] shadow-xs'
                      : 'text-[#52525B] hover:bg-[#E7F0E9] hover:text-[#18181B]'
                  }`
                }
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#D8E6DB] text-[#18181B]' : 'text-[#52525B] group-hover:bg-[#D8E6DB]/60 group-hover:text-[#18181B]'
                  }`}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                    isActive ? 'bg-[#D8E6DB] text-[#18181B]' : 'bg-[#F4F4F2] text-[#52525B] border border-[#E4E4E0]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>

        {/* Memory Index Widget */}
        <div className="p-4 border-t border-[#E4E4E0] bg-[#F8F8F6]">
          <div className="bg-white border border-[#E4E4E0] rounded-xl p-3.5 shadow-xs space-y-2 hover:bg-[#E7F0E9]/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#18181B]">
                <span className="h-2 w-2 rounded-full bg-[#18181B]" />
                <Brain className="w-4 h-4 text-[#18181B]" />
                <span>Memory Index</span>
              </div>
              <span className="text-[10px] font-mono text-[#18181B] bg-[#F4F4F5] border border-[#E4E4E0] px-1.5 py-0.5 rounded font-medium">
                active
              </span>
            </div>
            <div className="text-xl font-extrabold text-[#18181B]">
              12 <span className="text-xs font-normal text-[#71717A]">chunks</span>
            </div>
            <p className="text-[11px] text-[#71717A] leading-tight">
              Isolated contextual vector knowledge
            </p>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Topbar / Header */}
        <header className="h-14 border-b border-[#E4E4E0] bg-white px-4 sm:px-6 flex items-center justify-between shrink-0 z-10 shadow-xs">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#18181B] p-2 rounded-xl border border-[#E4E4E0] hover:bg-[#E7F0E9] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <Link 
              to="/workspaces"
              className="hidden sm:inline-flex items-center space-x-1 text-xs text-[#71717A] hover:text-[#18181B] font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Workspaces</span>
            </Link>

            <span className="hidden sm:block text-[#D4D4D8]">/</span>

            <div className="flex items-center space-x-2 truncate">
              <span className="text-xs font-bold text-[#18181B] truncate">{mockWorkspace.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#18181B] bg-[#F4F4F5] border border-[#E4E4E0] px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#18181B] animate-pulse"></span>
              <span className="hidden xs:inline text-[11px]">Realtime Live</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-[#18181B]/40 backdrop-blur-xs z-40 lg:hidden"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col shadow-2xl lg:hidden border-r border-[#E4E4E0]"
              >
                <div className="p-4 border-b border-[#E4E4E0] flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#18181B] text-white flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-xs text-[#18181B]">CollabAI</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#71717A] hover:text-[#18181B] rounded-lg hover:bg-[#F4F4F2]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] px-3 mb-2">
                    Workspace Navigation
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-[#E7F0E9] text-[#18181B] shadow-xs'
                              : 'text-[#52525B] hover:bg-[#E7F0E9] hover:text-[#18181B]'
                          }`
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-[#F4F4F2] text-[#52525B]">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    )
                  })}
                </div>

                <div className="p-4 border-t border-[#E4E4E0] bg-[#F8F8F6]">
                  <Link
                    to="/workspaces"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-white border border-[#E4E4E0] rounded-xl text-xs font-semibold text-[#18181B] hover:bg-[#E7F0E9] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Switch Workspace</span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Nested Route Viewport */}
        <main className="flex-1 overflow-hidden relative">
          <Outlet context={contextValue} />
        </main>
      </div>
    </div>
  )
}

export default WorkspaceLayout
