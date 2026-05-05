import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Computer, Users, Award, BookOpen, Wifi, Clock } from 'lucide-react';

const SamarkandCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const facilities = [
    {
      icon: <Computer className="w-6 h-6" />,
      title: "Modern Computer Labs",
      description: "State-of-the-art computer labs with latest technology and high-speed internet"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Instructors",
      description: "Experienced Korean and local instructors providing quality education"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification Programs",
      description: "Internationally recognized certification programs and diplomas"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Digital Library",
      description: "Comprehensive digital library with access to global learning resources"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "High-Speed Internet",
      description: "High-speed internet connectivity throughout the facility"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Schedule",
      description: "Flexible class schedules to accommodate working professionals"
    }
  ];

  const courses = [
    {
      title: "Web Development",
      duration: "6 months",
      level: "Beginner to Advanced",
      description: "Learn modern web development technologies including React, Node.js, and cloud deployment."
    },
    {
      title: "Mobile App Development",
      duration: "4 months",
      level: "Intermediate",
      description: "Master mobile app development for iOS and Android platforms using React Native."
    },
    {
      title: "Data Science & AI",
      duration: "8 months",
      level: "Advanced",
      description: "Comprehensive training in machine learning, data analysis, and artificial intelligence."
    },
    {
      title: "Cybersecurity",
      duration: "3 months",
      level: "Intermediate",
      description: "Learn essential cybersecurity skills and best practices for protecting digital assets."
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
            KOICA Training Center Samarkand
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A premier educational facility bringing Korean expertise and technology to Uzbekistan's future IT leaders.
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
            {['overview', 'courses', 'gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === tab
                    ? 'gradient-bg text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
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
                  About the Center
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  The KOICA Training Center in Samarkand is a state-of-the-art educational facility 
                  established to provide high-quality IT education and training to Uzbek students and professionals.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With modern classrooms, advanced computer labs, and experienced instructors from Korea 
                  and Uzbekistan, we offer comprehensive programs designed to meet the growing demand for 
                  IT skills in the digital economy.
                </p>
              </div>
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Key Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">Over 2,000 graduates since 2019</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">85% employment rate within 6 months</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">Partnerships with leading tech companies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-300">Regular workshops and seminars</span>
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
                    Learn More
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
