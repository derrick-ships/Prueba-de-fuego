import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'La Prueba de Fuego — Calculadora de Breakeven ROAS | Delta',
  description:
    'En 60 segundos, calcula el ROAS real que tu negocio necesita para ser rentable — incluyendo margen, envío, devoluciones y comisiones.',
  metadataBase: new URL('https://delta.co'),
  openGraph: {
    title: 'La Prueba de Fuego — Calculadora de Breakeven ROAS',
    description:
      'El ROAS real que ninguna agencia te mostró. Gratis, 60 segundos, sin registro.',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans bg-canvas text-text-primary">{children}</body>
    </html>
  );
}
