'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { CalculatorResults } from '@/lib/calculations';
import { formatCOP, formatROAS } from '@/lib/calculations';

type VerdictColor = 'success' | 'warning' | 'danger';

interface Verdict {
  title: string;
  body: string;
  color: VerdictColor;
}

function getVerdict(r: CalculatorResults): Verdict {
  if (r.contribucionPorVenta <= 0) {
    return {
      title: 'Pérdida en cada venta',
      body: 'Tu negocio actualmente pierde plata en cada venta antes de pauta. Hay que revisar unit economics antes de escalar ads.',
      color: 'danger',
    };
  }
  if (r.breakevenROAS < 2.0) {
    return {
      title: 'Márgenes saludables',
      body: 'Tu negocio tiene buen margen para pauta rentable. La ejecución importa, pero las matemáticas están de tu lado.',
      color: 'success',
    };
  }
  if (r.breakevenROAS <= 3.5) {
    return {
      title: 'Ejecución quirúrgica requerida',
      body: 'Tu negocio puede funcionar con pauta, pero los márgenes no perdonan errores. Necesitas tracking real y creativos que conviertan.',
      color: 'warning',
    };
  }
  return {
    title: 'Márgenes comprimidos',
    body: 'Con este breakeven, la pauta necesita reestructuración antes de escalar. El problema no es la pauta — es el unit economic.',
    color: 'danger',
  };
}

const verdictColorMap: Record<VerdictColor, { border: string; text: string }> = {
  success: { border: 'border-l-success', text: 'text-success' },
  warning: { border: 'border-l-warning', text: 'text-warning' },
  danger: { border: 'border-l-danger', text: 'text-danger' },
};

interface AnimatedROASProps {
  value: number;
}

function AnimatedROAS({ value }: AnimatedROASProps) {
  const mv = useMotionValue(value);
  const display = useTransform(mv, (latest) => {
    if (latest >= 999) return '∞';
    return latest.toFixed(1);
  });
  const [text, setText] = useState<string>(formatROAS(value).replace('x', ''));
  const prevRef = useRef<number>(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.3,
      ease: 'easeOut',
      onUpdate: (latest) => {
        mv.set(latest);
      },
    });
    const unsub = display.on('change', (v) => setText(v));
    prevRef.current = value;
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, mv, display]);

  const suffix = value >= 999 ? '' : 'x';

  return (
    <div className="flex items-baseline gap-2">
      <span className="display-huge text-accent">{text}</span>
      {suffix && (
        <span className="text-text-secondary text-3xl md:text-4xl font-serif">
          {suffix}
        </span>
      )}
    </div>
  );
}

interface ResultsPanelProps {
  results: CalculatorResults;
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const verdict = getVerdict(results);
  const vColor = verdictColorMap[verdict.color];

  return (
    <div className="relative">
      {/* Accent glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[2rem] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255, 77, 28, 0.18), rgba(255, 77, 28, 0) 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-surface border border-border rounded-2xl p-6 md:p-8"
      >
        <p className="label-caps mb-4">TU BREAKEVEN ROAS REAL</p>

        <AnimatedROAS value={results.breakevenROAS} />

        <div className="my-6 border-t border-border" />

        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-text-secondary">Margen real por venta</dt>
            <dd className="text-text-primary font-medium tabular-nums">
              {formatCOP(results.margenRealPorVenta)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-text-secondary">Máximo CAC sostenible</dt>
            <dd className="text-text-primary font-medium tabular-nums">
              {formatCOP(results.maxCACSostenible)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-text-secondary">ROAS objetivo (salud)</dt>
            <dd className="text-text-primary font-medium tabular-nums">
              {formatROAS(results.targetROAS)}
            </dd>
          </div>
        </dl>

        <div className="my-6 border-t border-border" />

        <div
          className={`bg-surface-raised rounded-lg p-4 border-l-4 ${vColor.border}`}
        >
          <p className={`text-sm font-semibold mb-1 ${vColor.text}`}>
            {verdict.title}
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            {verdict.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
