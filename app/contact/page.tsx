export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-teal-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold tracking-widest text-orange-400 uppercase mb-3 block">Reach Out</span>
          <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
          <p className="text-teal-200 text-lg max-w-2xl mx-auto">Have a question, want to donate, or interested in partnering with us? We would love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Send Us a Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" placeholder="Your full name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" placeholder="your@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} placeholder="Tell us more..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200">Send Message</button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Contact Information</h2>
            <div className="bg-teal-50 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm">?</div>
                <div>
                  <p className="text-sm font-semibold text-teal-800 mb-1">Email</p>
                  <a href="mailto:info@padtheway.org" className="text-gray-600 hover:text-teal-700 transition-colors text-sm">info@padtheway.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm">??</div>
                <div>
                  <p className="text-sm font-semibold text-teal-800 mb-1">Phone</p>
                  <a href="tel:+18001234567" className="text-gray-600 hover:text-teal-700 transition-colors text-sm">+1 (800) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm">??</div>
                <div>
                  <p className="text-sm font-semibold text-teal-800 mb-1">Location</p>
                  <p className="text-gray-600 text-sm">Global Headquarters<br />Available in 43 Countries</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-teal-800 mb-2">Want to Volunteer?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">We are always looking for passionate people to join our mission. Reach out and let us know how you would like to help.</p>
              <a href="mailto:info@padtheway.org" className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">Email us to volunteer ?</a>
            </div>

            <div className="bg-teal-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-teal-800 mb-3">Individual Team Emails</h3>
              <p className="text-gray-600 text-sm mb-3">You can also reach any of us directly. Find our individual emails on the <a href="/team" className="text-orange-500 hover:text-orange-600 underline">Our Team</a> page.</p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-white text-xs font-bold transition-colors duration-200">f</a>
                <a href="#" className="w-9 h-9 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-white text-xs font-bold transition-colors duration-200">ig</a>
                <a href="#" className="w-9 h-9 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-white text-xs font-bold transition-colors duration-200">yt</a>
                <a href="#" className="w-9 h-9 rounded-full bg-teal-700 hover:bg-orange-500 flex items-center justify-center text-white text-xs font-bold transition-colors duration-200">in</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-teal-800 py-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
        <p className="text-teal-200 mb-8">Every donation brings us one step closer to ending period poverty.</p>
        <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full transition-colors duration-200 text-lg">Donate Now</a>
      </div>
    </main>
  );
}
