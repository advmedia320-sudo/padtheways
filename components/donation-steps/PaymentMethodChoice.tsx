import { DonorFeedbackForm } from './DonorFeedbackForm'

type Props = {
  amount: number
  onCard: () => void
  onClose: () => void
}

export function PaymentMethodChoice({ amount, onCard, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 antialiased selection:bg-orange-500/10">
      <div className="w-full max-w-[480px] rounded-[32px] bg-[#F8FAFC] shadow-2xl flex flex-col max-h-[94vh] border border-gray-200/40 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-gray-100 p-4 bg-white flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Your gift, your choice</h3>
            <p className="text-xs text-gray-500 mt-0.5">Support our project with a secure payment.</p>
            <p className="text-[11px] text-gray-400">Choose your preferred donation method.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-none">
          
          {/* Card Module: Exact Match with Screenshot Layout */}
          <div className="rounded-[24px] border border-gray-100 p-5 bg-white space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-left">
            
            {/* Top Row: Circular Icon and Text Alignment */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-[#1B5E20]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                  <rect width="3" height="3" x="6" y="14" />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">Donate with Card</h4>
                <p className="text-sm text-gray-600 font-medium mt-1">Debit or credit card</p>
              </div>
            </div>

            {/* Brand Logo Alignment Lineup with Fine Pipe Dividers */}
            <div className="flex justify-between items-center max-w-[340px] mx-auto pt-1 pb-1">
              <span className="text-base font-black italic text-[#1A1F71] tracking-wider text-center select-none">VISA</span>
              <div className="w-[1px] h-3.5 bg-gray-200"></div>
              <div className="flex items-center justify-center gap-0.5 select-none">
                <span className="w-4 h-4 rounded-full bg-[#EB001B]"></span>
                <span className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-1.5"></span>
              </div>
              <div className="w-[1px] h-3.5 bg-gray-200"></div>
              <div className="flex flex-col text-center select-none leading-none">
                <span className="text-[10px] font-black text-[#006FCF] tracking-tight">AMERICAN</span>
                <span className="text-[10px] font-black text-[#006FCF] tracking-tight">EXPRESS</span>
              </div>
              <div className="w-[1px] h-3.5 bg-gray-200"></div>
              <span className="text-xs font-black text-black tracking-tight text-center uppercase select-none">
                DISCOVER<span className="text-orange-500 font-bold text-sm">.</span>
              </span>
            </div>
                        {/* Trust Infrastructure Section with Vertical Pipe Lines */}
            <div className="flex justify-between items-center py-1.5 text-gray-700 max-w-[380px] mx-auto text-xs font-medium border-t border-b border-gray-50/60">
              
              {/* Secure Checkout */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <svg className="w-[18px] h-[18px] text-[#00875A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="leading-tight text-[11px] font-semibold text-gray-800">Secure<br />Checkout</span>
              </div>
              
              <div className="w-[1px] h-6 bg-gray-200"></div>

              {/* Protected Payments */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <svg className="w-[18px] h-[18px] text-[#00875A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="leading-tight text-[11px] font-semibold text-gray-800">Protected<br />Payments</span>
              </div>
              
              <div className="w-[1px] h-6 bg-gray-200"></div>

              {/* Instant Confirmation */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                <svg className="w-[18px] h-[18px] text-[#00875A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="leading-tight text-[11px] font-semibold text-gray-800">Instant<br />Confirmation</span>
              </div>
            </div>
            
            {/* Primary Orange Action Pill Button */}
            <div className="pt-1">
              <button 
                type="button" 
                onClick={onCard}
                className="w-full bg-[#FF6D00] hover:bg-[#E65100] text-white font-bold py-3 px-6 rounded-full text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm transform active:scale-[0.995]"
              >
                <span>Continue with Card</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Context Segment Divider */}
          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-gray-400 uppercase tracking-widest font-extrabold">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Charity Gift Card Section (DonorFeedbackForm) */}
          <DonorFeedbackForm amount={amount} />
        </div>

        {/* Fixed Footer */}
        <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 p-3 text-xs text-gray-400 bg-white flex-shrink-0 rounded-b-3xl font-medium">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your payment information is handled securely.
        </div>

      </div>
    </div>
  )
}
