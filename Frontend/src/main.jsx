import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './Home.jsx'
import LearningPage from './learning.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearningPage />
  </StrictMode>,
)
