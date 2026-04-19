interface InputCardProps {
  id: string;
  label: string;
  displayValue: string;
  helper: string;
  children: React.ReactNode;
}

export default function InputCard({
  id,
  label,
  displayValue,
  helper,
  children,
}: InputCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <label htmlFor={id} className="label-caps">
          {label}
        </label>
        <span className="text-text-primary text-base font-medium tabular-nums">
          {displayValue}
        </span>
      </div>
      <div className="mb-3">{children}</div>
      <p className="text-text-muted text-xs leading-relaxed">{helper}</p>
    </div>
  );
}
