import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Calendar, LogOut, User, Phone, MapPin, CalendarDays } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { initialStudents } from '../data/students';
import AddStudentModal from './AddStudentModal';

const StudentDashboard = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState(initialStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateColumns, setDateColumns] = useState([]);

  // Sana mantiqi - 1 apreldan boshlab
  useEffect(() => {
    const startDate = new Date(2025, 3, 1); // 1-aprel 2025
    const today = new Date();
    const days = [];
    
    // Faqat ish kunlarini (Dushanba-Juma) qo'shamiz
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // 1=Dushanba, 5=Juma
        days.push({
          date: new Date(d),
          dateString: d.toLocaleDateString('uz-UZ'),
          dayName: d.toLocaleDateString('uz-UZ', { weekday: 'long' })
        });
      }
    }
    
    setDateColumns(days);
    
    // Simulate attendance data
    const simulatedAttendance = {};
    days.forEach((day, index) => {
      const presentCount = Math.floor(Math.random() * 5) + students.length - 5; // 14-19 talaba
      simulatedAttendance[day.dateString] = presentCount;
    });
    setAttendanceData(simulatedAttendance);
  }, [students]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleAddStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: students.length + 1
    };
    setStudents([...students, studentWithId]);
    setShowAddModal(false);
  };

  const getTodayAttendance = () => {
    const today = new Date().toLocaleDateString('uz-UZ');
    return attendanceData[today] || 0;
  };

  const getAttendancePercentage = () => {
    const totalDays = dateColumns.length;
    if (totalDays === 0) return 0;
    
    const totalPresent = Object.values(attendanceData).reduce((sum, count) => sum + count, 0);
    const totalPossible = students.length * totalDays;
    
    return Math.round((totalPresent / totalPossible) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Sticky Header */}
      <motion.div
        className="sticky top-0 z-40 glass border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                {t.dashboard_title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t.dashboard_subtitle}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowAddModal(true)}
                className="gradient-bg text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span>{t.add_student_button}</span>
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="glass px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400">{t.logout}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.total_students}</p>
                <p className="text-3xl font-bold gradient-text">{students.length}</p>
              </div>
              <div className="p-3 gradient-bg rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.today_attendance}</p>
                <p className="text-3xl font-bold gradient-text">{getTodayAttendance()}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.attendance_rate}</p>
                <p className="text-3xl font-bold gradient-text">{getAttendancePercentage()}%</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Attendance Table */}
        <motion.div
          className="glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
            <h2 className="text-white font-semibold text-lg">{t.attendance_table}</h2>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {t.student_name}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {t.birth_date}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {t.region}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {t.district}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {t.phone}
                  </th>
                  
                  {/* Dynamic Date Columns */}
                  {dateColumns.slice(-7).map((day, index) => (
                    <th
                      key={index}
                      className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                        day.dayName === 'Shanba' || day.dayName === 'Yakshanba'
                          ? 'text-gray-400 bg-gray-100 dark:bg-gray-700'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div>{day.dayName}</div>
                      <div className="text-xs opacity-75">{day.dateString}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {student.birthDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        {student.region}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {student.district}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {student.phone}
                      </div>
                    </td>
                    
                    {/* Dynamic Attendance Data */}
                    {dateColumns.slice(-7).map((day, dayIndex) => {
                      const isWeekend = day.dayName === 'Shanba' || day.dayName === 'Yakshanba';
                      const isPresent = Math.random() > 0.1; // 90% chance of being present
                      
                      return (
                        <td
                          key={dayIndex}
                          className={`px-4 py-4 text-center text-sm ${
                            isWeekend
                              ? 'bg-gray-100 dark:bg-gray-700'
                              : isPresent
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          }`}
                        >
                          {isWeekend ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <span className="font-medium">
                              {isPresent ? '+' : '-'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {t.total_students}: <span className="font-semibold">{students.length}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {t.working_days}: <span className="font-semibold">{dateColumns.length}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {t.today_date}: <span className="font-semibold">{new Date().toLocaleDateString('uz-UZ')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddStudentModal
            onClose={() => setShowAddModal(false)}
            onAddStudent={handleAddStudent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
