import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  const SBPToken = await ethers.deployContract('SBPToken', [owner]);
  await SBPToken.waitForDeployment();

  console.log(`SBPToken deployed at address: ${SBPToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
