"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Namaste! 🙏 I'm interested in learning more about Resonate Healers' astrology and numerology services. Could you please help me book a consultation with Manju Gambhir?"
  );

  const whatsappLink = `https://wa.me/918860647886?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-panel absolute bottom-20 right-0 mb-4 rounded-2xl border border-antique/30 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl w-80"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm opacity-75 animate-pulse" />
                  <div className="relative rounded-full bg-green-500 p-1.5">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Resonate Healers</h3>
                  <p className="text-antique/70 text-xs">Usually responds instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition p-1"
                aria-label="Close widget"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-white/70 text-sm leading-relaxed">
                Welcome to Resonate Healers! ✨ Connect with Manju Gambhir for personalized astrology, numerology, tarot readings, and marriage matchmaking guidance.
              </p>

              <div className="space-y-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>

                <p className="text-white/40 text-xs text-center">Click the button to open WhatsApp</p>
              </div>
            </div>

            <div className="absolute top-0 right-4 h-1 w-16 bg-gradient-to-r from-emerald-400 to-transparent rounded-b-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
        aria-label="Open WhatsApp chat"
      >
        {/* Glowing background orbs */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 blur-xl opacity-60 animate-pulse group-hover:opacity-100 transition" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 blur-lg opacity-40 animate-pulse group-hover:opacity-60 transition" style={{ animationDelay: "0.2s" }} />

        {/* Main button */}
        <div className="relative rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 p-4 shadow-2xl hover:shadow-emerald-500/50 transition">
          <MessageCircle size={28} className="text-white" />

          {/* Floating particles effect */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-2 -left-1 w-1.5 h-1.5 bg-emerald-200 rounded-full"
            animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>

        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border border-emerald-400"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );
}
