/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  LotteryData,
  Round,
  Ticket,
  UserData,
  UserTicket,
} from "../interfaces/Lottery";
import { getWeb3 } from "../utils/web3.client";
import { toast } from "sonner";
import { Contract } from "web3";

// Get the user's current account along with their balance of tokens, tickets, and tBNB.
export async function getAccountAndData(
  lottery: Contract<any>
): Promise<UserData> {
  try {
    const web3 = await getWeb3();

    const accounts = await web3.eth.getAccounts();

    const account = accounts[0];

    // Get tBNB balance
    const balanceWei = await web3.eth.getBalance(account);
    const balanceBNB = web3.utils.fromWei(balanceWei, "ether");

    // Get token balance
    const tokenBalanceRaw = await lottery.methods.balanceTokens(account).call();
    const tokenBalance = tokenBalanceRaw as unknown as string;

    // Get NFT tokenIds owned by the user
    const tokenIdsRaw = await lottery.methods.myTicketsCurrent(account).call();
    const tokenIds: number[] = Array.isArray(tokenIdsRaw)
      ? tokenIdsRaw.map((id: string) => Number(id))
      : [];

    // Get ticketCodes (random numbers) associated to tokenIds
    const ticketCodesRaw = await lottery.methods
      .myTicketCodesCurrent(account)
      .call();
    const ticketCodes: number[] = Array.isArray(ticketCodesRaw)
      ? ticketCodesRaw.map((code: any) => Number(code))
      : [];

    // Combine tokenId and ticketCode into one array
    const tickets: Ticket[] = tokenIds.map((id, index) => ({
      tokenId: id,
      ticketCode: ticketCodes[index],
    }));

    // Get history tickets of user
    const currentRoundRaw = await lottery.methods.currentRound().call();
    const currentRound = Number(currentRoundRaw);
    const historyTickets = await getUserTicketHistory(
      lottery,
      account,
      currentRound
    );

    return { account, tokenBalance, tickets, balanceBNB, historyTickets };
  } catch (error: any) {
    console.error("ERROR: getAccountAndData", error);
    throw error;
  }
}

interface LotteryHelper {
  lottery: any;
  data: LotteryData;
}
// Get information about the Lottery smart contract, total token supply,
// tickets purchased, participants, final prize.
export async function getLotteryContract(): Promise<LotteryHelper> {
  try {
    const web3 = await getWeb3();

    // Fetch ABI
    const lotteryJSON = await fetch("/abi/Lottery.json").then((res) =>
      res.json()
    );

    // Fetch deployed address
    const addressJSON = await fetch("/abi/lottery-address.json").then((res) =>
      res.json()
    );
    const lotteryAddress = addressJSON?.Lottery;

    if (!lotteryAddress) {
      throw new Error(
        "Lottery contract address not found. Make sure lottery-address.json exists in /public/abi."
      );
    }

    // Instantiate contract
    const lottery = new web3.eth.Contract(lotteryJSON.abi, lotteryAddress);

    // Fetch statistics
    const [
      totalSupplyRaw,
      tokensInCirculationRaw,
      totalParticipantsRaw,
      totalTicketsRaw,
      contractBalanceRaw,
      currentRoundRaw,
    ] = await Promise.all([
      lottery.methods.totalSupplyTokens().call(),
      lottery.methods.tokensInCirculation().call(),
      lottery.methods.totalParticipants().call(),
      lottery.methods.totalTicketsBought().call(),
      lottery.methods.balanceEthersSC().call(), // Balance in TBNB
      lottery.methods.currentRound().call(),
    ]);

    // Parser
    const totalSupply = web3.utils.fromWei(
      totalSupplyRaw as unknown as string,
      "ether"
    );
    const tokensInCirculation = tokensInCirculationRaw as unknown as string;
    const totalParticipants = Number(totalParticipantsRaw);
    const totalTickets = Number(totalTicketsRaw);
    const contractBalance = contractBalanceRaw as unknown as string;
    const currentRound = Number(currentRoundRaw);

    const rounds = await getAllRounds(currentRound, lottery);

    return {
      lottery,
      data: {
        totalSupply,
        tokensInCirculation,
        totalParticipants,
        totalTickets,
        contractBalance,
        currentRound,
        rounds,
      },
    };
  } catch (error: any) {
    console.error("Error fetching lottery contract:", error);
    toast.error(error.message || "Failed to fetch lottery contract");
    throw error;
  }
}

// Get all lottery rounds up to the current round in an array..
export async function getAllRounds(
  currentRound: number,
  lottery: Contract<any>
): Promise<Round[]> {
  const web3 = await getWeb3();

  const allRounds: Round[] = [];

  for (let i = 0; i < currentRound; i++) {
    // Fetch the round directly from the contract
    const roundRaw = (await lottery.methods.rounds(i).call()) as Round;

    // Skip rounds with no winner yet
    if (
      !roundRaw.winner ||
      roundRaw.winner === "0x0000000000000000000000000000000000000000"
    ) {
      continue;
    }

    allRounds.push({
      round: i,
      winner: roundRaw.winner,
      prize: Number(web3.utils.fromWei(roundRaw.prize, "ether")),
      timestamp: Number(roundRaw.timestamp),
      ticketCount: Number(roundRaw.ticketCount),
      winningTokenId: Number(roundRaw.winningTokenId),
      winningTicketCode: Number(roundRaw.winningTicketCode),
    });
  }

  return allRounds;
}

// Get all past tickets of a user from previous lottery rounds (excluding the current round)
export async function getUserTicketHistory(
  lottery: Contract<any>,
  account: string,
  currentRound: number
): Promise<{ round: number; tickets: UserTicket[] }[]> {
  if (!account) throw new Error("Account not loaded");

  // If current round is 1 or less, there are no past tickets
  if (currentRound <= 1) return [];

  const historyByRound: { round: number; tickets: UserTicket[] }[] = [];

  // Loop through all past rounds
  for (let i = 0; i <= currentRound - 1; i++) {
    try {
      const ticketIds: string[] = await lottery.methods
        .ticketsByUserInRound(i, account)
        .call();

      if (ticketIds.length === 0) continue; // skip rounds with no tickets

      const tickets: UserTicket[] = [];

      for (const id of ticketIds) {
        const code = await lottery.methods.ticketCodeByTokenId(id).call();
        tickets.push({
          round: i,
          ticketId: Number(id),
          ticketCode: Number(code),
        });
      }

      historyByRound.push({ round: i, tickets });
    } catch (err) {
      console.warn(`Round ${i} skipped:`, err);
      continue;
    }
  }

  return historyByRound;
}

// Buy Lottery Tokens from the Lottery contract.
export async function _buyTokens(
  lottery: Contract<any>,
  account: string,
  amountTokens: string
) {
  // Obten el precio correcto del contrato
  const valueWeiRaw = await lottery.methods.priceTokens(amountTokens).call();
  const valueWei = valueWeiRaw as unknown as string;

  const tx = await lottery.methods.buyTokens(amountTokens).send({
    from: account,
    value: valueWei.toString(),
  });

  return tx;
}

// Return Lottery Tokens to the Lottery contract in exchange for tBNB.
export async function _returnTokens(
  lottery: Contract<any>,
  account: string,
  amountTokens: string
) {
  const web3 = await getWeb3();

  const tokenAddressRaw = await lottery.methods.token().call();
  if (!tokenAddressRaw) throw new Error("Token address not found");

  const tokenAddress = tokenAddressRaw as unknown as string;

  const tokenJSON = await fetch("/abi/LotteryToken.json").then((res) =>
    res.json()
  );

  const tokenContract = new web3.eth.Contract(tokenJSON.abi, tokenAddress);

  await tokenContract.methods
    .approve(lottery.options.address, amountTokens)
    .send({ from: account });

  const tx = await lottery.methods.returnTokens(amountTokens).send({
    from: account,
  });

  return tx;
}

// Buy lottery tickets from the Lottery contract
// Buy lottery tickets safely
export async function _buyLottery(
  lottery: Contract<any>,
  account: string,
  ticketNum: string
) {
  const web3 = await getWeb3();

  const tokenAddressRaw = await lottery.methods.token().call();
  if (!tokenAddressRaw) throw new Error("Token address not found");

  const tokenAddress = tokenAddressRaw as unknown as string;

  const tokenJSON = await fetch("/abi/LotteryToken.json").then((res) =>
    res.json()
  );
  const tokenContract = new web3.eth.Contract(tokenJSON.abi, tokenAddress);

  const ticketPriceRaw = await lottery.methods.ticketPrice().call();

  if (!ticketPriceRaw || !ticketNum) {
    throw new Error("Invalid ticket price or ticket number");
  }

  const totalPrice =
    BigInt(ticketPriceRaw.toString()) * BigInt(ticketNum.toString());

  const allowanceRaw = await tokenContract.methods
    .allowance(account, lottery.options.address)
    .call();
  const allowance = BigInt(allowanceRaw as unknown as string);

  if (BigInt(allowance) < totalPrice) {
    await tokenContract.methods
      .approve(lottery.options.address, totalPrice.toString())
      .send({ from: account });
  }

  const gasEstimate = await lottery.methods
    .buyTickets(ticketNum)
    .estimateGas({ from: account });

  const tx = await lottery.methods.buyTickets(ticketNum).send({
    from: account,
    gas: (gasEstimate * BigInt(2)).toString(),
  });
  return tx;
}

//
export async function _generateWinner(lottery: Contract<any>, account: string) {
  // Estimate gas
  const gasEstimate = await lottery.methods
    .generateWinner()
    .estimateGas({ from: account });

  // Send transaction con gas estimado
  return lottery.methods
    .generateWinner()
    .send({ from: account, gas: gasEstimate.toString() });
}

// Verify that the user is the owner of the contract
export async function _isOwner(lottery: Contract<any>, account: string) {
  const isOwner: boolean = await lottery.methods.isOwner(account).call();

  return isOwner;
}
