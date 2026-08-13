import Image from "next/image";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Evonne",
    pronouns: "she/her",
    email: "evonne@gowiththeflowsg.com",
    photo: "/Evonne.webp",
    quote:
      "Many of us are fortunate enough to not experience period poverty. I strongly believe that no job is too small, no effort is too little. Let's all come together in our own ways to make period products accessible to all menstruators who require it and make periods easier to navigate with ease of convenience and comfort. Menstruators deserve easy accessibility to such necessities - period.",
  },
  {
    name: "Elisa",
    pronouns: "she/her",
    email: "elisa@gowiththeflowsg.com",
    photo: "/Elisa.webp",
    quote:
      "I firmly believe that period poverty should be eradicated. Knowledge of menstrual health is paramount to reach this goal. Embrace and trust the flow.",
  },
  {
    name: "Kelly",
    pronouns: "she/her",
    email: "kelly@gowiththeflowsg.com",
    photo: "/Kelly.webp",
    quote:
      "I believe in dignified and equal menstrual healthcare because of how biological periods are - making it so undoubtedly essential that nobody should have to go through a harder time managing it.",
  },
  {
    name: "Kristina",
    pronouns: "she/her",
    email: "kristina@gowiththeflowsg.com",
    photo: "/Kristina.webp",
    quote:
      "As an organisation, we value inclusivity and respect for the people we work with. I am strongly committed to including marginalised communities in the conversation and advocating for a space of mutual care and consideration. By including everyone in period issues, we can move forward to create equal access for all!",
  },
  {
    name: "Shakthi",
    pronouns: "she/her",
    email: "shakthi@gowiththeflowsg.com",
    photo: "/Shakthi.webp",
    quote:
      "It's about time we shed light on issues that more than half the population has been facing for centuries - adequate menstrual healthcare is a basic human right.",
  },
  {
    name: "Ranza",
    pronouns: "she/her",
    email: "ranza@gowiththeflowsg.com",
    photo: "/Ranza.webp",
    quote:
      "Unequal menstrual healthcare is an issue that so many people face, and yet it is often underlooked. I believe that menstrual healthcare is not a luxury but a necessity that everyone deserves.",
  },
];

export default function TeamPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 tracking-tight">
          Meet the Team!
        </h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Here are the friendly faces behind GWTF. We&apos;re a small, tight
          knit team of friends that care deeply about eradicating period
          poverty in Singapore. Together, we co-founded GWTF in December
          2020.
        </p>

        <div className="relative mt-10 mx-auto w-full max-w-3xl aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/team.webp"
            alt="The GWTF founding team"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Wave divider - signature element, nodding to "Go With The Flow" */}
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

      {/* Our Story */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Story</h2>
        <p className="text-slate-600 leading-relaxed">
          After volunteering at monthly distribution programmes for the
          disadvantaged, Evonne realised that sanitary pads - something half
          the population requires every month - were missing.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          That was what sparked the six of us to start Go With The Flow
          (GWTF) - a local non-profit that aims to bridge the gap in access
          to menstrual healthcare in Singapore through donation and
          distribution channels. In addition to providing menstrual products
          to those who struggle to afford it, we also aim to raise awareness
          and educate the public about menstrual hygiene.
        </p>
      </section>

      {/* Team grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md ring-4 ring-teal-900/5">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-teal-900">
                {member.name}
                <span className="text-sm font-normal text-slate-400 ml-2">
                  ({member.pronouns})
                </span>
              </h3>
              <a
                href={`mailto:${member.email}`}
                className="mt-1 inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Mail size={14} />
                {member.email}
              </a>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {member.quote}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
