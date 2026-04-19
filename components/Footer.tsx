export default function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="label-caps !text-text-primary">DELTA</p>
            <p className="text-text-muted text-sm mt-1">
              Sistema de adquisición
            </p>
          </div>
          <nav
            aria-label="Enlaces del pie de página"
            className="flex items-center gap-6"
          >
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-sm transition-colors focus-ring rounded-sm"
            >
              Política de privacidad
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary text-sm transition-colors focus-ring rounded-sm"
            >
              Contacto
            </a>
          </nav>
        </div>

        <p className="text-text-muted text-xs text-center mt-12">
          © 2026 Delta. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
