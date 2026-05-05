import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AddStudentModal = ({ onClose, onAddStudent }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    region: '',
    district: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.birthDate || !formData.region || !formData.district || !formData.phone) {
      alert(t.all_fields_required);
      return;
    }

    onAddStudent(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative glass rounded-2xl p-8 max-w-md w-full mx-auto"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {t.add_student_title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t.add_student_subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                {t.full_name}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t.full_name_placeholder}
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                {t.birth_date}
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                {t.region}
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">{t.select_region}</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Andijon">Andijon</option>
                <option value="Farg‘ona">Farg‘ona</option>
                <option value="Namangan">Namangan</option>
                <option value="Jizzax">Jizzax</option>
                <option value="Qashqadaryo">Qashqadaryo</option>
                <option value="Sirdaryo">Sirdaryo</option>
                <option value="Surxondaryo">Surxondaryo</option>
                <option value="Qoraqalpog‘iston">Qoraqalpog‘iston</option>
                <option value="Xorazm">Xorazm</option>
                <option value="Navoiy">Navoiy</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                {t.district}
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t.district_placeholder}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                {t.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={t.phone_placeholder}
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.add_student_button}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddStudentModal;
