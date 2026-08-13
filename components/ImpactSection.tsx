interface ImpactSectionProps {
  onDonate?: () => void;
}

export function ImpactSection({ onDonate }: ImpactSectionProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-widest text-coral uppercase mb-3 block">
            Who We Are
          </span>
          <h2 className="text-4xl font-bold text-teal-800 mb-6 leading-tight">
            Our Story
          </h2>
          <div className="w-16 h-1 bg-orange-500 mb-6 rounded-full" />
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Talking about periods remains a taboo subject even till today.
            <strong> Pad The Way</strong> strives to change this by ending
            the shame and eradicating period poverty worldwide.
          </p>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            We aim to bridge access to menstrual healthcare for low-income
            families through sanitary pad donation and distribution — because
            every girl deserves dignity, health, and the chance to stay in school.
          </p>
          {onDonate && (
            <button
              onClick={onDonate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
            >
              Donate Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
}