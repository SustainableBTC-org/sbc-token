// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

/// @title SBP Token — Sustainable Bitcoin Protocol
/// @notice ERC-20 token with a 21 million hard cap and 8 decimals (matching Bitcoin's satoshi precision).
///         Each mint is linked to a Bitcoin block height, creating an on-chain record of issuance provenance.
/// @dev Inherits OpenZeppelin v5 Ownable, ERC20Capped, and ERC20Permit. Only the contract owner can mint and burn.
contract SBPToken is Ownable, ERC20Capped, ERC20Permit {
    /// @notice Emitted when tokens are minted at a specific Bitcoin block height.
    event MintedAtBtcBlockHeight(address indexed to, uint256 amount, uint256 indexed btcBlockHeight);

    /// @notice Amount of tokens minted at a given Bitcoin block height.
    mapping (uint256 => uint256) public tokensMintedAtBtcBlockHeight;

    /// @notice Ordered list of Bitcoin block heights at which tokens were minted.
    uint256[] public btcBlockHeights;

    /// @param initialOwner Address that will own the contract and have mint/burn privileges.
    constructor(address initialOwner)
        ERC20("Sustainable Bitcoin Protocol", "SBP")
        ERC20Capped(21000000 * 10 ** 8)
        Ownable(initialOwner)
        ERC20Permit("Sustainable Bitcoin Protocol")
    {}

    /// @notice Returns the number of decimals used by the token (8, matching Bitcoin).
    function decimals() override public pure returns (uint8) {
        return 8;
    }

    /// @notice Mints tokens to an address and records the associated Bitcoin block height.
    /// @param to Recipient of the minted tokens.
    /// @param amount Number of tokens to mint (in smallest unit, i.e. 10^-8).
    /// @param btcBlockHeight Bitcoin block height at which the issuance is anchored.
    function mint(address to, uint256 amount, uint256 btcBlockHeight) public onlyOwner {
        _mint(to, amount);

        tokensMintedAtBtcBlockHeight[btcBlockHeight] = amount;
        btcBlockHeights.push(btcBlockHeight);

        emit MintedAtBtcBlockHeight(to, amount, btcBlockHeight);
    }

    /// @notice Returns all Bitcoin block heights at which tokens have been minted.
    /// @return An array of Bitcoin block heights in chronological mint order.
    function getBtcBlockHeights() public view returns (uint256[] memory) {
        uint256[] memory heights = new uint256[](btcBlockHeights.length);

        heights = btcBlockHeights;

        return heights;
    }

    /// @notice Burns tokens from the owner's balance.
    /// @param value Amount of tokens to burn (in smallest unit).
    function burn(uint256 value) public onlyOwner {
        _burn(_msgSender(), value);
    }

    /// @dev Resolves the diamond inheritance conflict between ERC20 and ERC20Capped.
    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Capped) {
        super._update(from, to, value);
    }
}
