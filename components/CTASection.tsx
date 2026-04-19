'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CTASection() {
  const [email, setEmail] = useState<string>('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailRegex.test(email.trim())) {
      setState('error');
      setErrorMsg('Ingresa un correo válido.');
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint || endpoint.includes('YOUR_ID_HERE')) {
      // eslint-disable-next-line no-console
      console.error(
        '[Delta] NEXT_PUBLIC_FORMSPREE_ENDPOINT no está configurado. ' +
          'Copia .env.local.example a .env.local y define el endpoint real de Formspree.',
      );
      setState('error');
      setErrorMsg(
        'El formulario no está configurado. Escríbenos directamente.',
      );
      return;
    }

    setState('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'prueba-de-fuego-landing',
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setState('success');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[Delta] Error al enviar formulario:', err);
      setState('error');
      setErrorMsg('No pudimos enviar el formulario. Intenta de nuevo.');
    }
  };

  return (
    <section
      id="agendar"
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6">
        <p className="label-caps mb-6">EL DIAGNÓSTICO COMPLETO</p>
        <h2 className="display-section text-text-primary mb-6">
          Este cálculo es el 20% de la Prueba de Fuego.
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[640px] mb-10">
          La Prueba de Fuego completa incluye auditoría de tracking con tu
          Business Manager abierto, inteligencia competitiva de 5 competidores
          directos, y análisis de rentabilidad real por producto. Si los
          números de tu negocio no dan para pauta rentable, te devolvemos el
          100%.
        </p>

        {state === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-surface border border-border rounded-xl p-6 flex items-start gap-4"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center">
              <Check size={18} />
            </div>
            <div>
              <p className="text-text-primary font-medium mb-1">Listo.</p>
              <p className="text-text-secondary text-sm">
                Te escribimos en menos de 24 horas para agendar.
              </p>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-xl"
            noValidate
          >
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === 'error') setState('idle');
              }}
              placeholder="tu@correo.com"
              className="flex-1 bg-surface border border-border rounded-lg h-12 px-4 text-text-primary placeholder:text-text-muted focus-ring focus:border-border-strong outline-none transition-colors"
              aria-describedby={errorMsg ? 'email-error' : undefined}
              aria-invalid={state === 'error'}
            />
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="inline-flex items-center justify-center rounded-lg bg-accent text-white px-6 h-12 text-sm font-medium shadow-accent-glow hover:shadow-accent-glow-hover transition-shadow focus-ring disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {state === 'submitting'
                ? 'Enviando...'
                : 'Agendar Prueba de Fuego'}
            </button>
          </form>
        )}

        {state === 'error' && errorMsg && (
          <p
            id="email-error"
            className="text-text-secondary text-sm mt-3"
            role="alert"
          >
            {errorMsg}
          </p>
        )}
      </div>
    </section>
  );
}
