import type { Address } from "viem";

// ─────────────────────────────────────────────────────────────────────────
// RELAUNCH TODO: fill these in after deploying Uniquant v1 on Base.
//   1. forge script script/Deploy.s.sol:Deploy ... --broadcast --verify
//      → paste the "Uniquant deployed:" address into UQUANT_ADDRESS
//   2. NONCE_ADDRESS=<UQUANT_ADDRESS> forge script
//      script/DeployMinerAgent.s.sol:DeployMinerAgent ... --broadcast --verify
//      → paste the "MinerAgent:" address into MINER_AGENT_ADDRESS
// Until both are real, the frontend reads the zero address and Stats will
// show "contract not reachable" (intentional — better than silently reading
// the old Nonce deployment).
// ─────────────────────────────────────────────────────────────────────────

// Uniquant ERC-20 token + V4 hook + PoW miner — Base mainnet.
export const UQUANT_ADDRESS: Address =
  "0xEB63b0fc46649708287C39c57d519d3113d320cc";

export const UQUANT_DECIMALS = 18;
export const UQUANT_SYMBOL = "UQUANT";

// MinerAgent ERC-721 contract address, deployed against the Uniquant token
// above. After deploy, also flip CLAIM_LIVE in MinerAgent.tsx.
export const MINER_AGENT_ADDRESS: Address =
  "0x801FC2dbdDbC617bD787F942fe02476B1cc5BBaA";

// V4 PoolManager on Base mainnet — used to display pool info, not
// required for contract reads. Canonical Base deployment; verify against
// https://docs.uniswap.org/contracts/v4/deployments before relying on it.
export const POOL_MANAGER_ADDRESS: Address =
  "0x498581fF718922c3f8e6A244956aF099B2652b2b";
