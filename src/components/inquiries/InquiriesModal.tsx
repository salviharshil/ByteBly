import React, { useState, useEffect } from 'react'

export interface InquiryItem {
  name: string
  email: string
  phone: string
  project: string
  timestamp: string
}

interface InquiriesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InquiriesModal: React.FC<InquiriesModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [copied, setCopied] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const loadInquiries = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('bytebly_inquiries') || '[]')
      setInquiries(stored)
    } catch {
      setInquiries([])
    }
    const savedUrl = localStorage.getItem('bytebly_gsheet_webhook') || ''
    setWebhookUrl(savedUrl)
  }

  useEffect(() => {
    if (isOpen) {
      loadInquiries()
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKey)
      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKey)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const filteredInquiries = inquiries.filter((item) => {
    const q = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.project.toLowerCase().includes(q)
    )
  })

  // Export as CSV formatted for Google Sheets
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export yet!')
      return
    }

    const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Project Message']
    const rows = inquiries.map((item) => [
      `"${item.timestamp.replace(/"/g, '""')}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${item.project.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const dateStr = new Date().toISOString().split('T')[0]
    link.href = url
    link.download = `bytebly_inquiries_${dateStr}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Copy as TSV (Tab Separated) so user can paste directly (Ctrl+V) into any Google Sheet
  const handleCopyForGoogleSheet = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to copy yet!')
      return
    }

    const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Project']
    const rows = inquiries.map((item) => [
      item.timestamp,
      item.name,
      item.email,
      item.phone || '',
      item.project.replace(/\t/g, ' ').replace(/\n/g, ' '),
    ])

    const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n')
    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const handleDelete = (index: number) => {
    if (window.confirm('Delete this inquiry?')) {
      const updated = [...inquiries]
      updated.splice(index, 1)
      setInquiries(updated)
      localStorage.setItem('bytebly_inquiries', JSON.stringify(updated))
    }
  }

  const handleClearAll = () => {
    if (inquiries.length === 0) return
    if (window.confirm('Are you sure you want to delete ALL inquiries?')) {
      setInquiries([])
      localStorage.removeItem('bytebly_inquiries')
    }
  }

  const handleAddSample = () => {
    const sample: InquiryItem = {
      name: 'Sample Client',
      email: 'client@example.com',
      phone: '+91 9484520805',
      project: 'Custom full-stack web application with responsive UI/UX and CRM integration.',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }
    const updated = [sample, ...inquiries]
    setInquiries(updated)
    localStorage.setItem('bytebly_inquiries', JSON.stringify(updated))
  }

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('bytebly_gsheet_webhook', webhookUrl.trim())
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#16171B] rounded-[24px] shadow-2xl overflow-hidden border border-[#E7E7E7] dark:border-white/10 z-10 max-h-[92vh] flex flex-col my-auto font-barlow">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 sticky top-0 bg-white/95 dark:bg-[#16171B]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#C9F31D] text-[#04000B] flex items-center justify-center text-xl font-bold shadow-md">
              📊
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#04000B] dark:text-white flex items-center gap-2">
                Inquiries & Google Sheet Manager
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C9F31D]/20 text-[#04000B] dark:text-[#C9F31D] font-semibold border border-[#C9F31D]/30">
                  {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#666] dark:text-gray-400">
                All inquiries submitted through your website are stored here and ready for Google Sheets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-lg font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="p-4 sm:p-6 bg-[#FAFBF8] dark:bg-[#111215] border-b border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export to CSV for Google Sheets */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg bg-[#0F9D58] text-white font-semibold text-sm hover:bg-[#0c8047] transition-all shadow-md transform hover:scale-[1.02] cursor-pointer"
            >
              <span>📥</span>
              <span>Export for Google Sheets (.CSV)</span>
            </button>

            {/* Quick Copy for Ctrl+V in Google Sheets */}
            <button
              onClick={handleCopyForGoogleSheet}
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#C9F31D] text-[#04000B] font-semibold text-sm hover:bg-[#ADD40C] transition-all shadow-sm cursor-pointer"
            >
              <span>📋</span>
              <span>{copied ? '✓ Copied (Paste in Sheet!)' : 'Copy for Google Sheets'}</span>
            </button>

            {/* Open User's Specific Google Sheet */}
            <a
              href="https://docs.google.com/spreadsheets/d/1IhWF6bQK_eOzH1kEzSQRtmU_0pB9VhSbZbjGZrd0tF0/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-sm text-[#04000B] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <span>🌐</span>
              <span>Open My Google Sheet ↗</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              ⚙️ {showSettings ? 'Hide Settings' : 'Cloud Sync Settings'}
            </button>

            {inquiries.length > 0 && (
              <button
                onClick={handleClearAll}
                className="py-2 px-3 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Optional Webhook Settings Drawer */}
        {showSettings && (
          <form
            onSubmit={handleSaveWebhook}
            className="p-4 sm:p-5 bg-yellow-50/50 dark:bg-yellow-950/10 border-b border-yellow-200 dark:border-yellow-900/30 text-xs"
          >
            <div className="max-w-2xl">
              <label className="font-bold text-[#04000B] dark:text-white block mb-1">
                Optional: Google Apps Script Webhook URL (For automatic real-time cloud append)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-[#04000B] dark:text-white text-xs focus:outline-none focus:border-[#C9F31D]"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#04000B] dark:bg-white text-white dark:text-[#04000B] font-bold text-xs"
                >
                  Save URL
                </button>
              </div>
              {saveSuccess && (
                <p className="text-green-600 font-semibold mt-1">✓ Webhook URL saved successfully!</p>
              )}
            </div>
          </form>
        )}

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search inquiries by client name, email, phone, or requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-[#04000B] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#C9F31D]"
          />
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">📭</span>
              <h4 className="text-lg font-bold text-[#04000B] dark:text-white mb-1">
                {searchTerm ? 'No matching inquiries found' : 'No inquiries logged yet'}
              </h4>
              <p className="text-xs sm:text-sm text-[#666] dark:text-gray-400 max-w-md mx-auto mb-5">
                {searchTerm
                  ? 'Try searching with a different keyword.'
                  : 'Whenever a client fills the contact form, their inquiry is automatically saved here.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddSample}
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-lg border border-dashed border-gray-400 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>+</span>
                  <span>Add Sample Inquiry to Test</span>
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAFBF8] dark:bg-[#121316] text-[#04000B] dark:text-white font-bold border-b border-gray-200 dark:border-gray-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Project Requirements</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[#333] dark:text-gray-300">
                  {filteredInquiries.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {item.timestamp}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#04000B] dark:text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={`mailto:${item.email}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="hover:text-[#04000B] dark:hover:text-white"
                          >
                            {item.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 min-w-[240px] max-w-[340px]">
                        <p className="line-clamp-2 text-xs text-gray-700 dark:text-gray-300">
                          {item.project}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/919484520805?text=${encodeURIComponent(
                              `Hi ${item.name}, thank you for contacting Bytebly regarding: ${item.project}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                            title="Chat on WhatsApp"
                          >
                            💬
                          </a>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-gray-50 dark:bg-[#111215] border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
          <div className="flex items-center gap-2">
            <span>💡 Quick Tip: Click <strong>"Copy for Google Sheets"</strong> and press <strong>Ctrl + V</strong> in your Google Sheet to paste all data instantly!</span>
          </div>
          <div>
            <span>Data stored securely on your browser & dispatched to Bytebly</span>
          </div>
        </div>

      </div>
    </div>
  )
}
