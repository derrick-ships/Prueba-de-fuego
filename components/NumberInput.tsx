'use client';

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel: string;
}

export default function NumberInput({
  id,
  value,
  onChange,
  prefix,
  min = 0,
  max,
  step = 1,
  ariaLabel,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(0);
      return;
    }
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-4 text-text-secondary text-base pointer-events-none select-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={Number.isFinite(value) ? value : 0}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
        className={`w-full bg-surface-raised border border-border rounded-lg h-12 ${
          prefix ? 'pl-9' : 'pl-4'
        } pr-4 text-text-primary text-base tabular-nums focus-ring focus:border-border-strong outline-none transition-colors`}
      />
    </div>
  );
}
