import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import Transition from "../components/ui/Transition";
import { useState } from "react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Transition>
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Sleek Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight"
          >
            Bytebly Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
          >
            Explore cutting-edge ideas, in-depth tutorials, and expert perspectives shaping the future of technology.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Refined Grid with Advanced Animations */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredPosts.map((post, index) => (
            <motion.div 
              key={post.id} 
              layout
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 100 
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 flex flex-col transform-gpu"
              style={{ perspective: "1000px" }}
            >
              {/* Enhanced Image Section */}
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Content with Better Spacing */}
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-8 line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-3 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 group/link"
                >
                  <span>Read Full Article</span>
                  <motion.svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-2"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No posts found in this category. Try another one!</p>
          </motion.div>
        )}
      </section>
    </Transition>
  );
}