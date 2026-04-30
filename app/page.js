"use client"

import { useState, useEffect, useRef } from "react"

const services = [
  { nom: "Coupe femme", prix: "45", desc: "Coupe + brushing inclus", duree: "45 min" },
  { nom: "Coupe homme", prix: "25", desc: "Coupe + finitions soignees", duree: "30 min" },
  { nom: "Coloration", prix: "65", desc: "Couleur pleine ou racines", duree: "1h30" },
  { nom: "Balayage", prix: "80", desc: "Balayage naturel ou californien", duree: "2h00" },
  { nom: "Brushing", prix: "30", desc: "Mise en forme et volume", duree: "30 min" },
  { nom: "Soin & traitement", prix: "35", desc: "Soin keratine ou hydratant", duree: "45 min" },
]

const galerie = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=1000&fit=crop",
]

const temoignages = [
  { nom: "Marie L.", note: 5, txt: "Un savoir-faire exceptionnel. Sophie comprend toujours exactement ce que je veux et le resultat est sublime a chaque fois." },
  { nom: "Camille D.", note: 5, txt: "L'ambiance du salon est magnifique, on se sent comme chez soi. Et les colorations sont d'une precision incroyable." },
  { nom: "Julie P.", note: 5, txt: "Premier salon ou je sors avec EXACTEMENT la coupe que j'avais imaginee. Sophie est une artiste, je ne change plus." },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({ nom: "", email: "", telephone: "", message: "" })
  const [status, setStatus] = useState("idle")
  const [scrollY, setScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setScrolled(window.scrollY > 80)
    }
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("scroll", onScroll)
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  useEffect(() => {
    const i = setInterval(() => setActiveImg((p) => (p + 1) % galerie.length), 4000)
    return () => clearInterval(i)
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("https://formspree.io/f/xjglbowe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus("success")
        setFormData({ nom: "", email: "", telephone: "", message: "" })
      } else setStatus("error")
    } catch { setStatus("error") }
  }

  return (
    <main className="bg-[#faf8f5] text-stone-900 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .display { font-family: 'Cormorant Garamond', serif; }

        @keyframes float-slow { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes draw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        @keyframes pulse-soft { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .float-slow { animation: float-slow 6s ease-in-out infinite; }
        .pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
        .marquee { animation: marquee 30s linear infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #1c1917 0%, #a8a29e 50%, #1c1917 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .magnetic { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .magnetic:hover { transform: translateY(-3px); }

        .img-reveal { clip-path: inset(100% 0 0 0); transition: clip-path 1.4s cubic-bezier(0.77,0,0.18,1); }
        .img-reveal.in { clip-path: inset(0 0 0 0); }

        .scribble { stroke-dasharray: 1000; animation: draw 2s ease-out forwards; }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .cursor-dot {
          position: fixed; pointer-events: none; z-index: 100;
          width: 24px; height: 24px; border: 1px solid rgba(180,140,100,0.5);
          border-radius: 50%; transition: transform 0.15s ease, opacity 0.3s ease;
          mix-blend-mode: difference;
        }

        .marquee-track { display: flex; gap: 4rem; white-space: nowrap; }

        .service-row { transition: padding-left 0.5s cubic-bezier(0.22,1,0.36,1), background 0.5s ease; }
        .service-row:hover { padding-left: 2rem; background: rgba(180,140,100,0.05); }
        .service-row:hover .service-arrow { opacity: 1; transform: translateX(0); }
        .service-arrow { opacity: 0; transform: translateX(-10px); transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }

        @media (hover: none) { .cursor-dot { display: none; } }
      `}</style>

      <div className="grain" />
      <div className="cursor-dot hidden md:block" style={{ left: cursorPos.x - 12, top: cursorPos.y - 12 }} />

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#faf8f5]/95 backdrop-blur-xl border-b border-stone-200/60 py-3" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <a href="#" className="display text-2xl tracking-tight font-medium">
            L<span className="italic font-light">&apos;Atelier</span>
          </a>
          <div className="hidden md:flex gap-12 text-xs tracking-[0.2em] uppercase text-stone-600">
            {["Services","Histoire","Galerie","Contact"].map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-stone-900 transition-colors relative group">
                <span className="text-stone-400 mr-2 text-[10px]">0{i+1}</span>{l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>
          <a href="#contact" className="magnetic group relative overflow-hidden bg-stone-900 text-stone-50 px-6 py-3 text-xs tracking-[0.2em] uppercase">
            <span className="relative z-10">Reserver</span>
            <span className="absolute inset-0 bg-[#b48c64] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-8 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl float-slow"
             style={{ background: "radial-gradient(circle, #d4a574, transparent)" }} />
        <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full opacity-15 blur-3xl pulse-soft"
             style={{ background: "radial-gradient(circle, #c8a589, transparent)" }} />

        {/* Vertical text accent */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 -rotate-90 origin-left translate-y-12">
            Bruxelles · Est. 2010
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 lg:pl-20">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-[#b48c64]" />
                <p className="text-xs tracking-[0.3em] uppercase text-stone-500">
                  Salon de coiffure d&apos;exception
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="display text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] font-light mb-6">
                <span className="block">L&apos;art</span>
                <span className="block italic font-light text-stone-500 ml-12">de la</span>
                <span className="block shimmer-text font-medium">coiffure.</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg text-stone-600 max-w-md mb-12 leading-relaxed font-light">
                Un salon ou chaque coupe raconte une histoire. Quinze ans
                d&apos;expertise au service de votre singularite.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#contact" className="magnetic group inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-8 py-4 text-xs tracking-[0.2em] uppercase">
                  Prendre rendez-vous
                  <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
                </a>
                <a href="#services" className="group inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase text-stone-700 border border-stone-300 hover:border-stone-900 transition-colors">
                  Decouvrir nos services
                </a>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-20 grid grid-cols-3 gap-8 max-w-md pt-8 border-t border-stone-200">
                {[
                  { v: "15", l: "Annees d'expertise" },
                  { v: "2k+", l: "Clientes fideles" },
                  { v: "5★", l: "Note moyenne" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="display text-4xl font-light mb-1">{s.v}</p>
                    <p className="text-[10px] tracking-widest uppercase text-stone-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right column - rotating gallery */}
          <div className="lg:col-span-5 relative h-[600px] hidden lg:block">
            <Reveal delay={300}>
              <div className="relative w-full h-full">
                {galerie.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="absolute overflow-hidden shadow-2xl"
                    style={{
                      width: i === 0 ? "70%" : "55%",
                      height: i === 0 ? "75%" : "55%",
                      top: i === 0 ? "10%" : i === 1 ? "0%" : "55%",
                      left: i === 0 ? "20%" : i === 1 ? "55%" : "0%",
                      transform: `translateY(${scrollY * (i === 0 ? 0.05 : i === 1 ? 0.12 : -0.08)}px)`,
                      zIndex: i === 0 ? 2 : 1,
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}

                {/* Floating tag */}
                <div className="absolute bottom-8 right-0 bg-[#faf8f5] px-6 py-4 shadow-xl z-10 max-w-[200px]"
                     style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
                  <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">Specialite</p>
                  <p className="display text-xl">Balayage californien</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE BANNER ────────────────────────────────── */}
      <section className="border-y border-stone-200 py-8 overflow-hidden bg-stone-50">
        <div className="marquee-track marquee">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-16 shrink-0">
              {["Coupe sur-mesure","·","Coloration vegetale","·","Balayage californien","·","Soins keratine","·","Conseil personnalise","·","Produits bio","·"].map((w, i) => (
                <span key={i} className="display text-3xl italic text-stone-400 font-light">{w}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section id="services" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <Reveal className="lg:col-span-4">
              <p className="text-xs tracking-[0.3em] uppercase text-[#b48c64] mb-4">— 01. Services</p>
              <h2 className="display text-6xl md:text-7xl font-light leading-none">
                Notre<br /><em className="text-stone-500">savoir-faire.</em>
              </h2>
            </Reveal>
            <Reveal delay={200} className="lg:col-span-7 lg:col-start-6 self-end">
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Chaque prestation est pensee comme un moment d&apos;exception.
                Des produits selectionnes avec soin, des techniques eprouvees,
                et surtout une ecoute attentive de vos envies.
              </p>
            </Reveal>
          </div>

          <div className="border-t border-stone-200">
            {services.map((srv, i) => (
              <Reveal key={srv.nom} delay={i * 80}>
                <div className="service-row group cursor-pointer border-b border-stone-200 py-8 px-4 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 display text-3xl font-light text-stone-300">0{i+1}</div>
                  <div className="col-span-5">
                    <h3 className="display text-3xl font-light mb-1">{srv.nom}</h3>
                    <p className="text-sm text-stone-500 font-light">{srv.desc}</p>
                  </div>
                  <div className="col-span-2 text-xs tracking-widest uppercase text-stone-400">{srv.duree}</div>
                  <div className="col-span-3 text-right">
                    <span className="display text-3xl">{srv.prix}<span className="text-lg text-stone-400 ml-1">EUR</span></span>
                  </div>
                  <div className="col-span-1 text-right service-arrow display text-2xl text-[#b48c64]">&#8594;</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTOIRE / ABOUT ─────────────────────────────── */}
      <section id="histoire" className="py-32 px-8 bg-stone-100 relative overflow-hidden">
        <div className="absolute top-20 right-20 display text-[20rem] font-light text-stone-200 leading-none select-none pointer-events-none">
          S
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop"
                    alt="Sophie"
                    className="w-full h-full object-cover"
                    style={{ transform: `translateY(${scrollY * 0.05}px) scale(1.1)` }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#b48c64] text-stone-50 px-8 py-6">
                  <p className="display text-3xl font-light">15 ans</p>
                  <p className="text-[10px] tracking-widest uppercase mt-1 opacity-80">D&apos;expertise</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={150}>
              <p className="text-xs tracking-[0.3em] uppercase text-[#b48c64] mb-4">— 02. Histoire</p>
              <h2 className="display text-6xl md:text-7xl font-light leading-none mb-8">
                Sophie<br /><em className="text-stone-500">Martin.</em>
              </h2>
              <p className="text-lg text-stone-700 leading-relaxed font-light mb-6">
                Diplomee de l&apos;Academie Sassoon a Londres, j&apos;ai exerce dans les plus
                grandes maisons parisiennes avant de poser mes ciseaux a Bruxelles
                en 2010.
              </p>
              <p className="text-base text-stone-600 leading-relaxed font-light mb-10">
                L&apos;Atelier est ne d&apos;une conviction simple : chaque visage merite
                une coiffure pensee pour lui. Pas de tendance, pas de copie —
                juste vous, sublime.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-20 h-px bg-stone-400" />
                <p className="display italic text-2xl text-stone-700">— Sophie</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GALERIE ──────────────────────────────────────── */}
      <section id="galerie" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#b48c64] mb-4">— 03. Galerie</p>
                <h2 className="display text-6xl md:text-7xl font-light leading-none">
                  Nos plus belles<br /><em className="text-stone-500">creations.</em>
                </h2>
              </div>
              <p className="text-sm text-stone-500 max-w-xs font-light">
                Une selection de nos realisations recentes. Chaque coiffure est unique,
                pensee pour celle qui la porte.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-12 gap-4">
            {galerie.map((img, i) => {
              const layouts = [
                "col-span-7 row-span-2 aspect-[4/5]",
                "col-span-5 aspect-[4/3]",
                "col-span-5 aspect-[4/3]",
                "col-span-4 aspect-square",
                "col-span-4 aspect-square",
                "col-span-4 aspect-square",
              ]
              return (
                <Reveal key={i} delay={i * 80} className={layouts[i]}>
                  <div className="relative w-full h-full overflow-hidden group cursor-pointer">
                    <img
                      src={img}
                      alt={`Realisation ${i+1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-all duration-700 flex items-end p-6">
                      <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <p className="text-stone-50 text-xs tracking-widest uppercase">Realisation 0{i+1}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ──────────────────────────────────── */}
      <section className="py-32 px-8 bg-stone-900 text-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 display text-[15rem] font-light leading-none">{'"'}</div>
          <div className="absolute bottom-20 right-20 display text-[15rem] font-light leading-none rotate-180">{'"'}</div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.3em] uppercase text-[#d4a574] mb-4">— 04. Temoignages</p>
              <h2 className="display text-6xl md:text-7xl font-light leading-none">
                Elles parlent<br /><em className="text-stone-400">de nous.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {temoignages.map((t, i) => (
              <Reveal key={t.nom} delay={i * 200}>
                <div className="border border-stone-700 p-10 h-full hover:border-[#b48c64] transition-colors duration-500 group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.note)].map((_, k) => (
                      <span key={k} className="text-[#d4a574] text-lg">★</span>
                    ))}
                  </div>
                  <p className="display text-xl italic font-light leading-relaxed mb-8 text-stone-200">
                    {'"'}{t.txt}{'"'}
                  </p>
                  <div className="flex items-center gap-3 pt-6 border-t border-stone-800 group-hover:border-[#b48c64] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#b48c64]/20 flex items-center justify-center display text-lg">
                      {t.nom[0]}
                    </div>
                    <p className="text-sm tracking-wide">{t.nom}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="py-32 px-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style={{ background: "radial-gradient(circle, #d4a574, transparent)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16">
            <Reveal className="lg:col-span-5">
              <p className="text-xs tracking-[0.3em] uppercase text-[#b48c64] mb-4">— 05. Contact</p>
              <h2 className="display text-6xl md:text-7xl font-light leading-none mb-12">
                Reservez<br /><em className="text-stone-500">votre moment.</em>
              </h2>

              <div className="space-y-8 mb-12">
                {[
                  { l: "Adresse", v: "Rue de la Loi 42\n1000 Bruxelles" },
                  { l: "Telephone", v: "+32 2 123 45 67", href: "tel:+3221234567" },
                  { l: "Email", v: "contact@latelier.be", href: "mailto:contact@latelier.be" },
                ].map((c) => (
                  <div key={c.l}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#b48c64] mb-2">{c.l}</p>
                    {c.href ? (
                      <a href={c.href} className="text-lg font-light hover:text-[#b48c64] transition-colors whitespace-pre-line">
                        {c.v}
                      </a>
                    ) : (
                      <p className="text-lg font-light whitespace-pre-line">{c.v}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#b48c64] mb-4">Horaires</p>
                <div className="space-y-2 text-sm font-light">
                  {[
                    ["Lundi", "Ferme"],
                    ["Mardi — Vendredi", "9h — 19h"],
                    ["Samedi", "9h — 17h"],
                    ["Dimanche", "Ferme"],
                  ].map(([j, h]) => (
                    <div key={j} className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-600">{j}</span>
                      <span className={h === "Ferme" ? "text-stone-400" : ""}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="lg:col-span-6 lg:col-start-7">
              {status === "success" ? (
                <div className="border border-[#b48c64]/30 bg-[#b48c64]/5 p-16 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#b48c64] flex items-center justify-center mb-6">
                    <span className="text-stone-50 text-2xl">✓</span>
                  </div>
                  <h3 className="display text-3xl font-light mb-3">Message envoye</h3>
                  <p className="text-stone-600 font-light mb-8">Nous vous repondrons dans les plus brefs delais.</p>
                  <button onClick={() => setStatus("idle")} className="text-xs tracking-widest uppercase text-stone-500 hover:text-[#b48c64] underline">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block mb-2">Nom</label>
                      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" required
                        className="w-full bg-transparent border-b border-stone-300 py-3 text-base focus:outline-none focus:border-[#b48c64] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block mb-2">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" required
                        className="w-full bg-transparent border-b border-stone-300 py-3 text-base focus:outline-none focus:border-[#b48c64] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block mb-2">Telephone</label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="+32 ..."
                      className="w-full bg-transparent border-b border-stone-300 py-3 text-base focus:outline-none focus:border-[#b48c64] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase text-stone-500 block mb-2">Votre demande</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      placeholder="Service souhaite, disponibilites, questions..." rows={5} required
                      className="w-full bg-transparent border-b border-stone-300 py-3 text-base focus:outline-none focus:border-[#b48c64] transition-colors resize-none" />
                  </div>
                  {status === "error" && <p className="text-red-500 text-sm">Une erreur est survenue. Veuillez reessayer.</p>}
                  <button type="submit" disabled={status === "loading"}
                    className="magnetic group relative overflow-hidden w-full bg-stone-900 text-stone-50 py-5 text-xs tracking-[0.3em] uppercase disabled:opacity-50 mt-4">
                    <span className="relative z-10 inline-flex items-center gap-3">
                      {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                      <span className="group-hover:translate-x-1 transition-transform">&#8594;</span>
                    </span>
                    <span className="absolute inset-0 bg-[#b48c64] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-stone-950 text-stone-400 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-stone-800">
            <div>
              <p className="display text-3xl text-stone-50 mb-4">L<span className="italic font-light">&apos;Atelier</span></p>
              <p className="text-sm leading-relaxed font-light max-w-xs">
                Salon de coiffure d&apos;exception au coeur de Bruxelles depuis 2010.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b48c64] mb-4">Navigation</p>
              <div className="space-y-2 text-sm">
                {["Services","Histoire","Galerie","Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block hover:text-stone-50 transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b48c64] mb-4">Suivez-nous</p>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-stone-50 transition-colors">Instagram</a>
                <a href="#" className="block hover:text-stone-50 transition-colors">Facebook</a>
                <a href="#" className="block hover:text-stone-50 transition-colors">Pinterest</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <span>© 2025 L&apos;Atelier — Tous droits reserves</span>
            <span>Site realise par <a href="https://portfolio-seyy.vercel.app" className="text-stone-200 hover:text-[#b48c64] transition-colors">Seymen Yavas</a></span>
          </div>
        </div>
      </footer>

    </main>
  )
}