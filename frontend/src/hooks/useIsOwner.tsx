import { useEffect, useState } from "react";
import { _isOwner } from "../services/web3.services";
import { useLottery } from "./useLottery";
import { toast } from "sonner";

export default function useIsOwner() {
  const { account, lotterySC } = useLottery();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      if (!account || !lotterySC) return;
      try {
        const result = await _isOwner(lotterySC, account.account);
        setIsOwner(result);
      } catch (error) {
        console.error("Lottery ERROR: error verifying owner", error);
        toast.error("An error occurred while verifying the owner.");
      }
    })();
  }, [account, lotterySC]);

  return {
    isOwner,
  };
}
