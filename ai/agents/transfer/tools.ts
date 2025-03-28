// ai/agents/transfer/tools.ts
import { 
    GET_WALLET_DETAILS_NAME,
    TRANSFER_NAME
} from "@/ai/cdp/actions/names";

import { cdpTool } from "@/ai/cdp";
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";

import {
    GetWalletDetailsAction,
} from "@/ai/cdp/actions/get-wallet-details";
import {
    TransferAction
} from "@/ai/cdp/actions/transfer";

// Configure CDP Agentkit for Sonic Mainnet
const networkId = "sonic-mainnet"; // Assuming this is the correct network ID
const agentkit = await CdpAgentkit.configureWithWallet({
    networkId,
    source: "transfer-agent"
});

export const TRANSFER_TOOLS = {
    [`transfer-${GET_WALLET_DETAILS_NAME}`]: cdpTool(new GetWalletDetailsAction(), agentkit),
    [`transfer-${TRANSFER_NAME}`]: cdpTool(new TransferAction(), agentkit)
}