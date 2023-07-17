import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  ethSepoliaUrl: process.env.ETH_SEPOLIA_URL || '',
  ethSepoliaOwnerPrivateKey: process.env.ETH_SEPOLIA_OWNER_PRVATE_KEY || '',

  ethMainnetUrl: process.env.ETH_MAINNET_URL || '',
  ethMainnetOwnerPrivateKey: process.env.ETH_MAINNET_OWNER_PRVATE_KEY || '',

  sbcTokenContractAddress: process.env.SBC_TOKEN_CONTRACT_ADDRESS || '',
  mintToAccountAddress: process.env.MINT_TO_ACCOUNT_ADDRESS || '',
};

export default config;
