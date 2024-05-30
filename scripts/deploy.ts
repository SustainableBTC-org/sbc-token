import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  const SBCToken = await ethers.deployContract('SBCToken', [owner]);
  await SBCToken.waitForDeployment();

  console.log(`SBCToken deployed at address: ${SBCToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
