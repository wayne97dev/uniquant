"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

const EXPECTED_CHAIN = base;

export function NetworkBanner() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected) return null;
  if (chainId === EXPECTED_CHAIN.id) return null;

  return (
    <div
      className="w-full px-6 py-3 text-sm font-mono flex items-center justify-between gap-4"
      style={{
        background: "#fdeaea",
        color: "#b42318",
        borderBottom: "1px solid #f5c4c0",
      }}
    >
      <span>
        Wrong network. UQUANT lives on {EXPECTED_CHAIN.name} (chainId{" "}
        {EXPECTED_CHAIN.id}). Your wallet is on chainId {chainId}.
      </span>
      <button
        onClick={() => switchChain({ chainId: EXPECTED_CHAIN.id })}
        disabled={isPending}
        className="btn"
        style={{
          background: "#dc2626",
          color: "#ffffff",
          borderColor: "#dc2626",
        }}
      >
        {isPending ? "switching…" : `switch to ${EXPECTED_CHAIN.name}`}
      </button>
    </div>
  );
}
