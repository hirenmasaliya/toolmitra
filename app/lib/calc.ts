export const inr = (n: number) =>
  isFinite(n) ? n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "–";

export function gst(amount: number, rate: number, inclusive: boolean) {
  const base = inclusive ? (amount * 100) / (100 + rate) : amount;
  const tax = inclusive ? amount - base : (amount * rate) / 100;
  return { base, tax, cgst: tax / 2, sgst: tax / 2, total: base + tax };
}
export function emi(p: number, annualRate: number, years: number) {
  const n = years * 12, r = annualRate / 12 / 100;
  const e = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { emi: e, total: e * n, interest: e * n - p };
}
export function diffYMD(from: Date, to: Date) {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) { m--; d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return { y, m, d, days: Math.floor((to.getTime() - from.getTime()) / 86400000) };
}
