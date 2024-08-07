// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract SBCToken is Ownable, ERC20Capped, ERC20Permit {
    mapping (uint256 => uint256) public tokensMintedAtBtcBlockHeight;
    uint256[] public btcBlockHeights;

    constructor(address initialOwner)
        ERC20("Sustainable Bitcoin Certificate", "SBC")
        ERC20Capped(21000000 * 10 ** 8)
        Ownable(initialOwner)
        ERC20Permit("Sustainable Bitcoin Certificate")
    {}

    function decimals() override public pure returns (uint8) {
        return 8;
    }

    function mint(address to, uint256 amount, uint256 btcBlockHeight) public onlyOwner {
        _mint(to, amount);

        tokensMintedAtBtcBlockHeight[btcBlockHeight] = amount;
        btcBlockHeights.push(btcBlockHeight);
    }

    function getBtcBlockHeights() public view returns (uint256[] memory) {
        uint256[] memory heights = new uint256[](btcBlockHeights.length);

        heights = btcBlockHeights;

        return heights;
    }

    function burn(uint256 value) public onlyOwner {
        _burn(_msgSender(), value);
    }

    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Capped) {
        super._update(from, to, value);
    }
}
