import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <section className="ink-card mx-auto flex w-full max-w-md flex-col gap-6 p-6 md:p-8">
      <header>
        <h1 className="m-0 text-3xl font-semibold">{title}</h1>
        {subtitle && <p className="mb-0 mt-2 text-ink-muted">{subtitle}</p>}
      </header>
      {children}
      {footer && <div className="text-center text-sm text-ink-muted">{footer}</div>}
    </section>
  );
}