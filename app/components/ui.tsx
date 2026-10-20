import { ReactNode } from "react";
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (<label className="block"><span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>{children}</label>);
}
export function Num({ label, value, onChange, step = "any" }: { label: string; value: string; onChange: (v: string) => void; step?: string }) {
  return (<Field label={label}><input className="input" type="number" inputMode="decimal" step={step} min="0" value={value} onChange={(e) => onChange(e.target.value)} /></Field>);
}
export function Results({ rows }: { rows: [string, string, boolean?][] }) {
  return (
    <dl className="mt-5 divide-y divide-slate-100 rounded-lg bg-brand-soft px-4" aria-live="polite">
      {rows.map(([k, v, big]) => (
        <div key={k} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-sm text-slate-600">{k}</dt>
          <dd className={big ? "text-2xl font-semibold text-brand-dark" : "font-medium"}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
