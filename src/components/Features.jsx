import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Globe, Briefcase } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "IT Education",
      description: "Comprehensive IT training programs covering web development, mobile apps, data science, and cybersecurity.",
      highlights: ["Modern Curriculum", "Hands-on Learning", "Industry Experts"]
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Modern Technology",
      description: "State-of-the-art facilities equipped with the latest hardware, software, and high-speed internet.",
      highlights: ["Advanced Labs", "Cloud Computing", "AI Tools"]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Korean Partnership",
      description: "Strong collaboration with Korean educational institutions and tech companies for knowledge exchange.",
      highlights: ["Expert Instructors", "Exchange Programs", "Korean Standards"]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Career Opportunities",
      description: "Excellent job placement support and connections with leading tech companies in Uzbekistan and beyond.",
      highlights: ["Job Placement", "Career Counseling", "Networking Events"]
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Our Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover what makes KOICA Training Center the premier destination for IT education in Uzbekistan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="glass rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="gradient-bg text-white rounded-xl p-4 inline-block mb-6 group-hover:animate-pulse"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          className="mt-20 glass rounded-3xl p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Our Impact in Numbers
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transforming lives through quality IT education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2000+", label: "Graduates" },
              { number: "50+", label: "Expert Instructors" },
              { number: "20+", label: "IT Courses" },
              { number: "85%", label: "Employment Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
