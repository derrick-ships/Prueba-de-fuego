export interface CalculatorInputs {
  ticketPromedio: number;
  margenBrutoPct: number;
  costoEnvio: number;
  comisionPasarelaPct: number;
  tasaDevolucionesPct: number;
  feeAgenciaPct: number;
}

export interface CalculatorResults {
  margenRealPorVenta: number;
  maxCACSostenible: number;
  maxAdSpendPorVenta: number;
  breakevenROAS: number;
  targetROAS: number;
  contribucionPorVenta: number;
}

export function calculateBreakeven(i: CalculatorInputs): CalculatorResults {
  // Convert percentages to decimals
  const margen = i.margenBrutoPct / 100;
  const comisionPasarela = i.comisionPasarelaPct / 100;
  const tasaDevoluciones = i.tasaDevolucionesPct / 100;
  const feeAgencia = i.feeAgenciaPct / 100;

  // Per-order gross margin in COP (revenue minus COGS)
  const margenBrutoCOP = i.ticketPromedio * margen;

  // Per-order variable costs (paid on every gross sale, including those that will be returned)
  const costoPasarelaCOP = i.ticketPromedio * comisionPasarela;

  // Net contribution per GROSS sale, before marketing:
  // = gross margin - shipping - gateway fee
  const contribucionBrutaPorVenta =
    margenBrutoCOP - i.costoEnvio - costoPasarelaCOP;

  // Returns erode effective contribution. Every gross sale has a (1 - tasaDevoluciones) probability
  // of holding, so effective contribution per ATTEMPTED sale:
  const contribucionPorVenta =
    contribucionBrutaPorVenta * (1 - tasaDevoluciones);

  // Agency fee is charged on ad spend, not revenue. So if we spend $A on ads, total marketing cost is A*(1+feeAgencia).
  // At breakeven: contribucionPorVenta = A*(1+feeAgencia), so maxAdSpendPorVenta = contribucionPorVenta / (1+feeAgencia)
  const maxAdSpendPorVenta =
    feeAgencia >= 1
      ? 0
      : Math.max(0, contribucionPorVenta / (1 + feeAgencia));

  const maxCACSostenible = Math.max(0, contribucionPorVenta);

  // Breakeven ROAS = revenue per gross sale / ad spend per gross sale
  // If maxAdSpendPorVenta <= 0, breakeven is effectively infinite. We cap at 999 for display.
  const breakevenROAS =
    maxAdSpendPorVenta > 0 ? i.ticketPromedio / maxAdSpendPorVenta : 999;

  const targetROAS = breakevenROAS * 1.5;

  return {
    margenRealPorVenta: contribucionPorVenta,
    maxCACSostenible,
    maxAdSpendPorVenta,
    breakevenROAS,
    targetROAS,
    contribucionPorVenta,
  };
}

export function formatCOP(value: number): string {
  const rounded = Math.round(value);
  const abs = Math.abs(rounded).toLocaleString('es-CO').replace(/,/g, '.');
  return rounded < 0 ? `-$${abs}` : `$${abs}`;
}

export function formatROAS(value: number): string {
  if (value >= 999) return '∞';
  return `${value.toFixed(1)}x`;
}

export function formatIntegerCOP(value: number): string {
  const rounded = Math.round(value);
  return rounded.toLocaleString('es-CO').replace(/,/g, '.');
}
