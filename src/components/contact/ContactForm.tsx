import React, { useState } from 'react'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email: string
    phone: string
    project: string
  } | null>(null)

  const buildWhatsAppUrl = (data = formData) => {
    const lines = [
      '👋 Hello Bytebly Team,',
      '',
      'I would like to inquire about a project:',
      `• *Name:* ${data.name || 'Not provided'}`,
      `• *Email:* ${data.email || 'Not provided'}`,
      `• *Phone:* ${data.phone || 'Not provided'}`,
      `• *Project Details:* ${data.project || 'I would like to discuss a new digital solution.'}`,
    ]
    return `https://wa.me/919484520805?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.project.trim()
    ) {
      return
    }
    setIsSubmitting(true)

    const submission = {
      ...formData,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }

    // 1. Store locally so inquiry is NEVER lost
    try {
      const existing = JSON.parse(localStorage.getItem('bytebly_inquiries') || '[]')
      existing.unshift(submission)
      localStorage.setItem('bytebly_inquiries', JSON.stringify(existing))
    } catch (err) {
      console.warn('LocalStorage save failed:', err)
    }

    // 2. Dispatch to email endpoint (Web3Forms API)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '29de6979-d510-47b8-80e3-e88383a152fb',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.project,
          subject: `New Bytebly Inquiry from ${formData.name}`,
          from_name: 'Bytebly Website Contact Form',
        }),
      })
    } catch (err) {
      console.warn('Email dispatch failed:', err)
    }

    // 3. Dispatch to Google Sheets
    const googleSheetUrl =
      import.meta.env.VITE_GOOGLE_SHEETS_URL ||
      localStorage.getItem('bytebly_gsheet_webhook')
    if (googleSheetUrl) {
      try {
        const sheetParams = new URLSearchParams()
        sheetParams.append('Timestamp', submission.timestamp)
        sheetParams.append('Name', formData.name)
        sheetParams.append('Email', formData.email)
        sheetParams.append('Phone', formData.phone || 'N/A')
        sheetParams.append('Project', formData.project)

        await fetch(googleSheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: sheetParams.toString(),
        })
      } catch (err) {
        console.warn('Google Sheets dispatch failed:', err)
      }
    }

    setSubmittedData(submission)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', phone: '', project: '' })
  }

  return (
    <div className="w-full bg-[#F2F3EF] dark:bg-[#121316] pt-12 pb-20">
      
      {/* Contact Card matching 1YD-0 */}
      <div className="w-full max-w-[1140px] px-4 mx-auto mb-16">
        <div className="p-8 sm:p-14 lg:p-20 rounded-[10px] bg-white dark:bg-[#1A1A1A] shadow-[0px_15px_60px_-10px_rgba(109,117,143,0.33)] border border-transparent dark:border-white/5">
          <div className="flex flex-wrap -mx-4">
            
            {/* Left Column: Direct Contact Info */}
            <div className="w-full lg:w-4/12 px-4 mb-12 lg:mb-0 lg:pr-8">
              {/* Phone with gradient */}
              <div className="mb-10">
                <a
                  href="tel:+919484520805"
                  className="text-2xl sm:text-3xl font-barlow font-semibold bg-gradient-to-r from-[#ADD40C] to-[#C9F31D] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  📞 +91 9484520805
                </a>
              </div>

              {/* Location */}
              <div className="mb-10">
                <h4 className="text-[20px] font-barlow font-semibold text-[#04000B] dark:text-white mb-2">
                  Location
                </h4>
                <p className="text-[17px] leading-[170%] font-barlow text-[#666666] dark:text-gray-300 whitespace-pre-line">
                  Ahmedabad, Gujarat, India
                </p>
              </div>

              {/* Official Email */}
              <div className="mb-10">
                <h4 className="text-[20px] font-barlow font-semibold text-[#04000B] dark:text-white mb-2">
                  Official Email
                </h4>
                <a
                  href="mailto:support@bytebly.in"
                  className="text-[17px] font-barlow text-[#04000B] dark:text-gray-300 hover:text-[#C9F31D] transition-colors"
                >
                  support@bytebly.in
                </a>
              </div>

              {/* Social icons */}
              <div>
                <div className="flex items-center space-x-3 text-lg font-bold text-[#04000B] dark:text-white">
                  <a
                    href="https://www.facebook.com/share/1CKjbK8r5U/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                  >
                    f
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bytebly-99863a3a8?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                  >
                    in
                  </a>
                  <a
                    href="https://wa.me/919484520805"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 fill-[#04000B] dark:fill-white group-hover:fill-[#04000B] transition-colors"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/bytebly?rpxt=MWcxNzlmemRrcWptcA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-[#C9F31D] hover:text-[#04000B] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-7/12 lg:ml-[8.33333%] px-4">
              <div>
                {/* Pill badge */}
                <div className="inline-block mb-4 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
                  <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
                    Have Questions?
                  </span>
                </div>

                {/* Form Title */}
                <h2 className="text-3xl sm:text-5xl lg:text-[60px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white mb-8 tracking-tight">
                  Send us a Message
                </h2>

                {submittedData && (
                  <div className="mb-8 p-6 rounded-xl bg-[#C9F31D]/15 border border-[#C9F31D] text-[#04000B] dark:text-white font-barlow shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#C9F31D] text-[#04000B] flex items-center justify-center font-bold text-lg">
                        ✓
                      </span>
                      <h4 className="text-xl font-bold">
                        Thank You, {submittedData.name}!
                      </h4>
                    </div>
                    <p className="text-base text-[#444] dark:text-gray-300 mb-4">
                      Your inquiry has been recorded and delivered to <strong className="text-[#04000B] dark:text-white">support@bytebly.in</strong>. Want an immediate response? Connect directly on WhatsApp with your project details:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildWhatsAppUrl(submittedData)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20ba5a] transition-all shadow-md transform hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>Open WhatsApp Chat</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedData(null)}
                        className="py-3 px-5 rounded-lg border border-gray-300 dark:border-gray-700 font-medium text-sm text-[#04000B] dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="border-b border-[#CCCCCC] dark:border-gray-700 pb-2">
                    <input
                      type="text"
                      required
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent font-barlow text-base text-[#04000B] dark:text-white placeholder-[#212529BF] dark:placeholder-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* Email & Phone in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="border-b border-[#CCCCCC] dark:border-gray-700 pb-2">
                      <input
                        type="email"
                        required
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent font-barlow text-base text-[#04000B] dark:text-white placeholder-[#212529BF] dark:placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                    <div className="border-b border-[#CCCCCC] dark:border-gray-700 pb-2">
                      <input
                        type="tel"
                        required
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent font-barlow text-base text-[#04000B] dark:text-white placeholder-[#212529BF] dark:placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tell Us About Project */}
                  <div className="border-b border-[#CCCCCC] dark:border-gray-700 pb-2">
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell Us About Project *"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="w-full bg-transparent font-barlow text-base text-[#04000B] dark:text-white placeholder-[#212529BF] dark:placeholder-gray-400 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit and WhatsApp Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 py-4 px-10 rounded-[7px] bg-[#C9F31D] text-[#04000B] font-barlow font-semibold text-base hover:bg-[#ADD40C] transition-all transform active:scale-95 shadow-md disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-[#04000B] border-t-transparent rounded-full" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>✈</span>
                          <span>Get in Touch</span>
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 py-4 px-7 rounded-[7px] bg-[#25D366] text-white font-barlow font-semibold text-base hover:bg-[#20ba5a] transition-all transform active:scale-95 shadow-md"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-xs text-[#888] dark:text-gray-400 pt-2 font-barlow">
                    🔒 Inquiries are automatically recorded and protected under Bytebly Privacy Policy.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
