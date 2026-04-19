export default function EnemySection() {
  const paragraphs: string[] = [
    'Tu agencia te mostró un ROAS de 3x o 4x. Pero abriste tu cuenta bancaria y la plata no estaba.',
    'Ese número no incluye tu margen real, tu envío, tus devoluciones, ni las comisiones de la pasarela. Es el ROAS que conviene mostrar, no el que de verdad importa.',
    'El breakeven ROAS real — el número que te dice si cada peso de pauta te deja ganancia o pérdida — casi nadie lo calcula antes de gastar.',
  ];

  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <p className="label-caps mb-6">LA MENTIRA DEL ROAS</p>
        <h2 className="display-section text-text-primary mb-12">
          El ROAS que te mostraron es un fantasma.
        </h2>

        <div className="flex flex-col">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-text-secondary text-base md:text-lg leading-relaxed py-6 ${
                i !== 0 ? 'border-t border-border-strong' : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
