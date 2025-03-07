import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import AdminDashboard from './Pages/AdminDashboard'
import NewsLetter from './Pages/newsLetter'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import PreLoader from './Components/Preloader'
import { useState } from 'react'

function App() {
  const location = useLocation()
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
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App

// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Transition from "./components/Transition";

// const App = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showTransition, setShowTransition] = useState(false);
//   const [nextRoute, setNextRoute] = useState(null);

//   const handleNavigation = (path) => {
//     setShowTransition(true);
//     setNextRoute(path);
//   };

//   useEffect(() => {
//     const handleBackNavigation = (event) => {
//       event.preventDefault();
//       if (!showTransition) {
//         setShowTransition(true);
//         setNextRoute(-1); // Go back
//       }
//     };

//     window.addEventListener("popstate", handleBackNavigation);
//     return () => window.removeEventListener("popstate", handleBackNavigation);
//   }, [showTransition]);

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {showTransition && (
//           <Transition
//             onAnimationComplete={() => {
//               if (nextRoute === -1) {
//                 navigate(-1);
//               } else {
//                 navigate(nextRoute);
//               }
//               setShowTransition(false);
//               window.scrollTo(0, 0); // Reset scroll after navigation
//             }}
//           />
//         )}
//       </AnimatePresence>

//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<Home navigate={handleNavigation} />} />
//         <Route path="/about" element={<About navigate={handleNavigation} />} />
//       </Routes>
//     </>
//   );
// };

// export default App;
