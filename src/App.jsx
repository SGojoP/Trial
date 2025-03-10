import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import AdminDashboard from './Pages/AdminDashboard'
import NewsLetter from './Pages/newsLetter'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
// import PreLoader from './Components/Preloader'
import { useState } from 'react'
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const location = useLocation()
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [showPreLoader, setShowPreLoader] = useState(true)

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowPreLoader(false) // Disable pre-loader after first visit
    }
  }, [location.pathname])


  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500); // Delay to sync with transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              {/* {showPreLoader && <PreLoader />} */}
              <Home />
            </>
          }
        />
          <Route path='/about' element={<About />} />
          <Route path='/newsletter' element={<NewsLetter />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path="/verify-email/:token" element={<VerifyEmail/>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App