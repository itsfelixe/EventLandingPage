import { FormEvent, ReactNode, useEffect, useState } from "react";
const dinnerImage =
  "https://images.unsplash.com/photo-1536392706976-e486e2ba97af?auto=format&fit=crop&w=1800&q=88";
const communityImage =
  "https://images.unsplash.com/photo-1663919400231-d9d36115ddae?auto=format&fit=crop&w=1200&q=86";
const logo = "https://graceworldfoundation.africa/favicon.ico";

const pathways = [
  {
    name: "GraceWell",
    category: "Community health & wellness",
    promise: "Give 20 people access to healthcare.",
    detail:
      "Supporting medical camps, mental health awareness, consultations, screening, treatment and wellness support.",
    result: "20 people access healthcare",
    color: "#16aeb8",
    tint: "#eefafa",
  },
  {
    name: "GracePath",
    category: "Education & future skills",
    promise: "Keep a learner in school for a year.",
    detail:
      "Covering school fees, uniforms, essential learning requirements and upkeep across basic education and TVET pathways.",
    result: "1 learner supported for a year",
    color: "#7157c8",
    tint: "#f4f1fc",
  },
  {
    name: "GraceWorks",
    category: "Livelihoods & enterprise",
    promise: "Launch an entrepreneur.",
    detail:
      "Equipping a vulnerable woman or young person with business training, mentorship and an enterprise start-up kit.",
    result: "1 woman or youth entrepreneur",
    color: "#ed971c",
    tint: "#fff8ec",
  },
  {
    name: "GraceFed",
    category: "Food security & resilience",
    promise: "Help feed 8 families for a month.",
    detail:
      "Providing food baskets to vulnerable households while building longer-term nutrition and resilience pathways.",
    result: "8 families fed for one month",
    color: "#27ae60",
    tint: "#effaf3",
  },
];

const levels = [
  { amount: 50000, label: "Individual", seats: "1 guest", gia: "3 months GIA access" },
  { amount: 100000, label: "Companion", seats: "2 guests", gia: "6 months GIA access" },
  { amount: 200000, label: "Circle", seats: "4 guests", gia: "9 months GIA access" },
  { amount: 400000, label: "Full table", seats: "8 guests", gia: "12 months GIA access" },
];

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Graceworld Foundation home">
      <img src={logo} alt="" className="h-11 w-11 object-contain" />
      <span className={`leading-none ${light ? "text-white" : "text-[#103752]"}`}>
        <strong className="block text-[15px] font-black tracking-[0.04em]">GRACEWORLD</strong>
        <span className="mt-1.5 block text-[9px] font-bold tracking-[0.3em] opacity-65">FOUNDATION</span>
      </span>
    </a>
  );
}

function PaymentModal({
  initialLevel,
  onClose,
}: {
  initialLevel: number;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(initialLevel);
  const [pathway, setPathway] = useState("GraceWell");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071f30]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve your place"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="max-h-[95vh] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-w-[560px] sm:rounded-[28px]">
        <div className="flex items-center justify-between border-b border-[#103752]/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1683ba]">Impact Dinner 2026</p>
              <h2 className="mt-1 text-xl font-black text-[#103752]">Confirm your partnership</h2>
            </div>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#103752]/5 text-[#103752] hover:bg-[#103752]/10" aria-label="Close checkout">
            <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>
          </button>
        </div>

        {submitted ? (
          <div className="px-7 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf8f3] text-[#2cb457]">
              <Icon className="h-8 w-8"><path d="m5 12 4 4L19 6" /></Icon>
            </div>
            <h3 className="mt-6 text-2xl font-black tracking-[-0.03em] text-[#103752]">Your details are ready</h3>
            <p className="mx-auto mt-3 max-w-sm leading-7 text-[#64737d]">
              The live PesaPal redirect will activate once the secure merchant credentials are connected.
            </p>
            <button onClick={onClose} className="mt-8 w-full rounded-full bg-[#103752] px-6 py-4 font-extrabold text-white">Return to event</button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-6 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#687984]">Partnership level</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {levels.map((level) => (
                <button
                  type="button"
                  key={level.amount}
                  onClick={() => setAmount(level.amount)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    amount === level.amount ? "border-[#1683ba] bg-[#eef8fc]" : "border-[#103752]/10 hover:border-[#1683ba]/50"
                  }`}
                >
                  <span className="block text-sm font-black text-[#103752]">KES {level.amount / 1000}K</span>
                  <span className="mt-1 block text-[11px] text-[#6c7a83]">{level.seats}</span>
                </button>
              ))}
            </div>

            <label className="mt-5 grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#687984]">
              Direct your impact
              <select value={pathway} onChange={(event) => setPathway(event.target.value)} className="rounded-2xl border border-[#103752]/15 bg-white px-4 py-4 text-sm font-bold normal-case tracking-normal text-[#103752] outline-none focus:border-[#1683ba]">
                {pathways.map((item) => <option key={item.name}>{item.name}</option>)}
                <option>Split across all pathways</option>
              </select>
            </label>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#687984]">
                Full name
                <input required placeholder="Your name" className="rounded-2xl border border-[#103752]/15 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-[#103752] outline-none focus:border-[#1683ba]" />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#687984]">
                Phone
                <input required type="tel" placeholder="+254 700 000 000" className="rounded-2xl border border-[#103752]/15 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-[#103752] outline-none focus:border-[#1683ba]" />
              </label>
            </div>
            <label className="mt-3 grid gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#687984]">
              Email address
              <input required type="email" placeholder="you@company.com" className="rounded-2xl border border-[#103752]/15 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-[#103752] outline-none focus:border-[#1683ba]" />
            </label>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f4f6f7] px-5 py-4">
              <span className="text-sm font-bold text-[#687984]">Total contribution</span>
              <strong className="text-xl font-black text-[#103752]">KES {amount.toLocaleString()}</strong>
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1683ba] px-6 py-4 font-extrabold text-white transition hover:bg-[#0f6f9e]">
              Continue securely with PesaPal
              <Icon><path d="m9 18 6-6-6-6" /></Icon>
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#7b8991]">
              <Icon className="h-4 w-4"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>
              M-PESA and cards processed securely by PesaPal
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkout, setCheckout] = useState<number | null>(null);

  const openCheckout = (amount = 50000) => setCheckout(amount);

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#f7f8f8] text-[#103752]">
      <section className="relative min-h-[960px] bg-[#0d344e] text-white sm:min-h-[900px] lg:min-h-[860px]">
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <img src={dinnerImage} alt="An elegant dinner table prepared for an evening gathering" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d344e] via-[#0d344e]/20 to-transparent" />
        </div>
        <div className="absolute -left-40 top-48 h-[420px] w-[420px] rounded-full border border-white/5" />
        <div className="absolute -left-24 top-64 h-[260px] w-[260px] rounded-full border border-white/5" />

        <header className="relative z-20 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Brand light />
          <nav className="hidden items-center gap-8 text-sm font-bold text-white/70 md:flex">
            <a href="#purpose" className="transition hover:text-white">The evening</a>
            <a href="#pathways" className="transition hover:text-white">Impact pathways</a>
            <a href="#partnership" className="transition hover:text-white">Partner</a>
          </nav>
          <button onClick={() => openCheckout()} className="hidden rounded-full bg-[#e2a72e] px-6 py-3 text-sm font-black text-[#0d344e] transition hover:bg-white sm:block">
            Reserve a seat
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden" aria-label="Toggle menu">
            <Icon>{menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</Icon>
          </button>
        </header>

        {menuOpen && (
          <nav className="absolute left-5 right-5 top-20 z-30 grid gap-1 rounded-2xl bg-white p-3 text-[#103752] shadow-2xl md:hidden">
            <a href="#purpose" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[#f2f5f6]">The evening</a>
            <a href="#pathways" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[#f2f5f6]">Impact pathways</a>
            <a href="#partnership" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[#f2f5f6]">Partner</a>
            <button onClick={() => openCheckout()} className="mt-1 rounded-xl bg-[#1683ba] px-4 py-3 text-left font-bold text-white">Reserve a seat</button>
          </nav>
        )}

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-72 pt-24 sm:px-8 sm:pb-64 lg:px-10 lg:pb-40 lg:pt-32">
          <div className="flex w-fit items-center gap-3">
            <span className="h-px w-10 bg-[#e2a72e]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#e2a72e]">Impact Dinner 2026</span>
          </div>
          <h1 className="mt-7 max-w-[820px] text-[clamp(3.7rem,7.8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.07em]">
            Shared purpose.<br /><span className="text-[#56c872]">Measurable</span> impact.
          </h1>
          <p className="mt-8 max-w-[610px] text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            An evening connecting leaders and creating partnerships to build resilient, thriving communities across Kenya.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => openCheckout()} className="flex items-center justify-center gap-2 rounded-full bg-[#1683ba] px-7 py-4 font-black text-white transition hover:bg-[#1598d5]">
              Become a partner <Icon><path d="m9 18 6-6-6-6" /></Icon>
            </button>
            <a href="#pathways" className="flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-bold text-white transition hover:bg-white/10">Explore the impact</a>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 px-5 sm:bottom-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[26px] bg-white text-[#103752] shadow-2xl shadow-black/25">
            <div className="border-b border-[#103752]/10 px-6 py-3 sm:px-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1683ba]">Event details</p>
            </div>
            <div className="grid sm:grid-cols-3">
              <div className="flex items-center gap-4 px-6 py-5 sm:px-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef8fc] text-[#1683ba]">
                  <Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></Icon>
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#82909a]">Date</p>
                  <p className="mt-1 text-base font-black">10 December 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-[#103752]/10 px-6 py-5 sm:border-l sm:border-t-0 sm:px-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff7e6] text-[#d3961d]">
                  <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#82909a]">Time</p>
                  <p className="mt-1 text-base font-black">7:00 PM <span className="font-semibold text-[#71818b]">EAT</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-[#103752]/10 px-6 py-5 sm:border-l sm:border-t-0 sm:px-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef9f1] text-[#2bad58]">
                  <Icon><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#82909a]">Location</p>
                  <p className="mt-1 text-base font-black">JW Marriott</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#71818b]">Westlands, Nairobi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="purpose" className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div>
            <p className="section-label">The purpose</p>
            <h2 className="mt-6 text-[clamp(2.8rem,5.4vw,5.5rem)] font-black leading-[.94] tracking-[-0.06em]">
              One evening.<br />Four pathways.<br /><span className="text-[#1683ba]">Lasting change.</span>
            </h2>
          </div>
          <div className="lg:pt-7">
            <p className="text-xl font-semibold leading-9 tracking-[-0.02em] text-[#314f62] sm:text-2xl sm:leading-10">
              A strategic convening to mobilize resources for our 2027 programmes and bring together people who believe meaningful progress is built in partnership.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Fund 2027 community programmes",
                "Forge long-term impact partnerships",
                "Launch the Graceworld Impact Alliance",
                "Unveil our Five-Year Strategic Plan",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 border-t border-[#103752]/15 pt-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff5df] text-[11px] font-black text-[#b77900]">0{index + 1}</span>
                  <p className="text-sm font-bold leading-6 text-[#425f71]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pathways" className="bg-[#f2f5f6] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="section-label">Choose your impact</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Where will your seat make a difference?</h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#617481]">Direct your contribution to one pathway or combine several to create a broader impact portfolio.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {pathways.map((item, index) => (
              <article key={item.name} className="group relative overflow-hidden rounded-[28px] border border-[#103752]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#103752]/8 sm:p-9">
                <div className="absolute left-0 top-0 h-full w-1.5" style={{ background: item.color }} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: item.color }}>{item.category}</p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#103752]">{item.name}</h3>
                  </div>
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black"
                    style={{ background: item.tint, color: item.color }}
                  >
                    0{index + 1}
                  </span>
                </div>
                <h4 className="mt-10 text-xl font-black text-[#103752]">Buy a seat. {item.promise}</h4>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#6a7a84]">{item.detail}</p>
                <div className="mt-7 flex items-center justify-between border-t border-[#103752]/10 pt-5">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#81909a]">From</span>
                    <strong className="mt-1 block text-lg font-black text-[#103752]">KES 50,000</strong>
                  </div>
                  <button onClick={() => openCheckout(50000)} className="flex h-11 w-11 items-center justify-center rounded-full text-white transition group-hover:scale-105" style={{ background: item.color }} aria-label={`Support ${item.name}`}>
                    <Icon><path d="m9 18 6-6-6-6" /></Icon>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partnership" className="bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="section-label">Partnership levels</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-6xl">Choose how you show up.</h2>
            </div>
            <p className="max-w-md leading-7 text-[#617481]">Every partnership includes event access, measurable programme impact, partner recognition, and complimentary GIA access.</p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {levels.map((level, index) => (
              <article key={level.amount} className={`rounded-[26px] border p-6 ${index === 3 ? "border-[#103752] bg-[#103752] text-white" : "border-[#103752]/12 bg-white text-[#103752]"}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.17em] ${index === 3 ? "text-[#e2a72e]" : "text-[#1683ba]"}`}>{level.label}</p>
                <p className="mt-7 text-3xl font-black tracking-[-0.04em]">KES {level.amount / 1000}K</p>
                <div className={`mt-6 space-y-3 border-t pt-5 text-sm font-semibold ${index === 3 ? "border-white/15 text-white/70" : "border-[#103752]/10 text-[#627681]"}`}>
                  <p>{level.seats}</p>
                  <p>{level.gia}</p>
                  <p>Directed programme impact</p>
                </div>
                <button onClick={() => openCheckout(level.amount)} className={`mt-8 w-full rounded-full px-4 py-3 text-sm font-black transition ${index === 3 ? "bg-[#e2a72e] text-[#103752] hover:bg-white" : "bg-[#edf4f7] text-[#103752] hover:bg-[#1683ba] hover:text-white"}`}>
                  Select level
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d344e] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          <div>
            <p className="section-label !text-[#e2a72e]">Graceworld Impact Alliance</p>
            <h2 className="mt-6 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.95] tracking-[-0.055em]">The impact doesn’t end when dinner does.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              GIA is the digital ecosystem connecting organizations, professionals, volunteers, opportunities, resources and expertise to accelerate social impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Discover opportunities", "Meet collaborators", "Build partnerships"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70">{item}</span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <img src={communityImage} alt="A young person in a community supported by Graceworld Foundation" className="aspect-[4/5] w-full rounded-[32px] object-cover" />
            <div className="absolute -bottom-6 -left-3 max-w-[240px] rounded-3xl bg-[#56c872] p-6 text-[#0d344e] sm:-left-8">
              <p className="text-xs font-black uppercase tracking-[0.16em]">Our vision</p>
              <p className="mt-3 text-lg font-black leading-6">Resilient and thriving communities for all.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e2a72e] px-5 py-24 text-center text-[#0d344e] sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.2em]">10 December 2026 · JW Marriott Nairobi</p>
          <h2 className="mt-6 text-[clamp(3rem,7vw,6.7rem)] font-black leading-[.88] tracking-[-0.065em]">Take your place at the table.</h2>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold leading-8 text-[#0d344e]/70">Celebrate impact, connect with leaders, and help create the next chapter of resilient communities.</p>
          <button onClick={() => openCheckout()} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0d344e] px-8 py-4 font-black text-white transition hover:bg-[#1683ba]">
            Reserve your seat <Icon><path d="m9 18 6-6-6-6" /></Icon>
          </button>
        </div>
      </section>

      <footer className="bg-[#071f30] px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Brand light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">Building resilient communities for shared purpose.</p>
          </div>
          <div className="grid gap-2 text-sm text-white/65 sm:text-right">
            <a href="mailto:info@graceworldfoundation.africa" className="hover:text-white">info@graceworldfoundation.africa</a>
            <a href="tel:+254783400300" className="hover:text-white">+254 783 400 300</a>
            <a href="https://graceworldfoundation.africa/" target="_blank" rel="noreferrer" className="hover:text-white">graceworldfoundation.africa</a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row">
          <p>© 2026 Graceworld Foundation. All rights reserved.</p>
          <p>Nairobi, Kenya</p>
        </div>
      </footer>

      {checkout !== null && <PaymentModal initialLevel={checkout} onClose={() => setCheckout(null)} />}
    </main>
  );
}
