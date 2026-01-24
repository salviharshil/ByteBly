import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { blogPosts } from "../data/blogData";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Heart,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import Transition from "../components/ui/Transition";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const smoothParallax = useSpring(parallaxY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (!post) {
    return (
      <Transition>
        <div className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-gray-400 mb-4">
              Post Not Found
            </h2>
            <p className="text-gray-500 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Back to Insights
            </Link>
          </motion.div>
        </div>
      </Transition>
    );
  }

  // Extract headings for table of contents (assuming content has h2, h3 tags)
  const headings = post.content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi) || [];
  const tocItems = headings.map((heading, index) => {
    const level = heading.startsWith("<h2") ? 2 : 3;
    const text = heading.replace(/<[^>]*>/g, "");
    const id = `heading-${index}`;
    return { id, text, level };
  });

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Calculate estimated read time (rough estimate: 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <Transition>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 z-50"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <article className="pt-32 pb-24 px-6 max-w-6xl mx-auto" ref={contentRef}>
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to Insights</span>
          </Link>
        </motion.div>

        {/* Hero Image with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 overflow-hidden rounded-3xl border border-slate-700/50 shadow-2xl"
          style={{ y: smoothParallax }}
        >
          <img
            src={post.image}
            className="w-full h-[300px] md:h-[500px] object-cover"
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              {post.category}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 ${isLiked ? "bg-red-500 text-white" : "bg-black/50 text-gray-300 hover:bg-red-500/20"}`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-full transition-all duration-300 ${isBookmarked ? "bg-yellow-500 text-white" : "bg-black/50 text-gray-300 hover:bg-yellow-500/20"}`}
              >
                <Bookmark
                  size={20}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sidebar) */}
          {tocItems.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1 order-2 lg:order-1"
            >
              <div className="sticky top-32 bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-bold mb-4 text-cyan-400">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tocItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm hover:text-cyan-400 transition-colors duration-300 ${
                        item.level === 3
                          ? "ml-4 text-gray-400"
                          : "text-gray-300"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <div
            className={`${tocItems.length > 0 ? "lg:col-span-3" : "lg:col-span-4"} order-1 lg:order-2`}
          >
            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-6 text-gray-500 text-sm mb-8 uppercase tracking-widest font-semibold"
            >
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {readTime} min read
              </span>
              {post.author && (
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl md:text-4xl font-black mb-12 leading-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent"
            >
              {post.title}
            </motion.h1>

            {/* Social Sharing & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <span className="text-gray-400 font-medium">Share:</span>
              <button
                onClick={() => handleShare("twitter")}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Twitter size={20} className="text-cyan-400" />
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Facebook size={20} className="text-blue-500" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} className="text-blue-700" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Share2 size={20} className="text-gray-400" />
              </button>
            </motion.div>

            {/* Content */}
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="prose prose-invert prose-xl max-w-none text-gray-300 leading-relaxed mb-20 text-xl text-justify"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/<p/g, '<p class="mb-8"')
                    .replace(/<h[2-3]/g, (match, offset, string) => {
                      const index = (
                        string.substring(0, offset).match(/<h[2-3]/g) || []
                      ).length;
                      return `${match} id="heading-${index}"`;
                    }),
                }}
              />
            </motion.div>

            {/* Author Bio */}
            {post.author && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 mb-16"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      About {post.author}
                    </h3>
                    <p className="text-gray-400">
                      Tech enthusiast and writer passionate about sharing
                      insights on the latest trends in software development and
                      digital innovation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comments Placeholder */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <MessageCircle size={24} className="text-cyan-400" />
                <h3 className="text-xl font-bold">Comments</h3>
              </div>
              <p className="text-gray-400 mb-4">Join the conversation! Share your thoughts below.</p>
              <textarea 
                placeholder="Write a comment..." 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-cyan-500 transition-colors"
                rows="4"
              ></textarea>
              <button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                Post Comment
              </button>
            </motion.div> */}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-slate-700/50 pt-16"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${relatedPost.id}`}
                    className="group block bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-2"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="p-6">
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </Transition>
  );
}
