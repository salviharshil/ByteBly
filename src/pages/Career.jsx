import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react";
import Transition from "../components/ui/Transition";

/* ------------------ DATA ------------------ */
const positions = [
  {
    id: 1,
    title: "Senior MERN Stack Developer",
    type: "Full-Time",
    location: "Remote",
  },
  {
    id: 2,
    title: "UI/UX Product Designer",
    type: "Contract",
    location: "Worldwide",
  },
  {
    id: 3,
    title: "Shopify Liquid Specialist",
    type: "Full-Time",
    location: "Remote",
  },
  {
    id: 4,
    title: "Project Manager (Technical)",
    type: "Full-Time",
    location: "Europe / Asia",
  },
];

const whyChooseUs = [
  "100% Remote & Flexible Culture",
  "Work on Real-World Scalable Products",
  "Fast Career Growth & Ownership",
  "People-First, No Micromanagement",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["pdf", "doc", "docx"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------ COMPONENT ------------------ */
export default function Career() {
  const formRef = useRef(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
  });

  /* ------------------ HANDLERS ------------------ */
  const selectJob = (job) => {
    setSelectedJob(job);

    // Mobile behavior remains SAME
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFile = (file) => {
    if (!file) return "Resume is required";
    if (file.size > MAX_FILE_SIZE) return "File must be under 5MB";
    if (!ALLOWED_FILE_TYPES.includes(file.name.split(".").pop().toLowerCase()))
      return "Only PDF, DOC, DOCX allowed";
    return null;
  };

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!emailRegex.test(form.email)) e.email = "Valid email required";
    if (!resume) e.resume = "Resume required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  //drive google sheet
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const base64Resume = await toBase64(resume);
    
    const payload = {
  name: form.name,
  email: form.email,
  phone: form.phone,
  experience: form.experience,
  portfolio: form.portfolio,
  coverLetter: form.coverLetter,
  role: selectedJob.title,
  fileName: resume.name,
  mimeType: resume.type,
  base64: base64Resume
};

    // Replace with your Google Web App URL
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_API_CARRER_APPSCRIPT;

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Essential for Google Scripts
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitted(true);
  } catch (err) {
    setSubmitError("Failed to connect to the server. Please check your connection.");
    console.error(err);
  } finally {
    setIsSubmitting(false);
  }
};

  /* ------------------ UI ------------------ */
  return (
    <Transition>
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build the <span className="text-gradient">Future</span> With Us
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Join a remote-first team building meaningful digital products.
          </p>
        </header>

        {/* WHY CHOOSE US */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl text-center">
                <Star className="mx-auto text-primary mb-3" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -------- DESKTOP LOGIC FIX HERE -------- */}
        <motion.div
          layout
          className={`grid gap-16 items-start transition-all
            ${
              selectedJob
                ? "lg:grid-cols-2"
                : "lg:grid-cols-1 lg:justify-center"
            }`}
        >
          {/* JOB LIST */}
          {/* JOB LIST */}
          <motion.div
            layout
            className={`${
              !selectedJob ? "lg:max-w-5xl lg:mx-auto w-full" : ""
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="text-primary" /> Open Positions
            </h2>

            {positions.map((job) => (
              <motion.div
                key={job.id}
                layout
                whileHover={{ scale: 1.02 }}
                onClick={() => selectJob(job)}
                className={`glass p-6 rounded-2xl mb-4 cursor-pointer border transition
        ${
          selectedJob?.id === job.id
            ? "border-primary bg-primary/5"
            : "border-white/10 hover:border-primary/40"
        }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-400">
                      {job.type} • {job.location}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* FORM */}
          <div ref={formRef}>
            <AnimatePresence>
              {selectedJob && !submitted && (
                <motion.form
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0 }}
  onSubmit={handleSubmit}
  className="glass p-8 lg:p-10 rounded-[2.5rem] border border-white/20 space-y-10"
>
  {/* Header */}
  <div className="space-y-2">
    <h2 className="text-2xl font-bold">
      Apply for <span className="text-primary">{selectedJob.title}</span>
    </h2>
    <p className="text-sm text-gray-400">
      Fill in your details carefully. Our team will review your application.
    </p>
  </div>

  {/* Personal Information */}
  <div className="space-y-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
      Personal Information
    </h3>

    <div className="space-y-1">
      <input
        name="name"
        placeholder="Full Name *"
        className="input border border-white/20"
        onChange={handleChange}
      />
      {errors.name && (
        <p className="text-red-500 text-xs">{errors.name}</p>
      )}
    </div>

    <div className="space-y-1">
      <input
        name="email"
        type="email"
        placeholder="Email Address *"
        className="input border border-white/20"
        onChange={handleChange}
      />
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email}</p>
      )}
    </div>

    <div className="space-y-1">
      <input
        name="phone"
        placeholder="Phone Number"
        className="input border border-white/20"
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Professional Details */}
  <div className="space-y-6">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
      Professional Details
    </h3>

    <div className="space-y-1">
      <input
        name="experience"
        placeholder="Years of Experience (e.g. 0-1, 1-3, 3+)"
        className="input border border-white/20"
        onChange={handleChange}
      />
    </div>

    <div className="space-y-1">
      <input
        name="portfolio"
        placeholder="Portfolio / GitHub / LinkedIn URL"
        className="input border border-white/20"
        onChange={handleChange}
      />
    </div>

    <div className="space-y-1">
      <textarea
        name="coverLetter"
        rows={4}
        placeholder="Why should we hire you? (Optional)"
        className="input resize-none border border-white/20"
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Resume Upload */}
  <div className="space-y-3">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
      Resume
    </h3>

    <div className="glass border border-dashed border-white/30 rounded-xl p-4 space-y-2">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="w-full text-sm text-gray-300"
        onChange={(e) => {
          const err = validateFile(e.target.files[0]);
          if (err) return setErrors({ ...errors, resume: err });
          setResume(e.target.files[0]);
        }}
      />
      <p className="text-xs text-gray-400">
        Accepted formats: PDF, DOC, DOCX (Max 5MB)
      </p>
    </div>

    {errors.resume && (
      <p className="text-red-500 text-xs">{errors.resume}</p>
    )}
  </div>

  {/* Consent */}
  <label className="flex items-start gap-3 text-sm text-gray-400">
    <input type="checkbox" required className="mt-1 accent-primary" />
    I confirm that the information provided is accurate and complete.
  </label>

  {/* Submit */}
  <button
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-primary to-cyan-400 py-4 rounded-xl font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
  >
    {isSubmitting ? "Submitting Application..." : "Submit Application"}
  </button>

  {submitError && (
    <p className="text-red-500 text-sm text-center">{submitError}</p>
  )}
</motion.form>

              )}

              {submitted && (
                <motion.div className="glass p-10 rounded-2xl text-center">
                  <CheckCircle2
                    className="mx-auto text-primary mb-4"
                    size={40}
                  />
                  <h2 className="text-2xl font-bold">Application Submitted</h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </Transition>
  );
}
