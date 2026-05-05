import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutKoica from './components/AboutKoica';
import SamarkandCenter from './components/SamarkandCenter';
import LocationContact from './components/LocationContact';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Loading from './components/Loading';
import DropoutRiskAnalyzer from './components/DropoutRiskAnalyzer';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return <Loading />;
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <LanguageProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 min-h-screen">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <Routes>
              {/* Main KOICA Site Routes */}
              <Route 
                path="/" 
                element={
                  <>
                    <Hero />
                    <AboutKoica />
                    <SamarkandCenter />
                    <Features />
                    <LocationContact />
                    <Gallery />
                    <Footer />
                  </>
                } 
              />
              
              {/* Dashboard Route */}
              <Route 
                path="/dashboard" 
                element={
                  isLoggedIn ? <StudentDashboard /> : <Navigate to="/" replace />
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
