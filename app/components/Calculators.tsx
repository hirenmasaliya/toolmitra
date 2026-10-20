"use client";

import { JSX, useState } from "react";
import { ChevronDown, Calculator as CalcIcon, CheckCircle2, Download, Image as ImageIcon, FileText, QrCode as QrIcon } from "lucide-react";
import { inr, gst, emi, diffYMD } from "@/app/lib/calc";

// ----------------------------------------------------------------------
// 1. PREMIUM UI BUILDING BLOCKS (Replaces external ./ui dependencies)
// ----------------------------------------------------------------------

const UIField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
    {children}
  </div>
);

const UINum = ({ label, value, onChange, prefix, suffix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string }) => (
  <UIField label={label}>
    <div className="relative">
      {prefix && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-semibold">{prefix}</div>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 ${prefix ? "pl-10" : "pl-4"} ${suffix ? "pr-10" : "pr-4"} text-lg font-medium text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 hover:border-slate-400`}
        placeholder="0"
      />
      {suffix && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 font-semibold">{suffix}</div>}
    </div>
  </UIField>
);

const UISelect = ({ label, value, onChange, children }: { label: string; value: string | boolean; onChange: (v: string) => void; children: React.ReactNode }) => (
  <UIField label={label}>
    <div className="relative">
      <select
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-4 pr-12 text-base font-medium text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-slate-400"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
    </div>
  </UIField>
);

const UIDate = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <UIField label={label}>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 px-4 text-base font-medium text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-slate-400"
    />
  </UIField>
);

const UIButton = ({ onClick, disabled, children, icon: Icon }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; icon?: any }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
  >
    {Icon && <Icon className="h-5 w-5" />}
    {children}
  </button>
);

const UIResults = ({ rows }: { rows: [string, string, boolean?][] }) => {
  const normalRows = rows.filter((r) => !r[2]);
  const highlightRow = rows.find((r) => r[2]);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="divide-y divide-slate-100 p-2">
        {normalRows.map(([label, val], i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <span className="text-base font-semibold text-slate-900">{val}</span>
          </div>
        ))}
      </div>
      {highlightRow && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-5 border-t border-emerald-100">
          <div className="flex items-end justify-between">
            <div className="text-sm font-bold uppercase tracking-wider text-emerald-800">{highlightRow[0]}</div>
            <div className="text-3xl font-extrabold text-emerald-600">{highlightRow[1]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. CALCULATOR COMPONENTS
// ----------------------------------------------------------------------

const n = (s: string) => parseFloat(s) || 0;

function Gst() {
  const [a, setA] = useState("1000"); const [r, setR] = useState("18"); const [inc, setInc] = useState(false);
  const x = gst(n(a), n(r), inc);
  return (
    <div className="space-y-5">
      <UINum label="Amount" value={a} onChange={setA} prefix="₹" />
      <div className="grid grid-cols-2 gap-4">
        <UISelect label="GST rate" value={r} onChange={setR}>
          {[0.25, 3, 5, 12, 18, 28].map((v) => <option key={v} value={v}>{v}%</option>)}
        </UISelect>
        <UISelect label="Calculation Type" value={inc ? "inc" : "exc"} onChange={(v) => setInc(v === "inc")}>
          <option value="exc">Exclude GST (+)</option>
          <option value="inc">Include GST (-)</option>
        </UISelect>
      </div>
      <UIResults rows={[["Base price", `₹${inr(x.base)}`], ["CGST", `₹${inr(x.cgst)}`], ["SGST", `₹${inr(x.sgst)}`], ["Total GST", `₹${inr(x.tax)}`], ["Total amount", `₹${inr(x.total)}`, true]]} />
    </div>
  );
}

function Profit() {
  const [c, setC] = useState("800"); const [s, setS] = useState("1000");
  const p = n(s) - n(c);
  return (
    <div className="space-y-5">
      <UINum label="Cost price" value={c} onChange={setC} prefix="₹" />
      <UINum label="Selling price" value={s} onChange={setS} prefix="₹" />
      <UIResults rows={[["Profit margin", `${n(s) ? inr((p / n(s)) * 100) : "–"}%`], ["Markup", `${n(c) ? inr((p / n(c)) * 100) : "–"}%`], ["Total Profit", `₹${inr(p)}`, true]]} />
    </div>
  );
}

function Discount() {
  const [p, setP] = useState("2000"); const [d, setD] = useState("20");
  const save = (n(p) * n(d)) / 100;
  return (
    <div className="space-y-5">
      <UINum label="Original price" value={p} onChange={setP} prefix="₹" />
      <UINum label="Discount amount" value={d} onChange={setD} suffix="%" />
      <UIResults rows={[["You save", `₹${inr(save)}`], ["Final price", `₹${inr(n(p) - save)}`, true]]} />
    </div>
  );
}

function Markup() {
  const [c, setC] = useState("500"); const [m, setM] = useState("30");
  const sell = n(c) * (1 + n(m) / 100);
  return (
    <div className="space-y-5">
      <UINum label="Cost price" value={c} onChange={setC} prefix="₹" />
      <UINum label="Markup" value={m} onChange={setM} suffix="%" />
      <UIResults rows={[["Profit per unit", `₹${inr(sell - n(c))}`], ["Margin", `${sell ? inr(((sell - n(c)) / sell) * 100) : "–"}%`], ["Target Selling Price", `₹${inr(sell)}`, true]]} />
    </div>
  );
}

function Percentage() {
  const [mode, setMode] = useState("of"); const [a, setA] = useState("20"); const [b, setB] = useState("500");
  const labels: Record<string, [string, string]> = { of: ["Percentage", "Number"], is: ["Part", "Whole"], chg: ["Old value", "New value"] };
  const res = mode === "of" ? (n(a) / 100) * n(b) : mode === "is" ? (n(b) ? (n(a) / n(b)) * 100 : NaN) : n(a) ? ((n(b) - n(a)) / n(a)) * 100 : NaN;
  return (
    <div className="space-y-5">
      <UISelect label="What do you want to calculate?" value={mode} onChange={setMode}>
        <option value="of">What is X% of Y?</option>
        <option value="is">X is what % of Y?</option>
        <option value="chg">Percentage change from X to Y</option>
      </UISelect>
      <div className="grid grid-cols-2 gap-4">
        <UINum label={labels[mode][0]} value={a} onChange={setA} suffix={mode === "of" ? "%" : ""} />
        <UINum label={labels[mode][1]} value={b} onChange={setB} />
      </div>
      <UIResults rows={[["Calculation Result", mode === "of" ? inr(res) : `${inr(res)}%`, true]]} />
    </div>
  );
}

const today = () => new Date().toISOString().slice(0, 10);
function Age() {
  const [dob, setDob] = useState("2000-01-01"); const [at, setAt] = useState(today());
  const f = new Date(dob), t = new Date(at); const ok = dob && at && f <= t;
  const d = ok ? diffYMD(f, t) : null;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <UIDate label="Date of birth" value={dob} onChange={setDob} />
        <UIDate label="Age at date" value={at} onChange={setAt} />
      </div>
      {d ? <UIResults rows={[["Total days", d.days.toLocaleString("en-IN")], ["Total weeks", Math.floor(d.days / 7).toLocaleString("en-IN")], ["Exact Age", `${d.y}y, ${d.m}m, ${d.d}d`, true]]} /> : <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">Date of birth must be on or before the "age at" date.</p>}
    </div>
  );
}

function Emi() {
  const [p, setP] = useState("1000000"); const [r, setR] = useState("9"); const [y, setY] = useState("10");
  const e = emi(n(p), n(r), n(y));
  return (
    <div className="space-y-5">
      <UINum label="Loan amount" value={p} onChange={setP} prefix="₹" />
      <div className="grid grid-cols-2 gap-4">
        <UINum label="Interest rate" value={r} onChange={setR} suffix="% p.a." />
        <UINum label="Tenure" value={y} onChange={setY} suffix="years" />
      </div>
      <UIResults rows={[["Total interest", `₹${inr(e.interest)}`], ["Total payment", `₹${inr(e.total)}`], ["Monthly EMI", `₹${inr(e.emi)}`, true]]} />
    </div>
  );
}

function DateDiff() {
  const [a, setA] = useState(today()); const [b, setB] = useState(today());
  const [f, t] = new Date(a) <= new Date(b) ? [new Date(a), new Date(b)] : [new Date(b), new Date(a)];
  const d = diffYMD(f, t);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <UIDate label="Start date" value={a} onChange={setA} />
        <UIDate label="End date" value={b} onChange={setB} />
      </div>
      <UIResults rows={[["Total days", d.days.toLocaleString("en-IN")], ["Total weeks", (d.days / 7).toFixed(1)], ["Difference", `${d.y}y ${d.m}m ${d.d}d`, true]]} />
    </div>
  );
}

function Qr() {
  const [text, setText] = useState("https://toolmitra.in"); const [size, setSize] = useState("300"); const [url, setUrl] = useState("");
  const make = async () => { const QR = (await import("qrcode")).default; setUrl(await QR.toDataURL(text, { width: n(size), margin: 2 })); };
  return (
    <div className="space-y-5">
      <UIField label="Text or Link to encode">
        <textarea className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 px-4 text-base font-medium text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-slate-400" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter URL or text..." />
      </UIField>
      <UISelect label="Image Size" value={size} onChange={setSize}>
        {[200, 300, 500, 800].map((v) => <option key={v} value={v}>{v} × {v} px</option>)}
      </UISelect>
      <UIButton onClick={make} disabled={!text.trim()} icon={QrIcon}>Generate QR Code</UIButton>
      
      {url && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="rounded-xl border-4 border-white shadow-md"><img src={url} alt="Generated QR code" className="rounded-lg" /></div>
          <a href={url} download="qr-code.png" className="mt-6 flex items-center gap-2 rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900">
            <Download className="h-4 w-4" /> Download PNG
          </a>
        </div>
      )}
    </div>
  );
}

const fmt = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(1)} KB`);
function loadImg(f: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(f); });
}

function Compressor() {
  const [file, setFile] = useState<File | null>(null); const [q, setQ] = useState(70);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null); const [err, setErr] = useState("");
  const run = async () => {
    if (!file) return; setErr("");
    try {
      const img = await loadImg(file); const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0);
      c.toBlob((b) => b && setOut({ url: URL.createObjectURL(b), size: b.size }), "image/jpeg", q / 100);
    } catch { setErr("Could not read this image. Try a JPG, PNG or WebP file."); }
  };
  return (
    <div className="space-y-5">
      <UIField label="Upload Image">
        <input type="file" accept="image/*" onChange={(e) => { setFile(e.target.files?.[0] || null); setOut(null); }} className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:px-6 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 transition-all rounded-xl border border-slate-300 bg-slate-50 p-2" />
      </UIField>
      <UIField label={`Compression Quality: ${q}%`}>
        <input type="range" min={10} max={95} value={q} onChange={(e) => setQ(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        <div className="flex justify-between text-xs text-slate-400 mt-2"><span>Smaller File</span><span>Better Quality</span></div>
      </UIField>
      <UIButton onClick={run} disabled={!file} icon={ImageIcon}>Compress Image</UIButton>
      
      {err && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">{err}</p>}
      
      {file && out && (
        <div className="mt-8 space-y-5">
          <UIResults rows={[["Original Size", fmt(file.size)], ["Saved Space", `${Math.max(0, Math.round((1 - out.size / file.size) * 100))}%`], ["Compressed Size", fmt(out.size), true]]} />
          <a href={out.url} download="compressed.jpg" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
            <Download className="h-5 w-5" /> Download JPG
          </a>
        </div>
      )}
    </div>
  );
}

function ImgToPdf() {
  const [files, setFiles] = useState<File[]>([]); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const run = async () => {
    setBusy(true); setErr("");
    try {
      const { jsPDF } = await import("jspdf"); const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight();
      for (let i = 0; i < files.length; i++) {
        const img = await loadImg(files[i]); const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0);
        const s = Math.min((W - 40) / c.width, (H - 40) / c.height); const w = c.width * s, h = c.height * s;
        if (i > 0) pdf.addPage();
        pdf.addImage(c.toDataURL("image/jpeg", 0.92), "JPEG", (W - w) / 2, (H - h) / 2, w, h);
      }
      pdf.save("images.pdf");
    } catch { setErr("Something went wrong. Check that every file is an image."); }
    setBusy(false);
  };
  return (
    <div className="space-y-5">
      <UIField label="Upload Images">
        <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="block w-full text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-50 file:px-6 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 transition-all rounded-xl border border-slate-300 bg-slate-50 p-2" />
      </UIField>
      
      {files.length > 0 && (
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          <CheckCircle2 className="h-4 w-4" /> {files.length} image(s) ready to convert
        </div>
      )}
      
      <UIButton onClick={run} disabled={!files.length || busy} icon={FileText}>
        {busy ? "Generating PDF..." : "Download as PDF"}
      </UIButton>
      
      {err && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">{err}</p>}
    </div>
  );
}

const map: Record<string, () => JSX.Element> = {
  "gst-calculator": Gst, "profit-calculator": Profit, "discount-calculator": Discount, "markup-calculator": Markup,
  "percentage-calculator": Percentage, "age-calculator": Age, "emi-calculator": Emi, "date-difference-calculator": DateDiff,
  "qr-code-generator": Qr, "image-compressor": Compressor, "image-to-pdf": ImgToPdf,
};

export default function Calculator({ slug }: { slug: string }) {
  const C = map[slug]; 
  return C ? (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
          <CalcIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Calculator Details</h2>
          <p className="text-sm text-slate-500">Fill in the fields below to get your result.</p>
        </div>
      </div>
      <C />
    </div>
  ) : null;
}