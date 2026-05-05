import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Computer, Users, Award, BookOpen, Wifi, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SamarkandCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  const facilities = [
    {
      icon: <Computer className="w-6 h-6" />,
      title: t.center_modern_labs,
      description: t.center_modern_labs_desc
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.center_expert_instructors,
      description: t.center_expert_instructors_desc
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t.center_certification,
      description: t.center_certification_desc
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t.center_digital_library,
      description: t.center_digital_library_desc
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: t.center_high_speed_internet,
      description: t.center_high_speed_internet_desc
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t.center_flexible_schedule,
      description: t.center_flexible_schedule_desc
    }
  ];

  const courses = [
    {
      title: t.center_web_dev,
      duration: t.center_web_dev_duration,
      level: t.center_web_dev_level,
      description: t.center_web_dev_desc
    },
    {
      title: t.center_mobile_dev,
      duration: t.center_mobile_dev_duration,
      level: t.center_mobile_dev_level,
      description: t.center_mobile_dev_desc
    },
    {
      title: t.center_data_science,
      duration: t.center_data_science_duration,
      level: t.center_data_science_level,
      description: t.center_data_science_desc
    },
    {
      title: t.center_cybersecurity,
      duration: t.center_cybersecurity_duration,
      level: t.center_cybersecurity_level,
      description: t.center_cybersecurity_desc
    }
  ];

  const galleryImages = [
    { id: 1, title: "Modern Computer Lab", category: "facility" },
    { id: 2, title: "Students Learning", category: "students" },
    { id: 3, title: "Classroom Session", category: "education" },
    { id: 4, title: "Graduation Ceremony", category: "achievement" },
    { id: 5, title: "Group Project Work", category: "students" },
    { id: 6, title: "Technology Equipment", category: "facility" }
  ];

  return (
    <section id="samarkand-center" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {t.center_title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.center_description}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-full p-1 flex space-x-2">
            {[t.center_overview, t.center_courses, t.center_gallery].map((tab, index) => {
              const tabKey = ['overview', 'courses', 'gallery'][index];
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeTab === tabKey
                      ? 'gradient-bg text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t.center_about}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t.center_about_text}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.center_about_text2}
                </p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t.center_achievements}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{t.center_achievement1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{t.center_achievement2}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{t.center_achievement3}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">{t.center_achievement4}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-6 hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="gradient-bg text-white rounded-lg p-3 inline-block mb-4">
                    {facility.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {facility.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {facility.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-8 hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {course.title}
                    </h4>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {course.description}
                  </p>
                  <motion.button
                    className="mt-6 px-6 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.learn_more}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="glass rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <div className="text-sm">{image.title}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {image.title}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {image.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SamarkandCenter;
