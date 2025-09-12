import { LotteryContext } from "../context/lottery-provider";
import { useContext } from "react";

export function useLottery() {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error(
      "PROVIDER ERROR: useLottery must be used within a LotteryProvider"
    );
  }
  return useContext(LotteryContext);
}
