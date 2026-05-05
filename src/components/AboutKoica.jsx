import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, Heart, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutKoica = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.about_global_cooperation,
      description: t.about_global_cooperation_desc
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: t.about_education_excellence,
      description: t.about_education_excellence_desc
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t.about_community_support,
      description: t.about_community_support_desc
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.about_partnership_building,
      description: t.about_partnership_building_desc
    }
  ];

  return (
    <section id="about-koica" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {t.about_title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.about_description}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t.about_mission}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about_mission_text}
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t.about_vision}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about_vision_text}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="gradient-bg text-white rounded-lg p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t.about_koica_uzbekistan}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t.about_koica_uzbekistan_text}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">{t.about_development_projects}</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-300">{t.about_students_trained}</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-300">{t.about_years_partnership}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutKoica;
