"use client"

import { useState } from "react"

const services = [
  { nom: "Coupe femme", prix: "45€", desc: "Coupe + brushing inclus" },
  { nom: "Coupe homme", prix: "25€", desc: "Coupe + finitions soignées" },
  { nom: "Coloration", prix: "dès 65€", desc: "Couleur pleine ou racines" },
  { nom: "Balayage", prix: "dès 80€", desc: "Balayage naturel ou californien" },
  { nom: "Brushing", prix: "30€", desc: "Mise en forme et volume" },
  { nom: "Soin & traitement", prix: "35€", desc: "Soin kératine ou hydratant" },
]

const galerie = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop",
]

export default function Home() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  })
  const [status, setStatus] = useState("idle")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-widest text-stone-800 uppercase">
            L&apos;Atelier
          </span>
          <div className="hidden md:flex gap-8 text-sm text-stone-600 tracking-wide">
            <a href="#services" className="hover:text-stone-900 transition-colors">Services</a>
            <a href="#about" className="hover:text-stone-900 transition-colors">A propos</a>
            <a href="#galerie" className="hover:text-stone-900 transition-colors">Galerie</a>
            <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="bg-stone-800 text-white px-5 py-2 text-sm tracking-wide hover:bg-stone-700 transition-colors"
          >
            Prendre RDV
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop"
          alt="Salon de coiffure L'Atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-stone-300">
            Salon de coiffure a Bruxelles
          </p>
          <h1 className="text-6xl md:text-8xl font-light tracking-wide mb-6">L&apos;Atelier</h1>
          <p className="text-lg md:text-xl text-stone-300 mb-10 font-light">
            L&apos;art de sublimer votre beaute naturelle
          </p>
          <a
            href="#contact"
            className="border border-white text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            Reserver maintenant
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-3">
              Ce que nous proposons
            </p>
            <h2 className="text-4xl font-light text-stone-800">Nos services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-stone-200">
            {services.map((s) => (
              <div key={s.nom} className="bg-white p-10 hover:bg-stone-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-stone-800">{s.nom}</h3>
                  <span className="text-stone-500 font-light">{s.prix}</span>
                </div>
                <p className="text-sm text-stone-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop"
              alt="Sophie Martin - coiffeuse"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">Notre histoire</p>
            <h2 className="text-4xl font-light text-stone-800 mb-6">Bonjour, je suis Sophie</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Passionnee par la coiffure depuis plus de 15 ans, j&apos;ai ouvert L&apos;Atelier avec une
              conviction simple : chaque personne merite une coiffure qui lui ressemble vraiment.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Dans mon salon, vous trouverez une ambiance chaleureuse, des produits de qualite, et
              surtout une ecoute attentive de vos envies.
            </p>
            <a
              href="#contact"
              className="bg-stone-800 text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-stone-700 transition-colors inline-block"
            >
              Prendre RDV
            </a>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section id="galerie" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-3">Nos realisations</p>
            <h2 className="text-4xl font-light text-stone-800">Galerie</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galerie.map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={url}
                  alt={`Realisation ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">Nous trouver</p>
            <h2 className="text-4xl font-light mb-10">Contact & Horaires</h2>
            <div className="space-y-6 text-stone-300">
              <div>
                <p className="text-white font-medium mb-1">Adresse</p>
                <p>Rue de la Loi 42, 1000 Bruxelles</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Telephone</p>
                <a href="tel:+3221234567" className="hover:text-white transition-colors">
                  +32 2 123 45 67
                </a>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Horaires</p>
                <div className="space-y-2 text-sm">
                  {[
                    ["Lundi", "Ferme"],
                    ["Mardi - Vendredi", "9h - 19h"],
                    ["Samedi", "9h - 17h"],
                    ["Dimanche", "Ferme"],
                  ].map(([jour, h]) => (
                    <div key={jour} className="flex justify-between border-b border-stone-800 pb-2">
                      <span>{jour}</span>
                      <span className={h === "Ferme" ? "text-stone-500" : "text-white"}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-4">
              Prendre rendez-vous
            </p>
            <h3 className="text-2xl font-light mb-8">Envoyez-nous un message</h3>

            {status === "success" ? (
              <div className="bg-stone-800 border border-stone-600 p-8 text-center">
                <p className="text-2xl mb-2">✓</p>
                <p className="text-white font-medium mb-1">Message envoye !</p>
                <p className="text-stone-400 text-sm">
                  Nous vous repondrons dans les plus brefs delais.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-stone-400 hover:text-white underline transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors"
                />
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Votre telephone"
                  className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message (service souhaite, disponibilites...)"
                  rows={4}
                  required
                  className="w-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                />

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Une erreur est survenue. Veuillez reessayer.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white text-stone-900 py-3 text-sm tracking-widest uppercase hover:bg-stone-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-500 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <span className="text-white tracking-widest uppercase">L&apos;Atelier</span>
          <span>2025 L&apos;Atelier - Tous droits reserves</span>
          <span>Site realise par <span className="text-white">Seyy Dev</span></span>
        </div>
      </footer>

    </main>
  )
}