export default function MissionPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 tracking-tight">
          Our Mission
        </h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Go With The Flow exists to close the gap in access to menstrual
          healthcare in Singapore &mdash; so that a period never stands
          between anyone and their day.
        </p>
      </section>

      {/* Wave divider - matches the signature used on the Team page */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 text-teal-900"
        >
          <path
            fill="currentColor"
            fillOpacity="0.08"
            d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,80 L0,80 Z"
          />
          <path
            fill="currentColor"
            fillOpacity="0.15"
            d="M0,55 C240,25 480,80 720,50 C960,20 1200,70 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>

      {/* What we do */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-teal-900 mb-10 text-center">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal-900/5 flex items-center justify-center text-teal-900 text-xl font-bold">
              1
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-900">Donate</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We collect menstrual products from individuals, businesses, and
              partners, then channel them directly to those who need them
              most.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal-900/5 flex items-center justify-center text-teal-900 text-xl font-bold">
              2
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-900">
              Distribute
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Through community partners and distribution programmes, we make
              sure pads reach disadvantaged menstruators reliably, with
              dignity, and free of charge.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal-900/5 flex items-center justify-center text-teal-900 text-xl font-bold">
              3
            </div>
            <h3 className="mt-4 text-lg font-bold text-teal-900">Educate</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We raise awareness about menstrual hygiene and health, so that
              periods are talked about openly instead of hidden in silence.
            </p>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Why It Matters
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Menstrual products are not a luxury &mdash; they are a monthly
          necessity for roughly half the population. Yet for many in
          Singapore, affording pads consistently is a real struggle, and the
          stigma around periods can make that struggle even harder to talk
          about, let alone solve.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          We believe dignified access to menstrual healthcare is a basic
          right, not a privilege. That belief is what brought six friends
          together in December 2020 to found GWTF, and it&apos;s what
          continues to drive everything we do today.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-teal-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Help us close the gap
          </h2>
          <p className="mt-3 text-teal-100 leading-relaxed max-w-xl mx-auto">
            Whether through a donation, a partnership, or simply spreading the
            word, every bit of support helps us reach more menstruators in
            need.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#donate" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-sm transition-colors duration-200">
              Donate Now
            </a>
            <a href="/contact" className="border border-teal-100 text-teal-100 hover:bg-teal-800 font-bold py-3 px-8 rounded-full text-sm transition-colors duration-200">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
