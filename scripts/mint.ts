import { ethers } from 'hardhat';
import { parseUnits } from 'ethers';
import axios from 'axios';
import config from '../.config';

async function getBTCLatestBlock() {
  return axios
    .get('https://blockchain.info/latestblock/')
    .then((res) => {
      return res.data;
    })
    .catch(() => console.log('Get latest bitcoin block data failed.'));
}

async function main() {
  const btcLatestBlock = await getBTCLatestBlock();

  const SBCTokenContract = await ethers.getContractAt(
    'SBCToken',
    config.sbcTokenContractAddress,
  );

  const result = await SBCTokenContract.mint(
    config.mintToAccountAddress,
    parseUnits('100', 8),
    btcLatestBlock.height,
  );

  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
