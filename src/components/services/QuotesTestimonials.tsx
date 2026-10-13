import React, { useState } from 'react'
import { ASSETS } from '../../constants/assets'

export const QuotesTestimonials: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const items = [
    {
      quote:
        'Targeting consultation discover apartments. ndulgence off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties practasing why she shewing now remembering.',
      name: 'Jash Patel',
      role: 'Envato Client',
    },
    {
      quote:
        'Engagement consultation across various sectors is key to improving efficiency. Strategic thinking often leads to exponential growth when applied correctly. Understanding the customer’s needs creates a winning solution.',
      name: 'Harshil Patel',
      role: 'CEO',
    },
    {
      quote:
        'Collaborative efforts within the design team enabled us to come up with innovative solutions. Understanding the nuances of modern trends has really pushed our project outcomes to the next level.',
      name: 'Harsh Kotadiya',
      role: 'Operational Manager',
    },
  ]

  const next = () => setCurrent((prev) => (prev + 1) % items.length)
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length)

  const item = items[current] || items[0]

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-[#0E0F11] text-center">
      <div className="w-full max-w-[1140px] px-4 mx-auto">
        
        {/* Header matching 17X-0 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block mb-5 py-2 px-7 rounded-[30px] border border-[#CCCCCC] dark:border-gray-600 bg-white/40 dark:bg-white/5">
            <span className="text-[16px] sm:text-[18px] leading-[120%] uppercase font-barlow font-bold text-[#04000B] dark:text-white">
              Testimonials
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[60px] leading-[115%] font-barlow font-semibold text-[#04000B] dark:text-white tracking-tight">
            What People Say
          </h2>
        </div>

        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
            <img
              src={ASSETS.quoteIcon}
              alt="Quote"
              className="w-12 h-12 object-contain dark:invert"
            />
          </div>
        </div>

        {/* Testimonial text & author */}
        <div className="max-w-3xl mx-auto min-h-[220px]">
          <p className="text-xl sm:text-2xl lg:text-[28px] leading-[160%] font-barlow font-medium text-[#666666] dark:text-gray-300 mb-8 italic">
            "{item.quote}"
          </p>

          <div className="inline-block pb-4 border-b border-[#CCCCCC] dark:border-gray-700">
            <h4 className="text-[20px] font-barlow font-semibold text-[#04000B] dark:text-white">
              {item.name}
            </h4>
            <span className="text-[16px] font-barlow text-[#666666] dark:text-gray-400">
              {item.role}
            </span>
          </div>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous quote"
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:border-[#C9F31D] hover:text-[#04000B] transition-colors"
          >
            ❮
          </button>
          <button
            onClick={next}
            aria-label="Next quote"
            className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-[#04000B] dark:text-white hover:bg-[#C9F31D] hover:border-[#C9F31D] hover:text-[#04000B] transition-colors"
          >
            ❯
          </button>
        </div>

      </div>
    </section>
  )
}
