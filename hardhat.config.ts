import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import envConfig from './.config';

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    hardhat: {},
    localhost: {
      url: envConfig.ethLocalhostUrl,
      accounts: [envConfig.ethLocalhostOwnerPrivateKey],
      gasPrice: 'auto',
    },
    sepolia: {
      url: envConfig.ethSepoliaUrl,
      accounts: [envConfig.ethSepoliaOwnerPrivateKey],
      gasPrice: 'auto',
    },
    mainnet: {
      url: envConfig.ethMainnetUrl,
      accounts: [envConfig.ethMainnetOwnerPrivateKey],
      gasPrice: 'auto',
    },
  },
};

export default config;
