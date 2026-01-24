import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

import Transition from "../components/ui/Transition";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(
        import.meta.env.VITE_API_CONTACT_APPSCRIPT,
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      alert(err, "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition>
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-20 text-center mx-auto flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
            Let’s Create <br />
            Something <span className="text-gradient">Iconic</span>
          </h1>

          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Got an idea, product, or startup in mind? We help teams turn
            ambitious visions into high-impact digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-14 items-start">
          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass p-8 rounded-3xl space-y-8 border border-white/10">
              <InfoItem
                icon={<Mail />}
                title="Email"
                value="hr@bytebly.in"
                color="text-primary"
              />
              <InfoItem
                icon={<Phone />}
                title="Phone"
                value="+91 7567551327"
                color="text-secondaryCyan"
              />
              <InfoItem
                icon={<MapPin />}
                title="Location"
                value="Remote-First · Global Team"
                color="text-neonPurple"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
  {[
    { name: "LinkedIn", url: "https://www.linkedin.com/in/byte-bly-99863a3a8" },
    { name: "Twitter / X", url: "https://x.com/bytebly" },
  ].map((item) => (
    <a
      key={item.name}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass p-4 rounded-2xl text-center text-xs font-bold tracking-widest uppercase cursor-pointer hover:bg-white/10 transition"
    >
      {item.name}
    </a>
  ))}
</div>
          </motion.div>

          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/20 space-y-10"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Start Your <span className="text-primary">Project</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Share a few details and our team will get back to you
                      within 24 hours.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Select
                      label="Project Type"
                      options={[
                        "MERN Stack Development",
                        "Shopify E-commerce",
                        "WordPress / CMS",
                        "UI/UX Design",
                      ]}
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                    />

                    <Select
                      label="Estimated Budget"
                      options={[
                        "₹5k – ₹10k",
                        "₹10k – ₹25k",
                        "₹25k – ₹50k",
                        "₹50k+",
                      ]}
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    />
                  </div>

                  <Textarea
                    label="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />

                  <button
                    disabled={loading}
                    className="group w-full bg-gradient-to-r from-primary to-cyan-400 py-5 rounded-2xl font-bold text-black flex items-center justify-center gap-3 transition hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? "Sending…" : "Send Inquiry"}
                    {!loading && (
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <SuccessCard onReset={() => setSubmitted(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Transition>
  );
}

/* ---------------- UI Components ---------------- */

function InfoItem({ icon, title, value, color }) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500 ml-1">
        {label}
      </label>
      <input {...props} className="w-full input text-white" />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500 ml-1">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full input text-white appearance-none pr-10 bg-white/5 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/30"
        >
          <option value="" disabled className="bg-[#0A0A0F] text-gray-400">
            Select
          </option>

          {options.map((o) => (
            <option key={o} value={o} className="bg-[#0A0A0F] text-white">
              {o}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500 ml-1">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full input h-40 resize-none text-white"
      />
    </div>
  );
}

function SuccessCard({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-16 rounded-[2.5rem] border border-primary/30 text-center"
    >
      <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 size={40} className="text-primary" />
      </div>
      <h2 className="text-4xl font-bold mb-4">Message Sent</h2>
      <p className="text-gray-400 max-w-sm mx-auto mb-8">
        Thanks for reaching out! Our team will contact you within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-bold"
      >
        Send another message
      </button>
    </motion.div>
  );
}
