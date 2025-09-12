export interface LotteryData {
  totalSupply: string;
  tokensInCirculation: string;
  totalParticipants: number;
  totalTickets: number;
  contractBalance: string;
  currentRound: number;
  rounds: Round[];
}

export interface Round {
  winner: string;
  prize: number;
  timestamp: number;
  round: number;
  ticketCount: number;
  winningTokenId: number;
  winningTicketCode: number;
}

export interface Ticket {
  tokenId: number;
  ticketCode: number;
}

export interface UserData {
  account: string;
  tokenBalance: string;
  tickets: Ticket[];
  balanceBNB: string;
  historyTickets: { round: number; tickets: UserTicket[] }[];
}

export interface UserTicket {
  round: number;
  ticketId: number;
  ticketCode: number;
}
