import { NetworkBanner } from "@/components/NetworkBanner";
import { Header } from "@/components/Header";
import { HeroAgent } from "@/components/HeroAgent";
import { Stats } from "@/components/Stats";
import { RecentMints } from "@/components/RecentMints";
import { Genesis } from "@/components/Genesis";
import { Miner } from "@/components/Miner";
import { Trade } from "@/components/Trade";
import { MinerAgent } from "@/components/MinerAgent";
import { UQUANT_ADDRESS } from "@/lib/contract";

export default function Page() {
  return (
    <>
      <NetworkBanner />
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-mono text-3xl mb-3 leading-tight">
              a quantum agent,
              <br />
              mined into existence
            </h1>
            <p className="text-sm max-w-xl"
               style={{ color: "var(--fg-muted)" }}>
              <span style={{ color: "var(--accent)" }}>UNIQUANT</span> is one
              immutable contract wearing three hats: an{" "}
              <span style={{ color: "var(--accent)" }}>ERC-8004 agent</span>{" "}
              token, its own Uniswap V4 swap hook taking 1% of every trade,
              and a browser proof-of-work miner that releases 18.9M UQUANT
              over ~8 years. Hold UQUANT and claim a soulbound{" "}
              <span style={{ color: "var(--accent)" }}>quantum-agent NFT</span>{" "}
              whose tier sharpens as you accumulate. No owner. No mint key.
              No proxy.
            </p>
          </div>
          <HeroAgent />
        </section>

        <Stats />

        <RecentMints />

        <div className="grid md:grid-cols-2 gap-6">
          <Genesis />
          <Miner />
        </div>

        <Trade />

        <MinerAgent />

        <footer className="pt-8 border-t font-mono text-xs space-y-1"
                style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}>
          <div>total supply: 21,000,000 UQUANT</div>
          <div>genesis: 5% (1.05M) · LP: 5% (1.05M) · mining: 90% (18.9M)</div>
          <div>retarget: every 2,016 mints, ±4× clamped</div>
          <div>halving: every 100,000 mints</div>
          <div>swap fee: 1% to controller</div>
          <div className="pt-3">
            chain: Base mainnet (chainId 8453)
          </div>
          <div className="break-all">
            contract:{" "}
            <a
              href={`https://basescan.org/address/${UQUANT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {UQUANT_ADDRESS}
            </a>
          </div>
          <div>
            agent manifest:{" "}
            <a
              href="/agent.json"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              /agent.json
            </a>
          </div>
          <div>
            x:{" "}
            <a
              href="https://x.com/Uniquantagent8004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              @Uniquantagent8004
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
