import React from 'react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onToggle}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="h-10 w-20 bg-[#0E0F11] text-white dark:bg-white dark:text-[#0E0F11] rounded-full p-1 shadow-2xl flex items-center justify-between border-2 border-[#C9F31D] transition-all transform hover:scale-105 active:scale-95"
      >
        {/* Sun Icon */}
        <div
          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            !isDark ? 'bg-[#C9F31D] text-[#04000B]' : 'text-gray-400 opacity-60'
          }`}
        >
          ☀
        </div>

        {/* Moon Icon */}
        <div
          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            isDark ? 'bg-[#C9F31D] text-[#04000B]' : 'text-gray-400 opacity-60'
          }`}
        >
          ☾
        </div>
      </button>
    </div>
  )
}
