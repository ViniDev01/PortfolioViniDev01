import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'
import { ProtectedRoute } from './context/ProtectedRoute'

import App from './App.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/sobre' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
)
