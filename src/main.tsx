import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'


import App from './App.tsx'
import Login from './pages/auth/Login.tsx'
import Signup from './pages/auth/Signup.tsx'
import PasswordReset from "./feat/auth-password-reset/PasswordReset.tsx";
import Welcome from './feat/auth-welcome/welcome'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/welcome" element={<Welcome />} />
     </Routes>
    </BrowserRouter>
  </StrictMode>,
)
