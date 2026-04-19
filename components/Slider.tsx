'use client';

import type { CSSProperties } from 'react';

interface SliderProps {
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  ariaLabel: string;
}

export default function Slider({
  id,
  value,
  min,
  max,
  step,
  onChange,
  ariaLabel,
}: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100;
  const style: CSSProperties = {
    ['--progress' as string]: `${progress}%`,
  };

  return (
    <input
      id={id}
      type="range"
      className="roas-slider"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={style}
    />
  );
}
