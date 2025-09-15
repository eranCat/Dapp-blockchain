// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TeaTokenFixed is ERC20 {
    constructor(uint256 initialSupply) ERC20("Tea Token", "TEA") {
        // 18 decimals by default → pass e.g. 1_000_000 * 10**18 from the deploy script
        _mint(msg.sender, initialSupply);
    }
}
