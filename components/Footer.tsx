export function Footer() {
  const whoWeAre = ["Home","Our Mission","Our Team","Reports","Contact Us","Careers","Stories"]
  const whatWeDo = ["How We Do It","Local Sourcing","Distribution Network","Our Partners","Field Visits","Impact Reports","SDG Alignment"]
  const howToHelp = ["Donate","Volunteer","Field Visits","Join Our Team","Essential Needs","Corporate Giving","Contact Us","Privacy Policy"]

  return (
    <footer className="bg-teal-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 pb-8 border-b border-teal-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Pad The Way</h2>
              <p className="text-teal-300 text-sm max-w-sm">Ending period poverty one kit at a time. Locally sourced. Globally distributed. 100% traceable.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors duration-200">Donate Now</a>
              <a href="#" className="border border-teal-400 hover:border-white text-teal-200 hover:text-white font-bold py-2 px-6 rounded-full text-sm transition-colors duration-200">Volunteer</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-widest text-orange-400">Contact</h3>
            <ul className="space-y-3 text-sm text-teal-200">
              <li><a href="mailto:info@padtheway.org" className="hover:text-white transition-colors">info@padtheway.org</a></li>
              <li><a href="tel:+18001234567" className="hover:text-white transition-colors">+1 (800) 123-4567</a></li>
              <li className="text-teal-300 leading-relaxed">Global Headquarters<br />Available in 43 Countries</li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors duration-200">f</a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors duration-200">ig</a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors duration-200">yt</a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors duration-200">in</a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-widest text-orange-400">Who We Are</h3>
            <ul className="space-y-2 text-sm">
              {whoWeAre.map((item) => (
                <li key={item}><a href="#" className="text-teal-200 hover:text-white transition-colors duration-200">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-widest text-orange-400">What We Do</h3>
            <ul className="space-y-2 text-sm">
              {whatWeDo.map((item) => (
                <li key={item}><a href="#" className="text-teal-200 hover:text-white transition-colors duration-200">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-widest text-orange-400">How To Help</h3>
            <ul className="space-y-2 text-sm">
              {howToHelp.map((item) => (
                <li key={item}><a href="#" className="text-teal-200 hover:text-white transition-colors duration-200">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-teal-700 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-teal-400">
            <p>2025 Pad The Way. All Rights Reserved. Registered Nonprofit.</p>
            <a href="/admin" className="text-teal-600 hover:text-teal-300 underline transition-colors text-xs">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
