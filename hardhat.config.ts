import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: "https://arb-mainnet.g.alchemy.com/v2/mRmOAi5RmUKiaVKG0WTZcDzDUB7FohTf",
        blockNumber: 110649297,
      },
    },
  },
};

export default config;