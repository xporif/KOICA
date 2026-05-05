import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, TrendingDown, BarChart3, User, GraduationCap, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DropoutRiskAnalyzer = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    attendance: 75,
    averageGrade: 80
  });
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const analyzeRisk = async () => {
    if (!formData.studentName.trim()) {
      alert(t.risk_analyzer_name_required);
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      const { attendance, averageGrade } = formData;
      let riskLevel, riskColor, riskIcon, riskMessage;

      if (attendance < 50 && averageGrade < 60) {
        riskLevel = 'HIGH';
        riskColor = 'red';
        riskIcon = <AlertTriangle className="w-8 h-8" />;
        riskMessage = t.risk_high_message;
      } else if (attendance < 70 || averageGrade < 70) {
        riskLevel = 'MEDIUM';
        riskColor = 'yellow';
        riskIcon = <TrendingUp className="w-8 h-8" />;
        riskMessage = t.risk_medium_message;
      } else {
        riskLevel = 'LOW';
        riskColor = 'green';
        riskIcon = <TrendingDown className="w-8 h-8" />;
        riskMessage = t.risk_low_message;
      }

      setResult({
        level: riskLevel,
        color: riskColor,
        icon: riskIcon,
        message: riskMessage,
        attendance,
        averageGrade,
        recommendations: getRecommendations(riskLevel, attendance, averageGrade)
      });

      setIsAnalyzing(false);
      setShowChart(true);
    }, 2000);
  };

  const getRecommendations = (level, attendance, grade) => {
    const recommendations = [];
    
    if (attendance < 70) {
      recommendations.push(t.risk_recommendation_attendance);
    }
    if (grade < 70) {
      recommendations.push(t.risk_recommendation_grade);
    }
    if (level === 'HIGH') {
      recommendations.push(t.risk_recommendation_counseling);
      recommendations.push(t.risk_recommendation_parent);
    }
    
    return recommendations;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      attendance: 75,
      averageGrade: 80
    });
    setResult(null);
    setShowChart(false);
  };

  const getRiskColorClass = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-gray-800';
      case 'green': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskBorderColor = (color) => {
    switch (color) {
      case 'red': return 'border-red-200 dark:border-red-800';
      case 'yellow': return 'border-yellow-200 dark:border-yellow-800';
      case 'green': return 'border-green-200 dark:border-green-800';
      default: return 'border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t.risk_analyzer_title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.risk_analyzer_subtitle}
          </p>
        </motion.div>

        {/* User Info */}
        {localStorage.getItem('isLoggedIn') && (
          <motion.div
            className="mb-8 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass rounded-2xl px-6 py-3 flex items-center space-x-3">
              <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {JSON.parse(localStorage.getItem('user') || '{}').username}
              </span>
            </div>
            <motion.button
              onClick={handleLogout}
              className="glass rounded-2xl px-6 py-3 flex items-center space-x-2 hover:bg-red-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400 font-medium">
                {t.logout}
              </span>
            </motion.button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              {t.risk_analyzer_form_title}
            </h2>

            <div className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t.risk_analyzer_student_name}
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t.risk_analyzer_student_name_placeholder}
                />
              </div>

              {/* Attendance Slider */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t.risk_analyzer_attendance}: <span className="font-bold text-purple-600 dark:text-purple-400">{formData.attendance}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendance: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Average Grade Slider */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  {t.risk_analyzer_grade}: <span className="font-bold text-purple-600 dark:text-purple-400">{formData.averageGrade}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.averageGrade}
                  onChange={(e) => setFormData(prev => ({ ...prev, averageGrade: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  onClick={analyzeRisk}
                  disabled={isAnalyzing}
                  className="flex-1 gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>{t.risk_analyzer_analyzing}</span>
                    </div>
                  ) : (
                    t.risk_analyzer_analyze_button
                  )}
                </motion.button>
                <motion.button
                  onClick={resetForm}
                  className="px-6 py-3 glass text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.risk_analyzer_reset}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Result Display */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Risk Level Card */}
                  <div className={`border-2 ${getRiskBorderColor(result.color)} rounded-2xl p-6 mb-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {t.risk_analyzer_risk_level}
                      </h3>
                      <div className={`px-4 py-2 rounded-full ${getRiskColorClass(result.color)} font-bold text-lg`}>
                        {result.level}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-full ${getRiskColorClass(result.color)} bg-opacity-10`}>
                        {result.icon}
                      </div>
                    </div>

                    <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                      {result.message}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {result.attendance}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {t.risk_analyzer_attendance}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {result.averageGrade}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {t.risk_analyzer_grade}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      {t.risk_analyzer_recommendations}
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                          <span>{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t.risk_analyzer_no_data}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Chart Visualization */}
        <AnimatePresence>
          {showChart && result && (
            <motion.div
              className="mt-8 glass rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                {t.risk_analyzer_chart_title}
              </h3>
              <div className="h-64 flex items-end justify-center space-x-8">
                {/* Attendance Bar */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div 
                    className="w-20 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                    style={{ height: `${(result.attendance / 100) * 200}px` }}
                  ></div>
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {result.attendance}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t.risk_analyzer_attendance}
                    </div>
                  </div>
                </motion.div>

                {/* Grade Bar */}
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div 
                    className="w-20 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                    style={{ height: `${(result.averageGrade / 100) * 200}px` }}
                  ></div>
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {result.averageGrade}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t.risk_analyzer_grade}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DropoutRiskAnalyzer;
