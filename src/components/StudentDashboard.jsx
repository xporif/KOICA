import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Users, Calendar, LogOut, User, Phone, MapPin, CalendarDays, Home, ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { initialStudents } from '../data/students';
import AddStudentModal from './AddStudentModal';

const StudentDashboard = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState(initialStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateColumns, setDateColumns] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  
  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
    setIsEditing(false);
  };

  const handleEditStudent = () => {
    setIsEditing(true);
    setEditFormData(selectedStudent);
  };

  const handleSaveEdit = () => {
    setStudents(students.map(student => 
      student.id === selectedStudent.id ? editFormData : student
    ));
    setSelectedStudent(editFormData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(selectedStudent);
  };

  const handleDeleteStudent = () => {
    if (window.confirm('Haqiqatan ham bu o\'quvchini o\'chirmoqchimisiz?')) {
      setStudents(students.filter(student => student.id !== selectedStudent.id));
      setShowStudentModal(false);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Sticky Header */}
      <motion.div
        className="sticky top-16 z-40 glass border-b border-white/20"
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
              <Link
                to="/"
                className="glass px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500/10 transition-colors"
              >
                <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400">{t.back_to_site}</span>
              </Link>
              
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
                        <span 
                          className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          onClick={() => handleStudentClick(student)}
                        >
                          {student.fullName}
                        </span>
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

      {/* Student Details Modal */}
      <AnimatePresence>
        {showStudentModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStudentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold gradient-text">O'quvchi ma'lumotlari</h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    O'quvchi ismi
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.fullName}
                      onChange={(e) => handleEditChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {selectedStudent.fullName}
                    </div>
                  )}
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tug'ilgan sana
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editFormData.birthDate}
                      onChange={(e) => handleEditChange('birthDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {selectedStudent.birthDate}
                    </div>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Viloyat
                  </label>
                  {isEditing ? (
                    <select
                      value={editFormData.region}
                      onChange={(e) => handleEditChange('region', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    >
                      <option value="Toshkent">Toshkent</option>
                      <option value="Samarqand">Samarqand</option>
                      <option value="Buxoro">Buxoro</option>
                      <option value="Andijon">Andijon</option>
                      <option value="Farg'ona">Farg'ona</option>
                      <option value="Namangan">Namangan</option>
                      <option value="Jizzax">Jizzax</option>
                      <option value="Qashqadaryo">Qashqadaryo</option>
                      <option value="Sirdaryo">Sirdaryo</option>
                      <option value="Surxondaryo">Surxondaryo</option>
                      <option value="Qoraqalpog'iston">Qoraqalpog'iston</option>
                      <option value="Xorazm">Xorazm</option>
                      <option value="Navoiy">Navoiy</option>
                    </select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {selectedStudent.region}
                    </div>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tuman
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.district}
                      onChange={(e) => handleEditChange('district', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {selectedStudent.district}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefon raqami
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) => handleEditChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {selectedStudent.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 mt-6">
                {!isEditing ? (
                  <>
                    <motion.button
                      onClick={handleEditStudent}
                      className="flex-1 gradient-bg text-white py-3 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Tahrirlash
                    </motion.button>
                    <motion.button
                      onClick={handleDeleteStudent}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      O'chirish
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Saqlash
                    </motion.button>
                    <motion.button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Bekor qilish
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
