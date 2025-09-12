// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LotteryToken is ERC20, Ownable {
    constructor(uint256 initialSupply, address receiver) ERC20("Lottery Token", "LT") {
        _mint(receiver, initialSupply);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(address(this), amount);
    }

    function balanceTokens(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
