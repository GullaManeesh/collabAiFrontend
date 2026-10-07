import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WorkspaceLayout from './components/layout/WorkspaceLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Workspaces from './pages/Workspaces'
import Chat from './pages/Chat'
import Copilot from './pages/Copilot'
import Documents from './pages/Documents'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import './styles/index.css'

const WorkspaceRedirect = () => {
  return <Navigate to="chat" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />

        {/* Workspaces Dashboard */}
        <Route path="/workspaces" element={<Workspaces />} />

        {/* Workspace App Layout & Sub-routes */}
        <Route path="/w/:id" element={<WorkspaceLayout />}>
          <Route index element={<WorkspaceRedirect />} />
          <Route path="chat" element={<Chat />} />
          <Route path="copilot" element={<Copilot />} />
          <Route path="docs" element={<Documents />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
