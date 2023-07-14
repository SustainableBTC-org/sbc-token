import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import envConfig from './.config';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    hardhat: {},
    sepolia: {
      url: envConfig.ethSepoliaUrl,
      accounts: [envConfig.ethSepoliaOwnerPrivateKey],
      gasPrice: 10000,
    },
    mainnet: {
      url: envConfig.ethMainnetUrl,
      accounts: [envConfig.ethMainnetOwnerPrivateKey],
      gasPrice: 10000,
    },
  },
};

export default config;
