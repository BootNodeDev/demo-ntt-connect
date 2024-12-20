import type { Chain } from "@wormhole-foundation/wormhole-connect";
import type { UserTokenInput } from "../types";

export function getQueryParams(): Partial<UserTokenInput> {
	const params = new URLSearchParams(window.location.search);
	const queryParams: Partial<UserTokenInput> = {};

	// Basic string params
	const stringParams = [
		"symbol",
		"manager",
		"token",
		"transceiver",
		"iconUrl",
		"coinGeckoId",
		"erc20Address",
	] as const;

	for (const param of stringParams) {
		const value = params.get(param);
		if (value) {
			queryParams[param] = value;
		}
	}

	// Handle networkType separately
	const networkType = params.get("networkType");
	if (
		networkType === "Testnet" ||
		networkType === "Mainnet" ||
		networkType === "Devnet"
	) {
		queryParams.networkType = networkType;
	}

	// Handle nttType separately
	const nttType = params.get("nttType");
	if (nttType === "Launch" || nttType === "Extended") {
		queryParams.nttType = nttType;
	}

	// Number params
	const numberParams = ["decimals", "erc20Decimals"] as const;
	for (const param of numberParams) {
		const value = params.get(param);
		if (value) {
			const parsedValue = Number.parseInt(value, 10);
			if (!Number.isNaN(parsedValue)) {
				queryParams[param] = parsedValue;
			}
		}
	}

	// Chain params
	const sourceChain = params.get("sourceChain");
	if (sourceChain) {
		queryParams.sourceChain = sourceChain as Chain;
	}

	// Handle destination chains array
	const destinationChains = params.get("destinationChains");
	if (destinationChains) {
		const chains = destinationChains.split(",").filter(Boolean);
		if (chains.length > 0) {
			queryParams.destinationChains = chains as Chain[];
		}
	}

	return queryParams;
}

export function buildQueryUrl(input: Partial<UserTokenInput>): string {
	const params = new URLSearchParams();

	// Basic string params
	const stringParams = [
		"symbol",
		"manager",
		"token",
		"transceiver",
		"iconUrl",
		"coinGeckoId",
		"erc20Address",
		"networkType",
		"nttType",
	] as const;

	for (const param of stringParams) {
		if (input[param]) {
			params.set(param, input[param] as string);
		}
	}

	// Number params
	const numberParams = ["decimals", "erc20Decimals"] as const;
	for (const param of numberParams) {
		if (input[param] !== undefined) {
			params.set(param, input[param]?.toString() ?? "");
		}
	}

	// Chain params
	if (input.sourceChain) {
		params.set("sourceChain", input.sourceChain);
	}

	// Handle destination chains array
	if (input.destinationChains?.length) {
		params.set("destinationChains", input.destinationChains.join(","));
	}

	return `${window.location.pathname}?${params.toString()}`;
}

export function submitFormWithQueryParams(
	input: Partial<UserTokenInput>,
): void {
	const newUrl = buildQueryUrl(input);
	window.location.href = newUrl;
}
