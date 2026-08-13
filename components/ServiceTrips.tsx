interface ServiceTripsProps {
  onDonate?: () => void;
}

export function ServiceTrips({ onDonate }: ServiceTripsProps) {
  const steps = [
    {
      number: "1",
      title: "Donate",
      description:
        "We collect donations of sanitary pads in our Pad The Way Donation Boxes across our partner locations worldwide.",
    },
    {
      number: "2",
      title: "Sort",
      description:
        "Volunteers sort out donated products according to size, and pack them into care packs consisting of a variation of the pads donated.",
    },
    {
      number: "3",
      title: "Distribute",
      description:
        "Menstrual healthcare products are redistributed to low-income households, schools, and shelters. Dignity shared!",
    },
    {
      number: "4",
      title: "Repeat",
      description:
        "Pad The Way aims to run cycles of donation and distribution every month for a sustainable, lasting impact.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest text-orange-500 uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="text-4xl font-bold text-teal-800 mb-4">
            Game Plan
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our team aims to provide a sustainable way to support our
            beneficiaries on a monthly basis.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-center relative"
            >
              {/* Step Number */}
              <div className="w-14 h-14 bg-teal-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 right-0 w-8 h-0.5 bg-orange-300 translate-x-4" />
              )}

              <h3 className="text-xl font-bold text-teal-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-teal-700 text-white py-14 px-8 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-3">
            Let&apos;s Change How the World Cares for Girls in Need
          </h3>
          <p className="text-teal-100 mb-8 text-lg">
            Every donation brings us one step closer to a world where no girl
            misses school because of her period.
          </p>
          <button
            onClick={onDonate}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full transition-colors duration-200 text-lg"
          >
            DONATE NOW
          </button>
        </div>
      </div>
    </section>
  );
}