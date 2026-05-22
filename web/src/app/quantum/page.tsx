import { Header } from "@/components/Header";

export const metadata = {
  title: "Uniquant — Quantum-Resistant Identity",
  description:
    "Why Uniquant agents are designed to outlive ECDSA: a post-quantum " +
    "identity roadmap built on the same keccak256 primitive that mines UQUANT.",
};

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-6">
      <div className="panel-label mb-3">{label}</div>
      <div className="space-y-3 text-sm leading-relaxed"
           style={{ color: "var(--fg-muted)" }}>
        {children}
      </div>
    </section>
  );
}

export default function QuantumPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div>
          <a
            href="/"
            className="font-mono text-xs hover:underline"
            style={{ color: "var(--fg-dim)" }}
          >
            ← back to dashboard
          </a>
        </div>

        <header className="space-y-3">
          <div
            className="inline-block font-mono text-[11px] uppercase tracking-widest px-2 py-1 rounded-sm"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
          >
            design phase · not yet on-chain
          </div>
          <h1 className="font-mono text-3xl leading-tight">
            quantum-resistant
            <br />
            identity
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "var(--fg-muted)" }}>
            An on-chain agent is supposed to be permanent. Permanent identity
            should plan for the one thing that breaks today&apos;s signatures:
            the quantum computer. This page describes — honestly — how Uniquant
            intends to get there, and what is and isn&apos;t built yet.
          </p>
        </header>

        <Panel label="the threat">
          <p>
            Every account on Ethereum and Base signs with{" "}
            <span style={{ color: "var(--accent)" }}>ECDSA</span> over the
            secp256k1 curve. ECDSA is secure against classical computers — but a
            sufficiently large quantum computer running{" "}
            <span style={{ color: "var(--accent)" }}>Shor&apos;s algorithm</span>{" "}
            can recover a private key from its public key, and forge signatures.
          </p>
          <p>
            The timeline is uncertain — likely years away — but the asset at
            risk is the one thing you can&apos;t re-issue: a persistent
            identity. Hashing (keccak256, the heart of the proof-of-work) is far
            more resilient: Grover&apos;s algorithm only halves its effective
            strength, fixed by using wide enough outputs. Signatures are the
            soft spot, not the mining.
          </p>
        </Panel>

        <Panel label="why it matters for an agent">
          <p>
            Uniquant isn&apos;t just a token — it&apos;s an{" "}
            <span style={{ color: "var(--accent)" }}>ERC-8004 agent</span> with a
            stable, queryable on-chain identity, plus a soulbound NFT bound to
            every holder. That identity is meant to be referenced by other
            agents and indexers for a long time. Anything designed to be
            permanent is exactly what should be hardened against the
            post-quantum transition first.
          </p>
        </Panel>

        <Panel label="the design">
          <p>
            The plan is to bind the agent identity to a{" "}
            <span style={{ color: "var(--accent)" }}>
              post-quantum signature scheme
            </span>{" "}
            — specifically a hash-based family (SPHINCS+ / Winternitz / Lamport).
            These schemes rely only on the security of a hash function — the
            very same <span style={{ color: "var(--accent)" }}>keccak256</span>{" "}
            primitive that mints UQUANT through proof-of-work.
          </p>
          <p>
            That coherence is the point: an identity secured by the same hash
            that brings it into existence. No new trust assumption, no exotic
            curve — just keccak, all the way down.
          </p>
        </Panel>

        <Panel label="why Base makes it feasible">
          <p>
            Post-quantum signatures are large and expensive to verify on-chain.
            On Ethereum L1, a single verification can cost millions of gas —
            economically absurd. On{" "}
            <span style={{ color: "var(--accent)" }}>Base</span>, where gas
            settles in cents, on-chain post-quantum verification becomes
            genuinely affordable. The chain choice isn&apos;t cosmetic — it&apos;s
            what makes this practical at all.
          </p>
        </Panel>

        <Panel label="roadmap">
          <ol className="space-y-3 list-none">
            <li>
              <span style={{ color: "var(--accent)" }}>phase 1 — design</span>{" "}
              (now). The threat model and direction, stated openly. No on-chain
              code yet. This page.
            </li>
            <li>
              <span style={{ color: "var(--accent)" }}>phase 2 — registration</span>.
              Agents register a post-quantum public key alongside their ERC-8004
              identity. Signatures verified off-chain and attested. Low gas.
            </li>
            <li>
              <span style={{ color: "var(--accent)" }}>phase 3 — on-chain verifier</span>.
              A Solidity verifier for hash-based signatures gates high-value
              actions. Heavy, but affordable on Base.
            </li>
          </ol>
        </Panel>

        <Panel label="what we will not claim">
          <p>
            Uniquant runs <span style={{ color: "var(--accent)" }}>classical</span>{" "}
            keccak256 proof-of-work. There is no quantum computer in the loop,
            and we will never say &quot;quantum-powered.&quot;{" "}
            <span style={{ color: "var(--fg)" }}>Quantum-resistant</span> means
            resistant to attacks <em>by</em> quantum computers, via post-quantum
            cryptography — a real, NIST-standardized field. We ship it
            incrementally and we say exactly where we are. That honesty is part
            of the product.
          </p>
        </Panel>

        <footer className="pt-4 font-mono text-xs" style={{ color: "var(--fg-dim)" }}>
          <a href="/" className="hover:underline">← back to dashboard</a>
        </footer>
      </main>
    </>
  );
}
