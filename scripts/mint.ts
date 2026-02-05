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

  const SBPTokenContract = await ethers.getContractAt(
    'SBPToken',
    config.sbpTokenContractAddress,
  );

  const result = await SBPTokenContract.mint(
    config.mintToAccountAddress,
    parseUnits('20000', 8),
    btcLatestBlock.height,
  );

  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
