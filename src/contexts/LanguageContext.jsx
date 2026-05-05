import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to Uzbek
    const savedLanguage = localStorage.getItem('koica-language');
    return savedLanguage || 'uz';
  });

  const [t, setT] = useState(() => translations[language]);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('koica-language', language);
    // Update translations
    setT(translations[language]);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    availableLanguages: [
      { code: 'uz', name: 'UZ', flag: '' },
      { code: 'en', name: 'EN', flag: '' },
      { code: 'kr', name: 'KR', flag: '' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
