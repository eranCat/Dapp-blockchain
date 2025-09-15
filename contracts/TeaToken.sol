// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * TEA: ERC20 + Burnable + Pausable + Permit (EIP-2612)
 * OZ v5 paths (no 'draft-'). Ownable requires passing the initial owner.
 */
contract TeaToken is ERC20, ERC20Burnable, ERC20Pausable, ERC20Permit, Ownable {
    constructor()
        ERC20("Tea Token", "TEA")
        ERC20Permit("Tea Token")     // EIP-2612 domain name
        Ownable(msg.sender)          // OZ v5 pattern: set initial owner
    {
        _mint(msg.sender, 1_000_000 ether);
    }

    function mint(address to, uint256 amount) external onlyOwner { _mint(to, amount); }
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // Required because ERC20Pausable overrides _update in OZ v5
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
