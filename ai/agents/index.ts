import { marketAgent } from "./market";
import { stakingAgent } from "./staking";
import { walletAgent } from "./wallet";
import { knowledgeAgent } from "./knowledge";
import { tradingAgent } from "./trading";
import { tokenAnalysisAgent } from "./token-analysis";
import { liquidityAgent } from "./liquidity";
import { socialAgent } from "./social";
import { transferAgent } from "./transfer";

export const agents = [
    walletAgent,
    stakingAgent,
    marketAgent,
    tradingAgent,
    knowledgeAgent,
    tokenAnalysisAgent,
    liquidityAgent,
    socialAgent,
    transferAgent
]