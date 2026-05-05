import React from 'react';
import { motion } from 'framer-motion';
import { Globe, GraduationCap, Heart, Users } from 'lucide-react';

const AboutKoica = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Cooperation",
      description: "Promoting international development partnerships and sustainable growth worldwide."
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Education Excellence",
      description: "Providing quality education and training programs to empower communities."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Support",
      description: "Supporting local communities through various development initiatives."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Partnership Building",
      description: "Creating strong partnerships between Korea and partner countries."
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
            About KOICA
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Korea International Cooperation Agency is dedicated to supporting education, 
            IT development, and sustainable growth in Uzbekistan and around the world.
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
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              KOICA aims to contribute to the common prosperity of humanity by promoting 
              equitable and sustainable development in partner countries. We focus on 
              education, technology transfer, and capacity building to create lasting impact.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To be a leading development cooperation agency that fosters inclusive growth, 
              promotes innovation, and builds strong partnerships between Korea and the global community.
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
              KOICA in Uzbekistan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Since establishing our presence in Uzbekistan, KOICA has been instrumental in 
              supporting various development projects focusing on education, information technology, 
              and human resource development. Our programs have helped thousands of students 
              and professionals gain valuable skills and knowledge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Development Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Students Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-300">Years of Partnership</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutKoica;
