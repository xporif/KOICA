import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav_home, href: '#home' },
    { name: t.nav_about_koica, href: '#about-koica' },
    { name: t.nav_samarkand_center, href: '#samarkand-center' },
    { name: t.nav_features, href: '#features' },
    { name: t.nav_location, href: '#location' },
    { name: t.nav_gallery, href: '#gallery' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold gradient-text">KOICA</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Language Switcher & Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-1 glass rounded-full p-1">
              {availableLanguages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    language === lang.code
                      ? 'gradient-bg text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={lang.name}
                >
                  <span className="text-xs font-medium">{lang.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Language Switcher */}
            <div className="md:hidden">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-2 py-1 rounded-lg glass text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-black/20 border-0 focus:ring-0"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </motion.button>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden glass rounded-lg mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Language Switcher */}
              <div className="flex justify-center mb-2">
                <div className="flex items-center space-x-1 glass rounded-full p-1">
                  {availableLanguages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                        language === lang.code
                          ? 'gradient-bg text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs font-medium">{lang.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
