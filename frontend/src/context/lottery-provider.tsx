/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  _buyLottery,
  _buyTokens,
  _generateWinner,
  _returnTokens,
  getAccountAndData,
  getLotteryContract,
} from "../services/web3.services";
import type { LotteryData, UserData } from "../interfaces/Lottery";
import { createContext, useEffect, useState } from "react";
import { useWinnerToast } from "../hooks/useWinnerToast";
import confetti from "canvas-confetti";
import type { Contract } from "web3";
import { toast } from "sonner";

interface ILotteryContext {
  lotterySC: Contract<any> | null;
  lotteryData: LotteryData;
  account: UserData | null;
  loading: boolean;
  error: boolean;

  loadAccounts: () => Promise<void>;

  buyTokens: (amount: string) => Promise<void>;
  returnTokens: (amount: string) => Promise<void>;

  buyTickets: (amount: string) => Promise<void>;
  generateWinner: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LotteryContext = createContext<ILotteryContext>({
  account: null,
  loading: false,
  error: false,
  lotterySC: null,

  lotteryData: {
    totalSupply: "0",
    tokensInCirculation: "0",
    totalParticipants: 0,
    totalTickets: 0,
    contractBalance: "0",
    currentRound: 1,
    rounds: [],
  },

  loadAccounts: async () => {},

  buyTokens: async () => {},
  returnTokens: async () => {},

  buyTickets: async () => {},
  generateWinner: async () => {},
});

export default function LotteryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lotteryData, setLotteryData] = useState<LotteryData>({
    totalSupply: "0",
    tokensInCirculation: "0",
    totalParticipants: 0,
    totalTickets: 0,
    contractBalance: "0",
    currentRound: 1,
    rounds: [],
  });
  const [lotterySC, setLotterySC] = useState<Contract<any> | null>(null);

  const [account, setAccount] = useState<UserData | null>(null);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });

  // Refresh user and contract data
  const update = async (): Promise<void> => {
    const { data, lottery } = await getLotteryContract();
    const updatedAccount = await getAccountAndData(lottery);

    setAccount(updatedAccount);
    setLotterySC(lottery);
    setLotteryData(data);
    toast.dismiss();
  };

  useEffect(() => {
    loadAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWinnerToast({ account, lotterySC, update });

  const loadAccounts = async () => {
    setStatus((prev) => ({ ...prev, loading: true, error: false }));
    try {
      await update();
    } catch (error: any) {
      console.error(error);
      setAccount(null);
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  // === Actions SC ===

  const buyTokens = async (amount: string): Promise<void> => {
    if (!lotterySC || !account)
      throw new Error("Contract or account not loaded");

    try {
      await _buyTokens(lotterySC, account.account, amount);

      await update();

      toast.success("Tokens successfully obtained");
    } catch (error) {
      console.error("Error returned tokens:", error);
      toast.error("An error occurred while returned tokens");
      throw error;
    }
  };

  const returnTokens = async (amount: string): Promise<void> => {
    if (!lotterySC || !account)
      throw new Error("Contract or account not loaded");

    try {
      await _returnTokens(lotterySC, account.account, amount);

      await update();
      toast.success("Tokens successfully obtained");
    } catch (error) {
      console.error("Error buying tokens:", error);
      toast.error("An error occurred while purchasing tokens");
      throw error;
    }
  };

  const buyTickets = async (amount: string): Promise<void> => {
    if (!lotterySC || !account)
      throw new Error("Contract or account not loaded");

    try {
      await _buyLottery(lotterySC, account.account, amount);
      await update();
      toast.success("Tickets successfully obtained");
    } catch (error: any) {
      console.error("Error buying tickets:", error);
      toast.error("An error occurred while purchasing tickets");
      throw error;
    }
  };

  const generateWinner = async (): Promise<void> => {
    if (!lotterySC || !account)
      throw new Error("Contract or account not loaded");

    try {
      await _generateWinner(lotterySC, account.account);
      confetti({
        particleCount: Math.floor(200 * 0.25),
        spread: 26,
        origin: { y: 0.7 },
        startVelocity: 55,
      });
      await update();
    } catch (error) {
      console.error("Error generating winner:", error);
      toast.error("An error occurred while generating a winner.");
      throw error;
    }
  };

  return (
    <LotteryContext.Provider
      value={{
        account,
        loading: status.loading,
        error: status.error,
        loadAccounts,
        lotterySC,
        lotteryData,
        buyTokens,
        returnTokens,
        buyTickets,
        generateWinner,
      }}
    >
      {children}
    </LotteryContext.Provider>
  );
}
