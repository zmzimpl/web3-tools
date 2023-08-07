"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Fab, Stack, Typography } from "@mui/material";
import { useMetaMask } from "metamask-react";

const networks = [
  {
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026",
    name: "Ethereum",
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
  {
    logo: "https://portal.zksync.io/_nuxt/icons/64x64.cb7cab0d.png",
    name: "zkSync",
    id: "zksync",
    code: "0x144",
    chainInfo: {
      chainName: "zkSync Era Mainnet",
      rpcUrls: ["https://zksync-era.blockpi.network/v1/rpc/public"],
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.zksync.io"],
      chainId: "0x144",
    },
  },
];

const chainIdMap: { [key: string]: string } = {
  "0x1": "Ethereum",
  "0x89": "Polygon",
  "0x38": "BSC",
  "0xa4b1": "Arbitrum",
  "0xa": "Optimism",
  "0xa86a": "Avalanche",
  "0xfa": "Fantom",
  "0x144": "zkSync",
};
// const nameMap = {
//   Ethereum: "0x1",
//   Polygon: "0x89",
//   BSC: "0x38",
//   Arbitrum: "0xa4b1",
//   Optimism: "0xa",
//   Avalanche: "0xa86a",
//   Fantom: "0xfa",
//   zkSync: "0x144",
// };

export default function StarredPage() {
  const { switchChain, addChain, chainId, ethereum } = useMetaMask();

  const clickToSwitch = (
    network:
      | {
          logo: string;
          name: string;
          id: string;
          code: string;
          chainInfo?: undefined;
        }
      | {
          logo: string;
          name: string;
          id: string;
          code: string;
          chainInfo: {
            chainName: string;
            rpcUrls: string[];
            nativeCurrency: { name: string; symbol: string; decimals: number };
            blockExplorerUrls: string[];
            chainId: string;
          };
        }
  ) => {
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
        <Typography variant="h5" gutterBottom mb={4}>
          Current Chain:
          <span id="current-chain-name">
            {chainId ? chainIdMap[chainId] : ""}
          </span>
          <span id="current-chain-id"> ({chainId})</span>
        </Typography>

        <Stack direction="row" spacing={3}>
          {networks.map((network, index) => (
            <Fab
              key={index}
              id={network.code}
              variant="extended"
              aria-chain-name={network.name}
              aria-chain-id={network.code}
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
        </Stack>
      </Box>
    </Container>
  );
}
