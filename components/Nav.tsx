'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCTA = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const el = document.getElementById('agendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-surface/60 border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="label-caps !text-text-primary !text-sm focus-ring rounded-sm"
          aria-label="Delta — inicio"
        >
          DELTA
        </a>
        <a
          href="#agendar"
          onClick={handleCTA}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2 rounded-lg focus-ring"
        >
          Agendar diagnóstico
        </a>
      </div>
    </nav>
  );
}
