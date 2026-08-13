export function WhereDonationsGo() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-widest text-orange-500 uppercase mb-3 block">
            Transparency
          </span>
          <h2 className="text-4xl font-bold text-teal-800 mb-4">
            Where Do Donations Go?
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Watch how your support is improving the lives of girls through 
            access to essential menstrual care across 43 countries.
          </p>
        </div>

        {/* Video */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/tmYsI1IzJNc"
              title="Where Donations Go"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Stats Row Below Video */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-4">
          <div className="text-center bg-teal-50 rounded-xl py-5 px-4">
            <p className="text-2xl font-bold text-teal-800">78%</p>
            <p className="text-xs text-gray-500 mt-1">Goes Directly to Programs</p>
          </div>
          <div className="text-center bg-orange-50 rounded-xl py-5 px-4">
            <p className="text-2xl font-bold text-orange-500">43</p>
            <p className="text-xs text-gray-500 mt-1">Countries Reached</p>
          </div>
          <div className="text-center bg-teal-50 rounded-xl py-5 px-4">
            <p className="text-2xl font-bold text-teal-800">2.3M+</p>
            <p className="text-xs text-gray-500 mt-1">Kits Distributed</p>
          </div>
        </div>

      </div>
    </section>
  );
}