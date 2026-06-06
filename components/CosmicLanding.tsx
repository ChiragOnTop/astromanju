"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent, PropsWithChildren } from "react";
import {
  Binary,
  HeartHandshake,
  Mail,
  Menu,
  MoonStar,
  Orbit,
  Send,
  Sparkles,
  Star,
  WandSparkles,
  X,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import FloatingWhatsAppWidget from "./FloatingWhatsAppWidget";

const navItems = [
  { label: "Sanctuary", href: "#sanctuary" },
  { label: "Services", href: "#services" },
  { label: "Ritual", href: "#ritual" },
  { label: "Contact", href: "#contact" },
] as const;

const whatsappHref =
  "https://wa.me/918860647886?text=Namaste%20Astro%20Manju%2C%20I%20would%20like%20to%20book%20a%20consultation.";

type Service = {
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  className: string;
  accent: "orbit" | "geometry" | "match" | "tarot";
};

const services: Service[] = [
  {
    title: "Astrology Consultation",
    eyebrow: "Natal precision",
    description:
      "A private reading that maps planetary timing, karmic patterns, career cycles, and relationship signatures into a grounded action plan.",
    icon: Orbit,
    className: "lg:col-span-7",
    accent: "orbit",
  },
  {
    title: "Numerology Consultation",
    eyebrow: "Name frequency",
    description:
      "Decode your birth number, destiny number, name resonance, and yearly vibration with refined remedies for alignment and prosperity.",
    icon: Binary,
    className: "lg:col-span-5",
    accent: "geometry",
  },
  {
    title: "Marriage Matchmaking",
    eyebrow: "Union harmony",
    description:
      "A sensitive compatibility analysis blending kundli matching, emotional temperament, longevity markers, and family harmony indicators.",
    icon: HeartHandshake,
    className: "lg:col-span-5",
    accent: "match",
  },
  {
    title: "Tarot Reading",
    eyebrow: "Symbolic clarity",
    description:
      "A cinematic tarot experience for urgent decisions, hidden influences, and intuitive next steps revealed through archetypal light.",
    icon: Sparkles,
    className: "lg:col-span-7",
    accent: "tarot",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

function RevealGroup({
  children,
  className = "",
  immediate = false,
}: PropsWithChildren<{ className?: string; immediate?: boolean }>) {
  const visibilityProps = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-90px" } };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      {...visibilityProps}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, href }: PropsWithChildren<{ href: string }>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--x", `${pointerX}px`);
    event.currentTarget.style.setProperty("--y", `${pointerY}px`);
    x.set((pointerX - rect.width / 2) * 0.22);
    y.set((pointerY - rect.height / 2) * 0.22);
  }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-antique/35 bg-white/[0.035] px-7 py-4 text-sm font-semibold uppercase text-white shadow-aureate backdrop-blur-xl"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(197,168,128,0.30),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute -left-16 top-0 h-full w-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-80" />
      <span className="relative flex items-center gap-3">
        {children}
        <WandSparkles size={17} className="text-antique" />
      </span>
    </motion.a>
  );
}

function TiltCard({ service }: { service: Service }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const Icon = service.icon;
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 34%)`;

  // Customized WhatsApp messages for each service
  const serviceMessages: Record<string, string> = {
    "Astrology Consultation": "Hi Manju! I'm interested in booking an Astrology Consultation. Could you please help me with a natal chart reading and career guidance? 🔮",
    "Numerology Consultation": "Hello! I'd like to book a Numerology Consultation with you. Please help me understand my birth number and life path vibrations. 🔢",
    "Marriage Matchmaking": "Hi Manju! I'm looking for Marriage Matchmaking services. Could you help me analyze compatibility with my partner through kundli matching? 💕",
    "Tarot Reading": "Hello! I need a Tarot Reading for some important life decisions. Could you please guide me through this? ✨",
  };

  const whatsappMessage = encodeURIComponent(
    serviceMessages[service.title] || "Hi Manju! I'd like to book a consultation with you. 🙏"
  );
  const whatsappHref = `https://wa.me/918860647886?text=${whatsappMessage}`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 10);
    rotateY.set((px - 0.5) * 12);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  return (
    <motion.article
      variants={reveal}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`glass-panel group relative min-h-[330px] overflow-hidden rounded-lg p-6 transition duration-500 hover:border-antique/25 md:p-8 ${service.className}`}
    >
      <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-antique/80">{service.eyebrow}</p>
            <h3 className="editorial-title max-w-xl text-3xl text-white md:text-5xl">{service.title}</h3>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-antique">
            <Icon size={30} strokeWidth={1.35} />
          </div>
        </div>
        <p className="max-w-2xl text-base leading-8 text-white/66 md:text-lg">{service.description}</p>

        {/* Premium WhatsApp Button */}
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="group/btn relative w-fit inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm uppercase transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.15))",
            border: "1.5px solid rgba(34, 197, 94, 0.4)",
          }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

          {/* Glow effect */}
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 blur group-hover/btn:opacity-30 transition-opacity duration-300" />

          <div className="relative flex items-center gap-2 text-white">
            <MessageCircle size={16} className="text-green-400" />
            <span>Book on WhatsApp</span>
          </div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute inset-0 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </motion.a>
      </div>
      <ServiceAccent type={service.accent} />
    </motion.article>
  );
}

function ServiceAccent({ type }: { type: Service["accent"] }) {
  if (type === "orbit") {
    return (
      <div className="absolute bottom-8 right-10 h-36 w-36 rounded-full border border-antique/20">
        <span className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-antique shadow-aureate" style={{ animation: "orbit 7s linear infinite" }} />
        <span className="absolute inset-7 rounded-full border border-violet-300/10" style={{ animation: "pulse-ring 4s ease-in-out infinite" }} />
      </div>
    );
  }
  if (type === "geometry") {
    return <div className="absolute -bottom-12 -right-10 h-56 w-56 rotate-45 border border-white/10 bg-[linear-gradient(135deg,rgba(91,63,214,0.16),transparent)]" />;
  }
  if (type === "match") {
    return <div className="absolute inset-4 rounded-lg border border-antique/15 shadow-[0_0_45px_rgba(197,168,128,0.12)]" />;
  }
  return <div className="absolute -right-12 top-0 h-full w-32 translate-x-10 bg-gradient-to-b from-transparent via-antique/20 to-transparent opacity-0 blur-2xl transition duration-700 group-hover:translate-x-0 group-hover:opacity-100" />;
}

function AmbientStage() {
  const { scrollYProgress } = useScroll();
  const slow = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const medium = useTransform(scrollYProgress, [0, 1], [0, 340]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div style={{ y: slow }} className="absolute inset-0 bg-[linear-gradient(115deg,rgba(127,29,58,0.20),transparent_36%,rgba(20,83,45,0.16)_72%,transparent)]" />
      <motion.svg style={{ y: medium }} className="absolute left-8 top-28 h-[42rem] w-[42rem] opacity-20" viewBox="0 0 600 600" fill="none">
        <path d="M72 164L214 86L376 174L505 112M214 86L260 306L505 112M260 306L410 484L376 174M72 164L260 306" stroke="rgba(255,255,255,.26)" strokeWidth="1" />
        {[72, 214, 376, 505, 260, 410].map((cx, index) => (
          <circle key={cx} cx={cx} cy={[164, 86, 174, 112, 306, 484][index]} r="3" fill="rgba(197,168,128,.9)" />
        ))}
      </motion.svg>
      <motion.div style={{ y: drift }} className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:120px_120px] opacity-[0.06]" />
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-lg p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="name" aria-label="Name" placeholder="Your name" className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-antique/45" />
        <input required name="email" type="email" aria-label="Email" placeholder="Email address" className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-antique/45" />
      </div>
      <textarea required name="message" aria-label="Message" placeholder="What would you like the stars to clarify?" rows={5} className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.035] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-antique/45" />
      <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-antique/30 bg-antique/10 px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-antique/20 md:w-auto">
        Send Inquiry <Send size={16} />
      </button>
      {submitted ? <p aria-live="polite" className="mt-4 text-sm text-antique">Your inquiry is noted. Please use WhatsApp or email for the fastest direct confirmation.</p> : null}
    </form>
  );
}

export default function CosmicLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.25]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      <AmbientStage />
      <FloatingWhatsAppWidget />
      <header className="fixed left-1/2 top-5 z-40 w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#03030f]/70 px-4 py-3 shadow-2xl backdrop-blur-2xl md:rounded-full">
        <nav className="flex items-center justify-between gap-4" aria-label="Primary navigation">
          <a href="#sanctuary" className="flex items-center gap-3 text-sm font-bold uppercase text-white" onClick={() => setIsMenuOpen(false)}>
            <MoonStar className="text-antique" size={20} /> Astro Manju
          </a>
          <div className="hidden items-center gap-7 text-xs uppercase text-white/58 md:flex">
            {navItems.map((item) => <a key={item.href} href={item.href} className="transition hover:text-antique">{item.label}</a>)}
          </div>
          <a href="#contact" className="hidden rounded-full border border-antique/30 bg-white/[0.035] px-5 py-3 text-xs font-bold uppercase text-white shadow-aureate transition hover:bg-antique/15 md:block">Book a Reading</a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-antique/35 hover:text-antique md:hidden"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
        {isMenuOpen ? (
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 md:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold uppercase text-white/78 transition hover:bg-white/[0.04] hover:text-antique">
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <motion.section id="sanctuary" style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 flex min-h-[92vh] items-center justify-center overflow-hidden px-5 pb-12 pt-32 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/hero-cosmic-chart.png')] bg-cover bg-center opacity-85" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,15,0.20),rgba(3,3,15,0.72)_72%,#03030f)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#03030f_0%,rgba(3,3,15,0.64)_28%,rgba(3,3,15,0.22)_62%,#03030f_100%)]" />
        </div>
        <RevealGroup immediate className="mx-auto max-w-6xl">
          <motion.div variants={reveal} className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-xs uppercase text-antique backdrop-blur-md">
            <Star size={14} /> Private celestial guidance
          </motion.div>
          <motion.h1 variants={reveal} className="editorial-title text-balance text-4xl leading-[1.02] text-white sm:text-5xl md:text-7xl lg:text-8xl">
            Discover Your Destiny With <span className="gold-text">Astro Manju</span>
          </motion.h1>
          <motion.p variants={reveal} className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/64 md:text-xl">
            A bespoke astrology sanctuary where ancient timing, numerological resonance, matchmaking wisdom, and tarot symbolism are composed into one luminous personal strategy.
          </motion.p>
          <motion.div variants={reveal} className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <MagneticButton href="#contact">Begin Your Reading</MagneticButton>
            <a href="#services" className="text-sm font-semibold uppercase text-white/58 transition hover:text-antique">Explore services</a>
          </motion.div>
        </RevealGroup>
      </motion.section>

      <section id="services" className="relative z-10 px-5 py-24 md:py-32">
        <RevealGroup className="mx-auto max-w-7xl">
          <motion.p variants={reveal} className="text-center text-xs font-bold uppercase text-antique/70">Signature consultations</motion.p>
          <motion.h2 variants={reveal} className="editorial-title mx-auto mt-5 max-w-4xl text-center text-4xl text-white md:text-6xl">
            Luxury readings designed like constellations: intricate, dimensional, and deeply personal.
          </motion.h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            {services.map((service) => <TiltCard key={service.title} service={service} />)}
          </div>
        </RevealGroup>
      </section>

      <section id="ritual" className="relative z-10 px-5 py-20">
        <RevealGroup className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["01", "Chart immersion", "Your birth data and present question are treated with confidentiality and exacting symbolic care."],
            ["02", "Cosmic synthesis", "Astrology, numerology, tarot, and compatibility signals are translated into a cohesive narrative."],
            ["03", "Actionable remedy", "You receive refined next steps, auspicious timing windows, and spiritual practices suited to your path."],
          ].map(([number, title, text]) => (
            <motion.div key={number} variants={reveal} className="glass-panel rounded-lg p-7">
              <p className="gold-text editorial-title text-5xl">{number}</p>
              <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 leading-7 text-white/58">{text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <footer id="contact" className="relative z-10 px-5 pb-10 pt-24">
        <RevealGroup className="mx-auto max-w-7xl">
          <motion.div variants={reveal} className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-bold uppercase text-antique/75">Private consultation</p>
              <h2 className="editorial-title mt-5 text-4xl text-white md:text-6xl">Enter the cosmic realm with Manju Gambhir.</h2>
              <p className="mt-6 max-w-xl leading-8 text-white/60">Share your birth details, relationship question, or decision point. Direct communication is available for urgent scheduling and private consultation requests.</p>
              <div className="mt-8 flex flex-col gap-4 text-sm text-white/70">
                <a className="group relative w-fit rounded-full border border-white/10 px-5 py-3 transition hover:border-antique/40 hover:text-white" href={whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp: +91 8860647886
                  <span className="pointer-events-none absolute -top-11 left-4 rounded-full bg-antique px-3 py-1 text-xs font-bold text-void opacity-0 shadow-aureate transition group-hover:opacity-100">Open WhatsApp</span>
                </a>
                <a className="group relative w-fit rounded-full border border-white/10 px-5 py-3 transition hover:border-antique/40 hover:text-white" href="mailto:manjugambhir8341@gmail.com">
                  <Mail className="mr-2 inline text-antique" size={15} /> manjugambhir8341@gmail.com
                  <span className="pointer-events-none absolute -top-11 left-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-void opacity-0 shadow-aureate transition group-hover:opacity-100">Compose email</span>
                </a>
              </div>
            </div>
            <ContactForm />
          </motion.div>
          <motion.div variants={reveal} className="flex flex-col justify-between gap-5 py-8 text-xs uppercase text-white/38 md:flex-row">
            <p>© 2026 Astro Manju. All celestial rights reserved.</p>
            <div className="flex gap-5"><a href="#services">Offerings</a><a href="#ritual">Ritual</a><a href="#contact">Book</a></div>
          </motion.div>
        </RevealGroup>
      </footer>
    </main>
  );
}
