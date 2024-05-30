import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import envConfig from './.config';

const config: HardhatUserConfig = {
  solidity: '0.8.23',
  networks: {
    hardhat: {},
    localhost: {
      url: envConfig.ethLocalhostUrl,
      accounts: [envConfig.ethLocalhostOwnerPrivateKey],
      gasPrice: 1000000000,
    },
    sepolia: {
      url: envConfig.ethSepoliaUrl,
      accounts: [envConfig.ethSepoliaOwnerPrivateKey],
      gasPrice: 1000000000,
    },
    mainnet: {
      url: envConfig.ethMainnetUrl,
      accounts: [envConfig.ethMainnetOwnerPrivateKey],
      gasPrice: 1000000000,
    },
  },
};

export default config;
