import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    base: {
      url: `https://api.developer.coinbase.com/rpc/v1/base/${process.env.COINBASE_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
