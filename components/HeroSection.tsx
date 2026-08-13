interface HeroSectionProps {
  onDonate?: () => void;
}

export function HeroSection({ onDonate }: HeroSectionProps) {
  return (
    <section className="relative bg-teal-800 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Girls in school"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-900/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-block bg-orange-500 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-3 py-1.5 md:px-4 rounded-full mb-4 md:mb-6">
            Global Period Poverty Relief
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            100 Million Girls Miss School Due to Period Poverty.{" "}
            <span className="text-orange-400">You Can Change That.</span>
          </h1>

          {/* Subtext */}
          <p className="text-teal-100 mb-6 md:mb-10 text-base md:text-xl leading-relaxed max-w-2xl">
            Whether you make a one-time donation or become a monthly supporter,
            your contribution provides sanitary pads, restores dignity, and
            keeps girls in school across 43 countries.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={onDonate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-full transition-colors duration-200 text-sm md:text-lg"
            >
              DONATE NOW
            </button>
            <button
              onClick={onDonate}
              className="bg-white/10 hover:bg-white/20 border border-white text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-full transition-colors duration-200 text-sm md:text-lg backdrop-blur-sm"
            >
              LEARN MORE
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-10 md:mt-16 grid grid-cols-3 gap-3 md:gap-6 max-w-xl">
            <div className="text-center">
              <p className="text-xl md:text-3xl font-bold text-white">100M+</p>
              <p className="text-teal-200 text-xs md:text-sm mt-1">Girls Affected</p>
            </div>
            <div className="text-center border-x border-teal-600">
              <p className="text-xl md:text-3xl font-bold text-white">43</p>
              <p className="text-teal-200 text-xs md:text-sm mt-1">Countries Reached</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-3xl font-bold text-white">2.3M+</p>
              <p className="text-teal-200 text-xs md:text-sm mt-1">Kits Distributed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}