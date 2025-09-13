// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LotteryToken.sol";
import "./LotteryTicket.sol";

/// @title Lottery Smart Contract
/// @author matias-d
/// @notice This contract implements a lottery that uses tokens and NFTs to represent tickets.
/// @dev It is based on an ERC20 token (LotteryToken) and an NFT (LotteryTicket).

contract Lottery is Ownable {
    LotteryToken public token;
    LotteryTicket public ticketNFT;

    uint public ticketPrice = 5; // Price of each ticket in tokens
    uint randNonce = 0; // Seed for generating randomness 
    address public winner;

    uint256 public currentRound = 1;

    struct Round {
        address winner;
        uint256 prize;
        uint256 timestamp;
        uint256 ticketCount;
        uint256 winningTokenId;   
        uint256 winningTicketCode; 
    }
    /// @notice Stores information about each lottery round
    mapping(uint256 => Round) public rounds;

    /// @notice Stores all ticket IDs for each round
    mapping(uint256 => uint256[]) public ticketsByRound;

    /// @notice Maps each ticket ID to its owner's address for a given round
    mapping(uint256 => mapping(uint256 => address)) public ticketOwner;

    /// @notice Maps each user to an array of their ticket IDs for a given round
    mapping(uint256 => mapping(address => uint256[])) public userTickets;

    /// @notice Stores all participants' addresses for each round
    mapping(uint256 => address[]) public participantsByRound;

    uint256 public nextTicketTokenId = 1;
    mapping(uint256 => uint256) public ticketCodeByTokenId; 

    event TicketPurchased(uint256 indexed roundId, address indexed buyer, uint256 ticketId);
    event WinnerSelected(uint256 indexed roundId, address indexed winner, uint256 prize);


    /// @notice Initialize the contract by deploying the necessary tokens and NFTs.
    /// @param initialSupply Initial number of tokens to be issued
    constructor(uint256 initialSupply) {
        token = new LotteryToken(initialSupply, address(this));
        ticketNFT = new LotteryTicket(address(this));
    }

    /// @notice Checks if a given address is the owner of the contract
    /// @param user The address to check
    function isOwner(address user) public view returns (bool) {
        return user == owner();
    }

    /// @notice Calculate the price in ethers of a quantity of tokens
    /// @param _numTokens Number of tokens to be calculated
    function priceTokens(uint256 _numTokens) internal pure returns (uint256) {
        return _numTokens * 1e15; // 0.001 tBNB (1e15 wei)
    }

  /// @notice Returns the balance of tokens held by the smart contract
    function balanceTokensSC() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    /// @notice Returns the balance of tokens for a specific address
    /// @param owner The address of the token holder
    function balanceTokens(address owner) public view returns (uint256) {
        return token.balanceOf(owner);
    }

    /// @notice Returns the totalSupply of the lottery token.
    function totalSupplyTokens() public view returns (uint256) {
        return token.totalSupply();
    }

    /// @notice Returns the number of unique participants in the current lottery round
    function totalParticipants() public view returns (uint256) {
        return participantsByRound[currentRound].length;
    }

    /// @notice Returns the number of unique participants for a specific lottery round
    /// @param round The round number to query
    function totalParticipantsByRound(uint256 round) public view returns (uint256) {
        return participantsByRound[round].length;
    }

    /// @notice Returns the tokens in circulation (totalSupply - contract balance)
    function tokensInCirculation() public view returns (uint256) {
        return token.totalSupply() - token.balanceOf(address(this));
    }

    /// @notice Returns the total number of tickets purchased in a round.
    /// @param roundId Round ID (ej., currentRound)
    function totalTicketsBoughtByRound(uint256 roundId) public view returns (uint256) {
        return ticketsByRound[roundId].length;
    }

    function totalTicketsBought() external view returns (uint256) {
        return ticketsByRound[currentRound].length;
    }

    /// @notice Returns all tickets purchased by a user in a round
    /// @param roundId Round ID
    /// @param user User address
    function ticketsByUserInRound(uint256 roundId, address user)
        public
        view
        returns (uint256[] memory)
    {
        return userTickets[roundId][user];
    }

    /// @notice Returns the array of NFT token IDs owned by a user in the current round
    /// @param user The address of the user
    /// @return An array of token IDs
    function myTicketsCurrent(address user) external view returns (uint256[] memory) {
        return userTickets[currentRound][user];
    }

    /// @notice Returns the array of lottery ticket numbers (random codes) owned by a user in the current round
    /// @param user The address of the user
    /// @return An array of ticket numbers corresponding to the user's NFTs
    function myTicketCodesCurrent(address user) external view returns (uint256[] memory) {
        uint256[] memory ids = userTickets[currentRound][user];
        uint256[] memory codes = new uint256[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            codes[i] = ticketCodeByTokenId[ids[i]];
        }
        return codes;
    }

    /// @notice Allows you to purchase tokens by paying with ethers
    /// @param _numTokens Number of tokens to purchase
    function buyTokens(uint256 _numTokens) public payable {
        uint256 cost = priceTokens(_numTokens);
        require(msg.value >= cost, "Insufficient payment");

        uint256 balance = balanceTokensSC();
        require(_numTokens <= balance, "There are not enough tokens in the contract.");

        uint256 returnValue = msg.value - cost;
        if (returnValue > 0) payable(msg.sender).transfer(returnValue);

        token.transfer(msg.sender, _numTokens);
    }

    /// @notice Allows tokens to be returned in exchange for ethers
    /// @param _numTokens Number of tokens to be returned
    function returnTokens(uint _numTokens) public payable {
        require(_numTokens > 0, "The number of tokens to be returned must be greater than 0.");
        require(_numTokens <= token.balanceTokens(msg.sender), "You do not have the tokens you wish to return.");

        bool success = token.transferFrom(msg.sender, address(this), _numTokens);
        require(success, "Token transfer failed.");

        payable(msg.sender).transfer(priceTokens(_numTokens));
    }

    /// @notice Allows you to purchase lottery tickets using tokens
    /// @param ticketNum Number of tickets to purchase
    function buyTickets(uint ticketNum) public {

        require(ticketNum > 0, "Must buy at least one ticket");

        uint totalPrice = ticketNum * ticketPrice;
        require(token.balanceTokens(msg.sender) >= totalPrice, "You do not have enough tokens.");

        token.transferFrom(msg.sender, address(this), totalPrice);

        if (userTickets[currentRound][msg.sender].length == 0) {
            participantsByRound[currentRound].push(msg.sender);
        }

        for (uint i = 0; i < ticketNum; i++) {
            uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 10000;
            randNonce++;

            uint256 tokenId = nextTicketTokenId++;
            ticketCodeByTokenId[tokenId] = random;

            ticketsByRound[currentRound].push(tokenId);
            ticketOwner[currentRound][tokenId] = msg.sender;
            userTickets[currentRound][msg.sender].push(tokenId);

            ticketNFT.safeMint(msg.sender, tokenId);

            emit TicketPurchased(currentRound, msg.sender, tokenId);
        }
    }

    /// @notice Select a lottery winner pseudo-randomly
    /// @dev Only the contract owner can call it.
    function generateWinner() public onlyOwner {
        uint256 total = ticketsByRound[currentRound].length;
        require(total > 0, "No tickets purchased");

        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % total;
        randNonce++;

        uint256 chosenTokenId = ticketsByRound[currentRound][randomIndex];
        address winnerAddr = ticketOwner[currentRound][chosenTokenId];

        uint256 balance = address(this).balance;
        uint256 prize = (balance * 95) / 100;
        uint256 fee = balance - prize;

        payable(winnerAddr).transfer(prize);
        payable(owner()).transfer(fee);

        rounds[currentRound] = Round({
            winner: winnerAddr,
            prize: prize,
            timestamp: block.timestamp,
            ticketCount: total,
            winningTokenId: chosenTokenId,
            winningTicketCode: ticketCodeByTokenId[chosenTokenId]
        });

        emit WinnerSelected(currentRound, winnerAddr, prize);

        currentRound++; 
        
    }

    /// @notice Returns the balance in ethers of the contract
    function balanceEthersSC() public view returns (uint256) {
        return address(this).balance;
    }
}
