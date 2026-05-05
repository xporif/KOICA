import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      title: "Modern Computer Lab",
      category: "Facilities",
      description: "State-of-the-art computer lab with latest technology",
      emoji: "💻"
    },
    {
      id: 2,
      title: "Classroom Session",
      category: "Education",
      description: "Interactive learning sessions with expert instructors",
      emoji: "📚"
    },
    {
      id: 3,
      title: "Students Working",
      category: "Students",
      description: "Students engaged in collaborative project work",
      emoji: "👥"
    },
    {
      id: 4,
      title: "Graduation Ceremony",
      category: "Achievement",
      description: "Celebrating the success of our graduates",
      emoji: "🎓"
    },
    {
      id: 5,
      title: "Technology Equipment",
      category: "Facilities",
      description: "Modern equipment and infrastructure",
      emoji: "🖥️"
    },
    {
      id: 6,
      title: "Group Discussion",
      category: "Education",
      description: "Interactive group discussions and brainstorming",
      emoji: "💡"
    },
    {
      id: 7,
      title: "Korean Instructor",
      category: "Education",
      description: "Korean expert instructor teaching advanced topics",
      emoji: "👨‍🏫"
    },
    {
      id: 8,
      title: "Student Presentation",
      category: "Students",
      description: "Students presenting their projects",
      emoji: "📊"
    },
    {
      id: 9,
      title: "Library Study Area",
      category: "Facilities",
      description: "Quiet study area in our digital library",
      emoji: "📖"
    }
  ];

  const categories = ["All", "Facilities", "Education", "Students", "Achievement"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our modern facilities, engaged students, and the vibrant learning environment at KOICA Training Center.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-full p-1 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all text-sm ${
                  selectedCategory === category
                    ? 'gradient-bg text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative overflow-hidden rounded-xl glass hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="text-6xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {image.emoji}
                </motion.div>
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ZoomIn className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {image.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                    {image.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>

                {/* Image */}
                <div className="h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
                  <div className="text-8xl">{selectedImage.emoji}</div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                      {selectedImage.title}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                      {selectedImage.category}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Want to See More?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Visit our campus to experience the vibrant learning environment firsthand.
          </p>
          <motion.button
            className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Campus Tour
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
