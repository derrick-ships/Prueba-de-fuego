'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const el = document.getElementById('calculadora');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[1200px] h-[1200px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255, 77, 28, 0.15), rgba(255, 77, 28, 0) 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="label-caps mb-6"
        >
          LA PRUEBA DE FUEGO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="display-hero text-text-primary mb-8"
        >
          Tu agencia <span className="text-accent">nunca</span> hizo este cálculo.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[640px] mx-auto mb-10"
        >
          Por eso quemaste plata en pauta. En 60 segundos, calcula el ROAS real
          que tu negocio necesita para ser rentable — incluyendo margen, envío,
          devoluciones y comisiones. El número que ninguna agencia te mostró.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#calculadora"
            onClick={handleCTA}
            className="group inline-flex items-center justify-center rounded-lg bg-accent text-white px-6 py-3.5 text-sm font-medium shadow-accent-glow hover:shadow-accent-glow-hover transition-shadow focus-ring"
          >
            Hacer la Prueba de Fuego
          </a>
          <p className="text-text-muted text-xs">
            Gratis. 60 segundos. Sin registro.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
