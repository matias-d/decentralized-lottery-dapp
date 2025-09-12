// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LotteryTicket is ERC721 {
    address public lotteryContract;

    constructor(address _lottery) ERC721("Lottery Ticket", "LTK") {
        lotteryContract = _lottery;
    }

    function safeMint(address owner, uint256 tokenId) public {
        require(msg.sender == lotteryContract, "Only lottery contract can mint tickets");
        _safeMint(owner, tokenId);
    }
}
