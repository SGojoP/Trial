import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter, Link } from 'react-router-dom'
import newsLetter from './Pages/newsLetter.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <HashRouter>
    <App />
    </HashRouter>
  </>,
)
