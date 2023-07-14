import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers';

describe('SBCToken', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();
    const SBCToken = await ethers.deployContract('SBCToken', owner);

    return { SBCToken, owner, account1, account2 };
  }

  describe('Deployment', function () {
    it('Deploy should assign 0 tokens as supply', async function () {
      const { SBCToken } = await loadFixture(deployFixture);
      expect(await SBCToken.totalSupply()).to.equal(0);
    });
  });

  describe('Minting', function () {
    it('Mint by owner - Should be able to mint', async function () {
      const { SBCToken, owner } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await SBCToken.mint(owner.address, tokensToMint, 1);

      const ownerBalance = await SBCToken.balanceOf(owner.address);

      expect(await SBCToken.totalSupply()).to.equal(ownerBalance);
    });

    it('Mint by non owner - Should not be able to mint', async function () {
      const { SBCToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await expect(
        SBCToken.connect(account1).mint(account1.address, tokensToMint, 1),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Mint cap reached - Should not mint more than cap (21 mil)', async function () {
      const { SBCToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = 21000001 * 10 ** 8;

      await expect(
        SBCToken.mint(account1.address, tokensToMint, 1),
      ).to.be.revertedWith('ERC20Capped: cap exceeded');
    });

    it('Mint at BTC height', async function () {
      const { SBCToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = parseUnits('10', 8);

      await SBCToken.mint(account1.address, tokensToMint, 123);

      expect(await SBCToken.getBtcBlockHeights()).to.deep.equal([123]);

      expect(await SBCToken.tokensMintedAtBtcBlockHeight(123)).to.be.equal(
        tokensToMint,
      );
    });
  });
});
