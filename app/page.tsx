"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Fingerprint, ArrowRight } from "lucide-react";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,380;9..144,560;9..144,650&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

const INK = "#0E2A2E";
const INK_SOFT = "#173B40";
const PAPER = "#F6F3EC";
const PAPER_DIM = "#EEE9DC";
const CORAL = "#E15B3F";
const SAGE = "#8FA998";
const LINE = "#D9D3C3";
const LINE_DARK = "rgba(246,243,236,0.16)";

function Waveform() {
  // A single repeating ECG-like trace, drawn once then looped via dash animation.
  const d =
    "M0,40 L60,40 L78,40 L90,10 L104,70 L118,18 L128,40 L180,40 L200,40 L216,8 L232,68 L246,22 L256,40 L340,40 L360,40 L376,10 L390,70 L404,18 L414,40 L470,40 L488,40 L504,8 L520,68 L534,22 L544,40 L600,40";
  return (
    <svg
      viewBox="0 0 600 80"
      className="w-full"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <line x1="0" y1="40" x2="600" y2="40" stroke={LINE_DARK} strokeWidth="1" />
      <path
        d={d}
        fill="none"
        stroke={CORAL}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation: "draw-pulse 3.6s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

function VitalRow({ label, value, unit, last }) {
  return (
    <div
      className="flex items-baseline justify-between py-3"
      style={{ borderTop: `1px solid ${LINE_DARK}`, borderBottom: last ? `1px solid ${LINE_DARK}` : "none" }}
    >
      <span
        className="text-xs tracking-widest uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(246,243,236,0.55)" }}
      >
        {label}
      </span>
      <span className="flex items-baseline gap-1">
        <span
          className="text-lg font-medium"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: PAPER }}
        >
          {value}
        </span>
        <span
          className="text-[11px]"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(246,243,236,0.45)" }}
        >
          {unit}
        </span>
      </span>
    </div>
  );
}

function Field({ label, type, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className="block mb-2 text-[11px] tracking-widest uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#7A756A" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent px-1 py-3 text-base outline-none transition-colors"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: INK,
          borderBottom: `1.5px solid ${focused ? CORAL : LINE}`,
        }}
      />
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: PAPER_DIM, fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('${FONTS_URL}');
        @keyframes draw-pulse {
          0% { stroke-dashoffset: 900; }
          55% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -900; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
        .rise {
          opacity: 0;
          transform: translateY(10px);
          animation: rise-in 0.6s ease-out forwards;
        }
        @keyframes rise-in {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden"
        style={{
          background: PAPER,
          border: `1px solid ${LINE}`,
          borderRadius: "20px",
          boxShadow: "0 30px 60px -30px rgba(14,42,46,0.35)",
        }}
      >
        {/* LEFT PANEL — system console */}
        <div
          className="hidden lg:flex flex-col justify-between p-14"
          style={{
            background: `linear-gradient(160deg, ${INK} 0%, ${INK_SOFT} 100%)`,
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-16">
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: SAGE }}
              >
                Nexus · Clinical Systems
              </span>
              <span
                className="flex items-center gap-2 text-[11px]"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(246,243,236,0.5)" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: SAGE, boxShadow: `0 0 0 3px rgba(143,169,152,0.2)` }}
                />
                All systems normal
              </span>
            </div>

            <h1
              className="text-[2.75rem] leading-[1.05] mb-4"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, color: PAPER }}
            >
              Healthcare ERP,
              <br />
              built around the chart.
            </h1>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(246,243,236,0.6)" }}
            >
              One record for scheduling, billing, and care coordination —
              read the same way clinicians already read a patient's vitals.
            </p>
          </div>

          <div>
            <Waveform />
            <div className="mt-8">
              <VitalRow label="Facilities online" value="128" unit="sites" />
              <VitalRow label="Records secured" value="2.4M" unit="charts" />
              <VitalRow label="Uptime, trailing 90d" value="99.98" unit="%" last />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — access form */}
        <div className="flex items-center justify-center p-10 md:p-16">
          <div className="w-full max-w-sm">
            <div className={loaded ? "rise" : "opacity-0"}>
              <span
                className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#9A9484" }}
              >
                <Fingerprint size={14} strokeWidth={1.75} />
                Staff access
              </span>

              <h2
                className="text-4xl mb-2"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 560, color: INK }}
              >
                Welcome back
              </h2>
              <p className="text-sm mb-10" style={{ color: "#7A756A" }}>
                Sign in with your hospital-issued credentials.
              </p>
            </div>

            <form className={`space-y-7 ${loaded ? "rise" : "opacity-0"}`} style={{ animationDelay: "0.08s" }}>
              <Field label="Email address" type="email" placeholder="doctor@hospital.com" autoComplete="username" />
              <Field label="Password" type="password" placeholder="••••••••••" autoComplete="current-password" />

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2" style={{ color: "#6B6656" }}>
                  <input type="checkbox" className="rounded" style={{ accentColor: INK }} />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-medium hover:underline underline-offset-4"
                  style={{ color: INK }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 font-semibold text-base transition-colors"
                style={{
                  background: INK,
                  color: PAPER,
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
              >
                Sign in
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </form>

            <div
              className="mt-10 pt-6 flex items-center justify-between text-xs"
              style={{ borderTop: `1px solid ${LINE}`, color: "#9A9484" }}
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} strokeWidth={1.75} />
                HIPAA-compliant access
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>© 2026 Nexus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
