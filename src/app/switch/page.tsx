"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Fab, Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";

const networks = [
  {
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026",
    name: "Ethereum ",
    id: "mainnet",
    code: "0x1",
  },
  {
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=026",
    name: "Polygon",
    id: "polygon",
    code: "0x89",
    chainInfo: {
      chainName: "Polygon Mainnet",
      rpcUrls: ["https://polygon-rpc.com/"],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com/"],
      chainId: "0x89",
    },
  },
  {
    logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=026",
    name: "BSC",
    id: "bsc",
    code: "0x38",
    chainInfo: {
      chainName: "Binance Smart Chain",
      rpcUrls: ["https://rpc.ankr.com/bsc"],
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
      chainId: "0x38",
    },
  },
  {
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=026",
    name: "Arbitrum",
    id: "arbitrum",
    code: "0xa4b1",
    chainInfo: {
      chainName: "Arbitrum One",
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.arbitrum.io/"],
      chainId: "0xa4b1",
    },
  },
  {
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=026",
    name: "Optimism",
    id: "optimism",
    code: "0xa",
    chainInfo: {
      chainName: "Optimism",
      rpcUrls: ["https://mainnet.optimism.io"],
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.optimism.io"],
      chainId: "0xa",
    },
  },
  {
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=026",
    name: "Avalanche",
    id: "avalanche",
    code: "0xa86a",
    chainInfo: {
      chainName: "Avalanche",
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
      chainId: "0xa86a",
    },
  },
  {
    logo: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=026",
    name: "Fantom",
    id: "fantom",
    code: "0xfa",
    chainInfo: {
      chainName: "Fantom Opera",
      rpcUrls: ["https://rpcapi.fantom.network"],
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      blockExplorerUrls: ["https://ftmscan.com"],
      chainId: "0xfa",
    },
  },
];

export default function StarredPage() {
  const { switchChain, addChain } = useMetaMask();

  const clickToSwitch = (network: { logo: string; name: string; id: string; code: string; chainInfo?: undefined; } | { logo: string; name: string; id: string; code: string; chainInfo: { chainName: string; rpcUrls: string[]; nativeCurrency: { name: string; symbol: string; decimals: number; }; blockExplorerUrls: string[]; chainId: string; }; }) => {
    switchChain(network.code).catch(async (error) => {
      switch (error.code) {
        case -32002: // already pending
          break;
        case 4902: // need to add network
          await addChain(network.chainInfo!);
          switchChain(network.code);
          break;

        default:
          console.log("error", error);
          break;
      }
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={3}>
          {networks.map((network, index) => (
            <Fab
              key={index}
              id={network.id}
              variant="extended"
              onClick={() => clickToSwitch(network)}
              size="large"
            >
              <img
                src={network.logo}
                alt={network.name}
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
              {network.name}
            </Fab>
          ))}
          {/* <Fab
            variant="extended"
            onClick={() => switchChain("0x1")}
            size="large"
          >
            Mainnet
          </Fab> */}
        </Stack>
      </Box>
    </Container>
  );
}
