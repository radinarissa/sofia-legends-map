interface ScarinessDotsProps {
  value: number; 
}

export default function ScarinessDots({ value }: ScarinessDotsProps) {
  return (
    <span className="inline-flex text-sm tracking-wider" role="img" aria-label={`Страшност ${value} от 5`}>
      <span className="text-ink-accent">{"●".repeat(value)}</span>
      <span className="text-ink-border">{"●".repeat(5 - value)}</span>
    </span>
  );
}