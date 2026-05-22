"use client";

// Hero wrapper. AgentScene pulls in three.js / r3f, which must not run during
// SSR — so we dynamic-import it with ssr:false. We also detect WebGL support
// and fall back to a static glowing portrait when it's missing (low-end
// mobile, privacy browsers, headless renderers) so the panel is never empty.
// Replaces the old HeroCity (the pedestrian/city SVG).

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AgentScene = dynamic(() => import("./AgentScene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div
      className="absolute inset-0 grid place-items-center font-mono text-xs"
      style={{ color: "var(--fg-dim)" }}
    >
      initializing agent…
    </div>
  );
}

function StaticAgent() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="absolute rounded-full"
        style={{
          width: "62%",
          height: "62%",
          background:
            "radial-gradient(circle, rgba(124,92,255,0.40), rgba(95,233,255,0.10) 45%, transparent 70%)",
          filter: "blur(26px)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nft/UQUANT_1_head.png"
        alt="Uniquant agent #01 — Quantum Azure"
        className="uq-float relative h-[88%] w-auto object-contain"
        draggable={false}
      />
    </div>
  );
}

export function HeroAgent() {
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border"
      style={{
        height: 460,
        borderColor: "var(--border)",
        background: "#06060d",
      }}
    >
      {webgl === null ? (
        <Placeholder />
      ) : webgl ? (
        <AgentScene />
      ) : (
        <StaticAgent />
      )}

      {/* corner readout — keeps the terminal/ASCII aesthetic */}
      <div
        className="pointer-events-none absolute left-4 top-3 font-mono text-[11px] uppercase tracking-widest"
        style={{ color: "var(--fg-muted)" }}
      >
        UNIQUANT · agent_render
      </div>
      <div
        className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px]"
        style={{ color: "var(--fg-dim)" }}
      >
        #01 — Quantum Azure
      </div>
      <div
        className="pointer-events-none absolute bottom-3 right-4 font-mono text-[11px]"
        style={{ color: "var(--fg-dim)" }}
      >
        move cursor →
      </div>
    </div>
  );
}
