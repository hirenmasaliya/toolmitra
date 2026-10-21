"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ChevronDown,
  Calculator as CalcIcon,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  QrCode as QrIcon,
  RefreshCw,
  Copy,
} from "lucide-react";
import { getTool } from "@/app/lib/tools";

type ResultRow = [string, string, boolean?];
const number = (value: string | number) => {
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const money = (value: number) =>
  Number.isFinite(value)
    ? value.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    : "—";
const today = () => {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
function dateDiff(start: Date, end: Date) {
  const a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const days = Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));
  let y = b.getFullYear() - a.getFullYear();
  let m = b.getMonth() - a.getMonth();
  let d = b.getDate() - a.getDate();
  if (d < 0) {
    m--;
    d += new Date(b.getFullYear(), b.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  return { y, m, d, days };
}
function safeDate(value: string) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const result = new Date(y, m - 1, d);
  return result.getFullYear() === y && result.getMonth() === m - 1 && result.getDate() === d
    ? result
    : null;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}
function NumField({
  label, value, onChange, prefix, suffix, min, step = "any",
}: {
  label: string; value: string; onChange: (value: string) => void;
  prefix?: string; suffix?: string; min?: number; step?: string;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-semibold text-slate-400">{prefix}</span>}
        <input
          type="number" min={min} step={step} value={value}
          onChange={(e) => onChange(e.target.value)} placeholder="0"
          className={`w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 ${prefix ? "pl-10" : "pl-4"} ${suffix ? "pr-16" : "pr-4"} text-base font-medium text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
        />
        {suffix && <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-sm font-semibold text-slate-400">{suffix}</span>}
      </div>
    </Field>
  );
}
function SelectField({ label, value, onChange, children }: {
  label: string; value: string; onChange: (value: string) => void; children: ReactNode;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-4 pr-11 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>
    </Field>
  );
}
function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><input type="date" value={value} onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-base font-medium text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></Field>;
}
function Results({ rows }: { rows: ResultRow[] }) {
  const normal = rows.filter((r) => !r[2]);
  const highlight = rows.find((r) => r[2]);
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {normal.length > 0 && <div className="divide-y divide-slate-100 p-2">
        {normal.map(([label, value], i) => <div key={`${label}-${i}`} className="flex items-center justify-between gap-4 px-4 py-3">
          <span className="text-sm text-slate-500">{label}</span><span className="text-right text-sm font-semibold text-slate-900">{value}</span>
        </div>)}
      </div>}
      {highlight && <div className="border-t border-emerald-100 bg-emerald-50 px-5 py-5">
        <div className="flex items-end justify-between gap-4"><span className="text-sm font-bold uppercase tracking-wide text-emerald-800">{highlight[0]}</span><span className="text-right text-2xl font-extrabold text-emerald-700">{highlight[1]}</span></div>
      </div>}
    </div>
  );
}
function ActionButton({ onClick, children, disabled = false }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled}
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
    {children}
  </button>;
}
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
    catch { setCopied(false); }
  };
  return <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Copy className="h-4 w-4" />{copied ? "Copied" : "Copy"}</button>;
}

// BUSINESS CALCULATORS
function Gst() {
  const [amount, setAmount] = useState("1000"), [rate, setRate] = useState("18"), [inclusive, setInclusive] = useState("no");
  const a = Math.max(0, number(amount)), r = Math.max(0, number(rate));
  const base = inclusive === "yes" ? a / (1 + r / 100) : a;
  const tax = inclusive === "yes" ? a - base : a * r / 100;
  return <div className="space-y-5">
    <NumField label="Amount" value={amount} onChange={setAmount} prefix="₹" min={0} />
    <div className="grid gap-4 sm:grid-cols-2">
      <SelectField label="GST rate" value={rate} onChange={setRate}>{[0.25, 3, 5, 12, 18, 28].map(v => <option key={v} value={v}>{v}%</option>)}</SelectField>
      <SelectField label="Amount type" value={inclusive} onChange={setInclusive}><option value="no">Price excludes GST</option><option value="yes">Price includes GST</option></SelectField>
    </div>
    <Results rows={[["Base price", `₹${money(base)}`], ["CGST (intra-state)", `₹${money(tax / 2)}`], ["SGST (intra-state)", `₹${money(tax / 2)}`], ["Total GST", `₹${money(tax)}`], ["Final amount", `₹${money(inclusive === "yes" ? a : a + tax)}`, true]]} />
    <p className="text-xs leading-5 text-slate-500">For inter-state supplies, IGST may apply instead of CGST + SGST. Confirm the correct rate for your goods or services.</p>
  </div>;
}
function Profit() {
  const [cost, setCost] = useState("800"), [selling, setSelling] = useState("1000");
  const c = Math.max(0, number(cost)), s = Math.max(0, number(selling)), p = s - c;
  return <div className="space-y-5"><NumField label="Cost price" value={cost} onChange={setCost} prefix="₹" min={0} /><NumField label="Selling price" value={selling} onChange={setSelling} prefix="₹" min={0} />
    <Results rows={[["Profit / loss", `₹${money(p)}`], ["Profit margin", s ? `${money(p / s * 100)}%` : "—"], ["Markup", c ? `${money(p / c * 100)}%` : "—"], ["Profit per sale", `₹${money(p)}`, true]]} /></div>;
}
function Discount() {
  const [price, setPrice] = useState("2000"), [discount, setDiscount] = useState("20");
  const p = Math.max(0, number(price)), d = Math.min(100, Math.max(0, number(discount))), saving = p * d / 100;
  return <div className="space-y-5"><NumField label="Original price" value={price} onChange={setPrice} prefix="₹" min={0} /><NumField label="Discount" value={discount} onChange={setDiscount} suffix="%" min={0} />
    <Results rows={[["Original price", `₹${money(p)}`], ["You save", `₹${money(saving)}`], ["Discounted price", `₹${money(p - saving)}`, true]]} /></div>;
}
function Markup() {
  const [cost, setCost] = useState("500"), [markup, setMarkup] = useState("30");
  const c = Math.max(0, number(cost)), m = Math.max(-100, number(markup)), selling = c * (1 + m / 100), profit = selling - c;
  return <div className="space-y-5"><NumField label="Cost price" value={cost} onChange={setCost} prefix="₹" min={0} /><NumField label="Target markup" value={markup} onChange={setMarkup} suffix="%" min={-100} />
    <Results rows={[["Cost price", `₹${money(c)}`], ["Profit per unit", `₹${money(profit)}`], ["Profit margin", selling ? `${money(profit / selling * 100)}%` : "—"], ["Target selling price", `₹${money(selling)}`, true]]} /></div>;
}

// FINANCE CALCULATORS
function Emi() {
  const [principal, setPrincipal] = useState("1000000"), [rate, setRate] = useState("9"), [years, setYears] = useState("10");
  const p = Math.max(0, number(principal)), annual = Math.max(0, number(rate)), months = Math.max(0, Math.min(1200, Math.round(number(years) * 12))), r = annual / 1200;
  const payment = months ? (r ? p * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : p / months) : 0;
  const total = payment * months;
  return <div className="space-y-5"><NumField label="Loan amount" value={principal} onChange={setPrincipal} prefix="₹" min={0} /><div className="grid gap-4 sm:grid-cols-2"><NumField label="Annual interest rate" value={rate} onChange={setRate} suffix="% p.a." min={0} /><NumField label="Loan tenure" value={years} onChange={setYears} suffix="years" min={0} /></div>
    <Results rows={[["Principal", `₹${money(p)}`], ["Total interest", `₹${money(Math.max(0, total - p))}`], ["Total payment", `₹${money(total)}`], ["Monthly EMI", `₹${money(payment)}`, true]]} /></div>;
}
function Sip() {
  const [monthly, setMonthly] = useState("5000"), [rate, setRate] = useState("12"), [years, setYears] = useState("10");
  const p = Math.max(0, number(monthly)), annual = Math.max(0, number(rate)), months = Math.min(1200, Math.max(0, Math.round(number(years) * 12))), i = Math.pow(1 + annual / 100, 1 / 12) - 1;
  const fv = months ? (i ? p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i) : p * months) : 0, invested = p * months;
  return <div className="space-y-5"><NumField label="Monthly investment" value={monthly} onChange={setMonthly} prefix="₹" min={0} /><div className="grid gap-4 sm:grid-cols-2"><NumField label="Expected annual return" value={rate} onChange={setRate} suffix="%" min={0} /><NumField label="Investment period" value={years} onChange={setYears} suffix="years" min={0} /></div>
    <Results rows={[["Amount invested", `₹${money(invested)}`], ["Estimated gains", `₹${money(Math.max(0, fv - invested))}`], ["Estimated future value", `₹${money(fv)}`, true]]} /><p className="text-xs text-slate-500">Illustration only. Mutual fund returns are market-linked and not guaranteed.</p></div>;
}
function FixedDeposit() {
  const [principal, setPrincipal] = useState("100000"), [rate, setRate] = useState("7"), [years, setYears] = useState("2"), [frequency, setFrequency] = useState("4");
  const p = Math.max(0, number(principal)), r = Math.max(0, number(rate)) / 100, t = Math.max(0, number(years)), n = number(frequency);
  const total = p * Math.pow(1 + r / n, n * t);
  return <div className="space-y-5"><NumField label="Deposit amount" value={principal} onChange={setPrincipal} prefix="₹" min={0} /><div className="grid gap-4 sm:grid-cols-2"><NumField label="Annual interest rate" value={rate} onChange={setRate} suffix="%" min={0} /><NumField label="Tenure" value={years} onChange={setYears} suffix="years" min={0} /></div><SelectField label="Compounding frequency" value={frequency} onChange={setFrequency}><option value="1">Yearly</option><option value="2">Half-yearly</option><option value="4">Quarterly</option><option value="12">Monthly</option></SelectField>
    <Results rows={[["Principal", `₹${money(p)}`], ["Interest earned", `₹${money(total - p)}`], ["Maturity amount", `₹${money(total)}`, true]]} /></div>;
}
function Interest() {
  const [principal, setPrincipal] = useState("100000"), [rate, setRate] = useState("8"), [years, setYears] = useState("3"), [frequency, setFrequency] = useState("1");
  const p = Math.max(0, number(principal)), r = Math.max(0, number(rate)), t = Math.max(0, number(years)), n = number(frequency);
  const si = p * r * t / 100, compoundTotal = p * Math.pow(1 + r / (100 * n), n * t), ci = compoundTotal - p;
  return <div className="space-y-5"><NumField label="Principal amount" value={principal} onChange={setPrincipal} prefix="₹" min={0} /><div className="grid gap-4 sm:grid-cols-2"><NumField label="Annual interest rate" value={rate} onChange={setRate} suffix="%" min={0} /><NumField label="Time period" value={years} onChange={setYears} suffix="years" min={0} /></div><SelectField label="Compound frequency" value={frequency} onChange={setFrequency}><option value="1">Yearly</option><option value="2">Half-yearly</option><option value="4">Quarterly</option><option value="12">Monthly</option></SelectField>
    <Results rows={[["Simple interest", `₹${money(si)}`], ["Compound interest", `₹${money(ci)}`], ["Compound maturity amount", `₹${money(compoundTotal)}`, true]]} /></div>;
}

// EVERYDAY CALCULATORS
function Percentage() {
  const [mode, setMode] = useState("of"), [a, setA] = useState("20"), [b, setB] = useState("500");
  const labels: Record<string, [string, string]> = { of: ["Percentage", "Number"], is: ["Part", "Whole"], change: ["Old value", "New value"] };
  const av = number(a), bv = number(b);
  const result = mode === "of" ? av * bv / 100 : mode === "is" ? (bv ? av / bv * 100 : NaN) : (av ? (bv - av) / av * 100 : NaN);
  return <div className="space-y-5"><SelectField label="Calculation type" value={mode} onChange={setMode}><option value="of">What is X% of Y?</option><option value="is">X is what % of Y?</option><option value="change">Percentage change</option></SelectField><div className="grid gap-4 sm:grid-cols-2"><NumField label={labels[mode][0]} value={a} onChange={setA} suffix={mode === "of" ? "%" : undefined} /><NumField label={labels[mode][1]} value={b} onChange={setB} /></div><Results rows={[["Result", Number.isFinite(result) ? `${money(result)}${mode === "of" ? "" : "%"}` : "Cannot divide by zero", true]]} /></div>;
}
function Age() {
  const [dob, setDob] = useState("2000-01-01"), [at, setAt] = useState(today());
  const birth = safeDate(dob), target = safeDate(at), valid = !!birth && !!target && birth <= target, diff = valid ? dateDiff(birth!, target!) : null;
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><DateField label="Date of birth" value={dob} onChange={setDob} /><DateField label="Calculate age on" value={at} onChange={setAt} /></div>{diff ? <Results rows={[["Total days lived", diff.days.toLocaleString("en-IN")], ["Total weeks", Math.floor(diff.days / 7).toLocaleString("en-IN")], ["Exact age", `${diff.y} years, ${diff.m} months, ${diff.d} days`, true]]} /> : <p className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">Enter valid dates and make sure the date of birth is on or before the calculation date.</p>}</div>;
}
function DateDiff() {
  const [start, setStart] = useState(today()), [end, setEnd] = useState(today());
  const a = safeDate(start), b = safeDate(end);
  if (!a || !b) return <p className="text-sm text-red-600">Please choose valid dates.</p>;
  const diff = dateDiff(a <= b ? a : b, a <= b ? b : a);
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><DateField label="Start date" value={start} onChange={setStart} /><DateField label="End date" value={end} onChange={setEnd} /></div><Results rows={[["Date order", a <= b ? "Start → End" : "End → Start (reversed automatically)"], ["Total days", diff.days.toLocaleString("en-IN")], ["Total weeks", (diff.days / 7).toFixed(1)], ["Difference", `${diff.y} years, ${diff.m} months, ${diff.d} days`, true]]} /></div>;
}
const unitGroups: Record<string, Record<string, number>> = {
  Length: { mm: .001, cm: .01, m: 1, km: 1000, inch: .0254, ft: .3048, yd: .9144, mile: 1609.344 },
  Weight: { mg: .000001, g: .001, kg: 1, quintal: 100, tonne: 1000, oz: .0283495, lb: .45359237 },
  Area: { "sq m": 1, "sq km": 1e6, "sq ft": .09290304, acre: 4046.8564224, hectare: 10000 },
  Volume: { ml: .001, litre: 1, "cubic metre": 1000, "US gallon": 3.785411784 },
};
function UnitConverter() {
  const [group, setGroup] = useState("Length"), [from, setFrom] = useState("m"), [to, setTo] = useState("km"), [value, setValue] = useState("1");
  const units = unitGroups[group];
  useEffect(() => { const keys = Object.keys(unitGroups[group]); setFrom(keys[0]); setTo(keys[1] || keys[0]); }, [group]);
  const result = group === "Temperature" ? (from === to ? number(value) : from === "C" ? (to === "F" ? number(value) * 9 / 5 + 32 : number(value) + 273.15) : from === "F" ? (to === "C" ? (number(value) - 32) * 5 / 9 : (number(value) - 32) * 5 / 9 + 273.15) : (to === "C" ? number(value) - 273.15 : (number(value) - 273.15) * 9 / 5 + 32)) : number(value) * units[from] / units[to];
  const choices = group === "Temperature" ? { C: "Celsius (°C)", F: "Fahrenheit (°F)", K: "Kelvin (K)" } : Object.fromEntries(Object.keys(units).map(k => [k, k]));
  return <div className="space-y-5"><SelectField label="Category" value={group} onChange={setGroup}>{[...Object.keys(unitGroups), "Temperature"].map(x => <option key={x}>{x}</option>)}</SelectField><NumField label="Value" value={value} onChange={setValue} /><div className="grid gap-4 sm:grid-cols-2"><SelectField label="From" value={from} onChange={setFrom}>{Object.entries(choices).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</SelectField><SelectField label="To" value={to} onChange={setTo}>{Object.entries(choices).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</SelectField></div><Results rows={[["Converted value", Number.isFinite(result) ? result.toLocaleString("en-IN", { maximumFractionDigits: 8 }) : "—", true]]} /></div>;
}
function NumberToWords() {
  const [amount, setAmount] = useState("123456.50");
  const small = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const underThousand = (n: number): string => {
    if (n < 20) return small[n];
    if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? ` ${small[n % 10]}` : ""}`;
    return `${small[Math.floor(n / 100)]} Hundred${n % 100 ? ` ${underThousand(n % 100)}` : ""}`;
  };
  const integerWords = (n: number): string => {
    if (n === 0) return "Zero";
    const groups: [number, string][] = [[10000000, "Crore"], [100000, "Lakh"], [1000, "Thousand"], [1, ""]];
    const parts: string[] = [];
    for (const [size, label] of groups) { const chunk = Math.floor(n / size); if (chunk) { parts.push(`${underThousand(chunk)}${label ? ` ${label}` : ""}`); n %= size; } }
    return parts.join(" ");
  };
  const val = Math.max(0, number(amount)), rupees = Math.floor(val), paise = Math.round((val - rupees) * 100);
  const words = `${integerWords(rupees)} Rupees${paise ? ` and ${integerWords(paise)} Paise` : ""} Only`;
  return <div className="space-y-5"><NumField label="Amount in rupees" value={amount} onChange={setAmount} prefix="₹" min={0} /><div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Amount in words</p><p className="mt-2 font-semibold leading-7 text-slate-900">{words}</p><div className="mt-3"><CopyButton value={words} /></div></div></div>;
}

// HEALTH
function Bmi() {
  const [weight, setWeight] = useState("70"), [height, setHeight] = useState("170");
  const w = Math.max(0, number(weight)), h = Math.max(0, number(height)) / 100, bmi = h ? w / (h * h) : 0;
  const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal range" : bmi < 30 ? "Overweight" : "Obesity range";
  const low = 18.5 * h * h, high = 24.9 * h * h;
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><NumField label="Weight" value={weight} onChange={setWeight} suffix="kg" min={0} /><NumField label="Height" value={height} onChange={setHeight} suffix="cm" min={0} /></div><Results rows={[["Category", h && w ? category : "Enter height and weight"], ["Healthy-weight estimate", h ? `${money(low)}–${money(high)} kg` : "—"], ["Your BMI", h && w ? money(bmi) : "—", true]]} /><p className="text-xs leading-5 text-slate-500">BMI is a screening measure, not a diagnosis. Individual health and population-specific guidance may differ.</p></div>;
}

// TEXT TOOLS
function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0, chars = text.length, noSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) || []).length : 0, paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
  return <div className="space-y-5"><Field label="Enter or paste your text"><textarea value={text} onChange={e => setText(e.target.value)} rows={7} placeholder="Start typing or paste your text here…" className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></Field><Results rows={[["Characters (with spaces)", chars.toLocaleString("en-IN")], ["Characters (without spaces)", noSpaces.toLocaleString("en-IN")], ["Sentences", sentences.toLocaleString("en-IN")], ["Paragraphs", paragraphs.toLocaleString("en-IN")], ["Estimated reading time", `${Math.ceil(words / 200)} min`], ["Word count", words.toLocaleString("en-IN"), true]]} /><div className="flex justify-end"><button onClick={() => setText("")} type="button" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Clear text</button></div></div>;
}
function CaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const titleCase = (s: string) => s.toLowerCase().replace(/\b[a-z]/g, m => m.toUpperCase());
  const sentenceCase = (s: string) => s.toLowerCase().replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, m => m.toUpperCase());
  const convert = (mode: string) => setResult(mode === "upper" ? text.toUpperCase() : mode === "lower" ? text.toLowerCase() : mode === "title" ? titleCase(text) : sentenceCase(text));
  return <div className="space-y-5"><Field label="Input text"><textarea rows={5} value={text} onChange={e => setText(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" placeholder="Type or paste text…" /></Field><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["UPPERCASE", "upper"], ["lowercase", "lower"], ["Title Case", "title"], ["Sentence case", "sentence"]].map(([label, mode]) => <button key={mode} type="button" onClick={() => convert(mode)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50">{label}</button>)}</div><Field label="Converted text"><textarea rows={5} readOnly value={result} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900" /></Field>{result && <CopyButton value={result} />}</div>;
}

// UTILITIES
function PasswordGenerator() {
  const [length, setLength] = useState("16"), [lower, setLower] = useState(true), [upper, setUpper] = useState(true), [digits, setDigits] = useState(true), [symbols, setSymbols] = useState(true), [password, setPassword] = useState("");
  const generate = () => {
    let chars = "";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (digits) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()-_=+[]{}?";
    if (!chars) { setPassword(""); return; }
    const len = Math.min(128, Math.max(4, Math.round(number(length))));
    const random = new Uint32Array(len);
    crypto.getRandomValues(random);
    setPassword(Array.from(random, x => chars[x % chars.length]).join(""));
  };
  return <div className="space-y-5"><NumField label="Password length (4–128)" value={length} onChange={setLength} min={4} /><div className="grid grid-cols-2 gap-3">{[[lower, setLower, "Lowercase"], [upper, setUpper, "Uppercase"], [digits, setDigits, "Numbers"], [symbols, setSymbols, "Symbols"]].map(([checked, setter, label]) => <label key={String(label)} className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700"><input type="checkbox" checked={checked as boolean} onChange={e => (setter as (v: boolean) => void)(e.target.checked)} className="h-4 w-4 accent-blue-600" />{label as string}</label>)}</div><ActionButton onClick={generate}><RefreshCw className="h-4 w-4" /> Generate password</ActionButton>{password && <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><code className="block break-all text-sm font-semibold text-slate-900">{password}</code><CopyButton value={password} /></div>}<p className="text-xs text-slate-500">Generated locally in your browser. Save it in a password manager.</p></div>;
}
function Qr() {
  const [text, setText] = useState("https://toolmitra.in"), [size, setSize] = useState("300"), [url, setUrl] = useState(""), [error, setError] = useState("");
  const make = async () => {
    setError(""); setUrl("");
    try { const QRCode = (await import("qrcode")).default; setUrl(await QRCode.toDataURL(text.trim(), { width: number(size), margin: 2, errorCorrectionLevel: "M" })); }
    catch { setError("Could not generate the QR code. Check your text and try again."); }
  };
  return <div className="space-y-5"><Field label="Text or URL"><textarea rows={3} value={text} onChange={e => setText(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white" placeholder="Enter a URL, UPI ID, phone number, or text" /></Field><SelectField label="Image size" value={size} onChange={setSize}>{[200, 300, 500, 800].map(v => <option key={v} value={v}>{v} × {v} px</option>)}</SelectField><ActionButton onClick={make} disabled={!text.trim()}><QrIcon className="h-5 w-5" /> Generate QR code</ActionButton>{error && <p className="text-sm text-red-600">{error}</p>}{url && <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 p-6"><img src={url} alt="Generated QR code" width={Number(size)} height={Number(size)} className="h-auto max-w-full" /><a href={url} download="toolmitra-qr-code.png" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"><Download className="h-4 w-4" /> Download PNG</a></div>}</div>;
}
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Unable to load image")); };
    image.src = url;
  });
}
const fileSize = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
function Compressor() {
  const [file, setFile] = useState<File | null>(null), [quality, setQuality] = useState(70), [out, setOut] = useState<{ url: string; size: number } | null>(null), [error, setError] = useState("");
  useEffect(() => () => { if (out?.url) URL.revokeObjectURL(out.url); }, [out]);
  const compress = async () => {
    if (!file) return;
    setError(""); setOut(null);
    try {
      const img = await loadImage(file), canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is unavailable");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error("Compression failed")), "image/jpeg", quality / 100));
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError("Could not compress this image. Please try a different JPG, PNG, or WebP file."); }
  };
  return <div className="space-y-5"><Field label="Choose an image"><input type="file" accept="image/jpeg,image/png,image/webp,image/*" onChange={e => { setFile(e.target.files?.[0] || null); setOut(null); setError(""); }} className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700" /></Field><Field label={`JPEG quality: ${quality}%`}><input type="range" min={10} max={95} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full accent-blue-600" /><div className="flex justify-between text-xs text-slate-500"><span>Smaller file</span><span>Better quality</span></div></Field><ActionButton onClick={compress} disabled={!file}><ImageIconFallback /> Compress image</ActionButton>{error && <p className="text-sm text-red-600">{error}</p>}{file && out && <><Results rows={[["Original size", fileSize(file.size)], ["Compressed size", fileSize(out.size)], ["Space saved", `${Math.max(0, Math.round((1 - out.size / file.size) * 100))}%`, true]]} /><a href={out.url} download="compressed.jpg" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"><Download className="h-4 w-4" /> Download JPG</a></>}</div>;
}
function ImageIconFallback() { return <Download className="h-5 w-5" />; }
function ImgToPdf() {
  const [files, setFiles] = useState<File[]>([]), [busy, setBusy] = useState(false), [error, setError] = useState("");
  
  const convert = async () => {
    if (!files.length) return;
    setBusy(true); setError("");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth(), pageH = pdf.internal.pageSize.getHeight();
      for (let i = 0; i < files.length; i++) {
        const image = await loadImage(files[i]), canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable");
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0);
        const scale = Math.min((pageW - 40) / canvas.width, (pageH - 40) / canvas.height), w = canvas.width * scale, h = canvas.height * scale;
        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h);
      }
      pdf.save("toolmitra-images.pdf");
    } catch { setError("Could not create the PDF. Please check that all selected files are valid images."); }
    finally { setBusy(false); }
  };
  return <div className="space-y-5"><Field label="Choose one or more images"><input type="file" accept="image/*" multiple onChange={e => { setFiles(Array.from(e.target.files || [])); setError(""); }} className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700" /></Field>{files.length > 0 && <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-medium text-emerald-700"><CheckCircle2 className="h-4 w-4" />{files.length} image(s) selected</div>}<ActionButton onClick={convert} disabled={!files.length || busy}><FileText className="h-5 w-5" />{busy ? "Creating PDF…" : "Download as PDF"}</ActionButton>{error && <p className="text-sm text-red-600">{error}</p>}</div>;
}

// DEVELOPER TOOL
function JsonFormatter() {
  const [input, setInput] = useState('{\n  "name": "ToolMitra",\n  "free": true\n}'), [output, setOutput] = useState(""), [error, setError] = useState("");
  const run = (mode: "format" | "minify") => {
    try { const parsed = JSON.parse(input); setOutput(mode === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)); setError(""); }
    catch (e) { setOutput(""); setError(e instanceof Error ? e.message : "Invalid JSON"); }
  };
  return <div className="space-y-5"><Field label="Input JSON"><textarea rows={8} value={input} onChange={e => setInput(e.target.value)} spellCheck={false} className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white" /></Field><div className="grid grid-cols-2 gap-3"><ActionButton onClick={() => run("format")}>Format JSON</ActionButton><button type="button" onClick={() => run("minify")} className="rounded-xl border border-slate-200 px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">Minify JSON</button></div>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">JSON error: {error}</p>}{output && <div className="space-y-3"><Field label="Result"><textarea readOnly rows={8} value={output} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900" /></Field><CopyButton value={output} /></div>}</div>;
}

const calculatorMap: Record<string, () => ReactNode> = {
  "gst-calculator": Gst,
  "profit-calculator": Profit,
  "discount-calculator": Discount,
  "markup-calculator": Markup,
  "emi-calculator": Emi,
  "sip-calculator": Sip,
  "fd-calculator": FixedDeposit,
  "interest-calculator": Interest,
  "percentage-calculator": Percentage,
  "age-calculator": Age,
  "date-difference-calculator": DateDiff,
  "unit-converter": UnitConverter,
  "number-to-words": NumberToWords,
  "bmi-calculator": Bmi,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "password-generator": PasswordGenerator,
  "qr-code-generator": Qr,
  "image-compressor": Compressor,
  "image-to-pdf": ImgToPdf,
  "json-formatter": JsonFormatter,
};

export default function Calculator({ slug }: { slug: string }) {
  const Component = calculatorMap[slug];
  const tool = getTool(slug);
  if (!tool || !Component) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="text-xl font-bold text-slate-900">Tool not available</h2>
      <p className="mt-2 text-slate-600">This tool is not available yet. Please explore our other tools.</p>
    </div>;
  }
  return <div className="p-4 sm:p-8">
    <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100"><CalcIcon className="h-6 w-6" /></div>
      <div><h2 className="text-xl font-bold tracking-tight text-slate-900">{tool.name}</h2><p className="mt-1 text-sm text-slate-500">{tool.short}</p></div>
    </div>
    <Component />
  </div>;
}
