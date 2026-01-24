import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layout & UI
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatBot from "./components/ui/ChatBot";
import ScrollToTop from "./components/ui/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import CustomCursor from "./components/ui/CustomCursor";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

/**
 * App Component
 * Features: React Router Integration, Framer Motion AnimatePresence, Global Layout
 * Path: src/App.jsx
 */

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <CustomCursor />
      {/* Navigation - Always visible */}
      <Navbar />
      <ScrollToTop />
      {/* AnimatePresence is required to detect when a component 
          is leaving the DOM so it can play the 'exit' animation.
      */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </AnimatePresence>

      {/* Global Components */}
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
