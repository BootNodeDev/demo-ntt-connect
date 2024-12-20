import type { Chain } from "@wormhole-foundation/wormhole-connect";

// Definimos el tipo de red que acepta Wormhole Connect
export type NetworkType = "Testnet" | "Mainnet" | "Devnet";
export type NttType = "Launch" | "Extended";
// Definimos las chains exactamente como las espera Wormhole Connect
export const TESTNET_CHAINS = [
	"Sepolia",
	"BaseSepolia",
	"ArbitrumSepolia",
	"OptimismSepolia",
] as const;

export const MAINNET_CHAINS = [
	"Ethereum",
	"Base",
	"Arbitrum",
	"Optimism",
] as const;

// Usamos Chain directamente del SDK de Wormhole
export interface TokenConfig {
	key: string;
	symbol: string;
	nativeChain: Chain;
	displayName: string;
	tokenId: {
		chain: Chain;
		address: string;
	};
	coinGeckoId: string;
	icon: string;
	decimals: number;
}

export interface UserTokenInput {
	symbol: string;
	manager: string;
	token: string;
	transceiver: string;
	sourceChain: Chain;
	destinationChains: Chain[];
	iconUrl: string;
	decimals: number;
	coinGeckoId: string;
	nttType: "Launch" | "Extended";
	networkType: NetworkType;
	erc20Address?: string;
	erc20Decimals?: number;
}
