import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers';

describe('SBPToken', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();
    const SBPToken = await ethers.deployContract('SBPToken', [owner]);

    return { SBPToken, owner, account1, account2 };
  }

  describe('Deployment', function () {
    it('Deploy should assign 0 tokens as supply', async function () {
      const { SBPToken } = await loadFixture(deployFixture);
      expect(await SBPToken.totalSupply()).to.equal(0);
    });

    it('Should use 8 decimals', async function () {
      const { SBPToken } = await loadFixture(deployFixture);
      expect(await SBPToken.decimals()).to.equal(8);
    });
  });

  describe('Minting', function () {
    it('Mint by owner - Should be able to mint', async function () {
      const { SBPToken, owner } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await SBPToken.mint(owner.address, tokensToMint, 1);

      const ownerBalance = await SBPToken.balanceOf(owner.address);

      expect(await SBPToken.totalSupply()).to.equal(ownerBalance);
    });

    it('Mint by non owner - Should not be able to mint', async function () {
      const { SBPToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await expect(
        SBPToken.connect(account1).mint(account1.address, tokensToMint, 1),
      ).to.be.revertedWithCustomError(SBPToken, 'OwnableUnauthorizedAccount');
    });

    it('Mint cap reached - Should not mint more than cap (21 mil)', async function () {
      const { SBPToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = 21000001 * 10 ** 8;

      await expect(
        SBPToken.mint(account1.address, tokensToMint, 1),
      ).to.be.revertedWithCustomError(SBPToken, 'ERC20ExceededCap');
    });

    it('Mint at BTC height', async function () {
      const { SBPToken, account1 } = await loadFixture(deployFixture);

      const tokensToMint = parseUnits('10', 8);

      await SBPToken.mint(account1.address, tokensToMint, 123);

      expect(await SBPToken.getBtcBlockHeights()).to.deep.equal([123]);

      expect(await SBPToken.tokensMintedAtBtcBlockHeight(123)).to.be.equal(
        tokensToMint,
      );
    });
  });

  describe('Burning', function () {
    it('Burn by owner - Should be able to burn', async function () {
      const { SBPToken, owner } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await SBPToken.mint(owner.address, tokensToMint, 1);

      const tokensToBurn = 2 * 10 ** 8;

      await SBPToken.burn(tokensToBurn);

      const ownerBalance = await SBPToken.balanceOf(owner.address);

      expect(await SBPToken.totalSupply()).to.equal(ownerBalance);
    });

    it('Burn by non owner - Should not be able to burn', async function () {
      const { SBPToken, owner, account1 } = await loadFixture(deployFixture);

      const tokensToMint = 10 * 10 ** 8;

      await SBPToken.mint(owner.address, tokensToMint, 1);

      const tokensToBurn = 2 * 10 ** 8;

      await expect(
        SBPToken.connect(account1).burn(tokensToBurn),
      ).to.be.revertedWithCustomError(SBPToken, 'OwnableUnauthorizedAccount');
    });

    it('Burn & re-mint - Should be able to re-mint', async function () {
      const { SBPToken, owner } = await loadFixture(deployFixture);

      await SBPToken.mint(owner.address, 21000000 * 10 ** 8, 1);

      await SBPToken.burn(2 * 10 ** 8);

      await SBPToken.mint(owner.address, 2 * 10 ** 8, 1);

      const ownerBalance = await SBPToken.balanceOf(owner.address);

      expect(await SBPToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Ownership', function () {
    it('Transfer ownership', async function () {
      const { SBPToken, account1 } = await loadFixture(deployFixture);

      await SBPToken.transferOwnership(account1.address);

      expect(await SBPToken.owner()).to.equal(account1.address);
    });

    it('Mint by initial owner - Should not be able to mint', async function () {
      const { SBPToken, owner, account1 } = await loadFixture(deployFixture);

      await SBPToken.transferOwnership(account1.address);

      const tokensToMint = 10 * 10 ** 8;

      await expect(
        SBPToken.connect(owner).mint(owner.address, tokensToMint, 1),
      ).to.be.revertedWithCustomError(SBPToken, 'OwnableUnauthorizedAccount');
    });

    it('Mint by new owner - Should be able to mint', async function () {
      const { SBPToken, account1 } = await loadFixture(deployFixture);

      await SBPToken.transferOwnership(account1.address);

      const tokensToMint = 10 * 10 ** 8;

      await SBPToken.connect(account1).mint(account1.address, tokensToMint, 1);

      const ownerBalance = await SBPToken.balanceOf(account1.address);

      expect(await SBPToken.totalSupply()).to.equal(ownerBalance);
    });
  });
});
