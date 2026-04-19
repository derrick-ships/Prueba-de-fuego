'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, X } from 'lucide-react';
import InputCard from './InputCard';
import Slider from './Slider';
import NumberInput from './NumberInput';
import ResultsPanel from './ResultsPanel';
import {
  calculateBreakeven,
  formatCOP,
  formatROAS,
  type CalculatorInputs,
} from '@/lib/calculations';

const defaults: CalculatorInputs = {
  ticketPromedio: 120000,
  margenBrutoPct: 40,
  costoEnvio: 15000,
  comisionPasarelaPct: 3.5,
  tasaDevolucionesPct: 8,
  feeAgenciaPct: 15,
};

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaults);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const results = useMemo(() => calculateBreakeven(inputs), [inputs]);

  const update = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K],
  ): void => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Prevent body scroll when mobile modal open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <section
      id="calculadora"
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="label-caps mb-6">DIAGNÓSTICO INTERACTIVO</p>
          <h2 className="display-section text-text-primary mb-4">
            La Prueba de Fuego
          </h2>
          <p className="text-text-secondary text-base md:text-lg">
            Ingresa los números reales de tu negocio. El resultado se actualiza
            en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Inputs */}
          <div className="md:col-span-3 flex flex-col gap-4 pb-32 md:pb-0">
            <InputCard
              id="ticket"
              label="Ticket promedio"
              displayValue={formatCOP(inputs.ticketPromedio)}
              helper="El precio promedio de venta de tu producto o servicio"
            >
              <NumberInput
                id="ticket"
                value={inputs.ticketPromedio}
                onChange={(v) => update('ticketPromedio', v)}
                prefix="$"
                min={0}
                step={1000}
                ariaLabel="Ticket promedio en pesos colombianos"
              />
            </InputCard>

            <InputCard
              id="margen"
              label="Margen bruto"
              displayValue={`${inputs.margenBrutoPct}%`}
              helper="Qué porcentaje del ticket queda después del costo del producto, antes de marketing"
            >
              <Slider
                id="margen"
                value={inputs.margenBrutoPct}
                min={10}
                max={90}
                step={1}
                onChange={(v) => update('margenBrutoPct', v)}
                ariaLabel="Margen bruto en porcentaje"
              />
            </InputCard>

            <InputCard
              id="envio"
              label="Costo de envío por pedido"
              displayValue={formatCOP(inputs.costoEnvio)}
              helper="Promedio que gastas en envío por venta. Si el cliente paga envío, pon 0."
            >
              <NumberInput
                id="envio"
                value={inputs.costoEnvio}
                onChange={(v) => update('costoEnvio', v)}
                prefix="$"
                min={0}
                step={500}
                ariaLabel="Costo de envío por pedido en pesos colombianos"
              />
            </InputCard>

            <InputCard
              id="pasarela"
              label="Comisión de pasarela"
              displayValue={`${inputs.comisionPasarelaPct.toFixed(1)}%`}
              helper="Wompi, PayU, Mercado Pago, etc. Usualmente entre 2.9% y 4%."
            >
              <Slider
                id="pasarela"
                value={inputs.comisionPasarelaPct}
                min={0}
                max={10}
                step={0.1}
                onChange={(v) => update('comisionPasarelaPct', v)}
                ariaLabel="Comisión de pasarela en porcentaje"
              />
            </InputCard>

            <InputCard
              id="devoluciones"
              label="Tasa de devoluciones"
              displayValue={`${inputs.tasaDevolucionesPct.toFixed(1)}%`}
              helper="Qué porcentaje de ventas terminan en devolución o chargeback."
            >
              <Slider
                id="devoluciones"
                value={inputs.tasaDevolucionesPct}
                min={0}
                max={30}
                step={0.5}
                onChange={(v) => update('tasaDevolucionesPct', v)}
                ariaLabel="Tasa de devoluciones en porcentaje"
              />
            </InputCard>

            <InputCard
              id="fee"
              label="Fee de agencia o equipo"
              displayValue={`${inputs.feeAgenciaPct}%`}
              helper="Costo de tu agencia o equipo como porcentaje del ad spend. Si tú solo lo manejas, pon 0."
            >
              <Slider
                id="fee"
                value={inputs.feeAgenciaPct}
                min={0}
                max={30}
                step={1}
                onChange={(v) => update('feeAgenciaPct', v)}
                ariaLabel="Fee de agencia como porcentaje del ad spend"
              />
            </InputCard>
          </div>

          {/* Results — desktop sticky */}
          <div className="hidden md:block md:col-span-2">
            <div className="sticky top-24">
              <ResultsPanel results={results} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border-strong bg-surface/90 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-between px-5 py-4 focus-ring"
          aria-label="Ver resultados completos"
        >
          <div className="flex flex-col items-start">
            <span className="label-caps">BREAKEVEN ROAS</span>
            <span className="text-accent text-2xl font-medium tabular-nums mt-1">
              {formatROAS(results.breakevenROAS)}
            </span>
          </div>
          <ChevronUp className="text-text-secondary" size={22} />
        </button>
      </div>

      {/* Mobile modal */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-50 bg-canvas/95 backdrop-blur-sm overflow-y-auto"
          >
            <div className="min-h-full px-5 pt-6 pb-10">
              <div className="flex items-center justify-between mb-6">
                <p className="label-caps">RESULTADOS</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary focus-ring"
                  aria-label="Cerrar resultados"
                >
                  <X size={20} />
                </button>
              </div>
              <ResultsPanel results={results} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
