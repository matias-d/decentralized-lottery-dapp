/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserData } from "../interfaces/Lottery";
import Web3, { Contract } from "web3";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  lotterySC: Contract<any> | null;
  account: UserData | null;
  update: () => Promise<void>; // Pasamos la función como prop
}

export function useWinnerToast({ lotterySC, account, update }: Props) {
  useEffect(() => {
    if (!lotterySC || !account) return;

    let subscription: any;
    let isMounted = true;

    const lastSeenRound = Number(localStorage.getItem("lastRoundId") || "0");

    try {
      subscription = lotterySC.events
        .WinnerSelected({ fromBlock: "latest" })
        .on("data", async (event: any) => {
          if (!isMounted) return;

          const { roundId, winner, prize } = event.returnValues;
          const roundNumber = Number(roundId);

          if (roundNumber > lastSeenRound) {
            const prizeBNB = Web3.utils.fromWei(prize, "ether");

            toast.success(
              `Winner selected for round ${roundNumber}: ${winner}, prize: ${prizeBNB} tBNB`
            );

            if (winner.toLowerCase() === account.account.toLowerCase()) {
              toast(
                `🎉 Congratulations! You won ${prizeBNB} tBNB in round ${roundNumber}!`,
                {
                  icon: "🏆",
                  duration: 8000,
                }
              );
            }

            localStorage.setItem("lastRoundId", roundNumber.toString());
            await update();
          }
        });
    } catch (err) {
      console.error("Error starting WinnerSelected listener:", err);
    }

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe((error: any, success: boolean) => {
          if (success) console.log("Unsubscribed from WinnerSelected");
          if (error) console.error("Error unsubscribing:", error);
        });
      }
    };
  }, [lotterySC, account, update]);
}
