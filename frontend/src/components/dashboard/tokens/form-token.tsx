import { LoaderCircle } from "lucide-react";
import Button from "../../ui/button";
import Input from "../../ui/input";

import { useLottery } from "../../../hooks/useLottery";
import { useTransaction } from "../../../hooks/useTransaction";

export default function FormToken() {
  const { buyTokens } = useLottery();
  const { handleChange, handleSubmit, amount, error, loading } =
    useTransaction(buyTokens);

  return (
    <form onSubmit={handleSubmit} className="space-y-sm">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        name="token-amount"
        placeholder="0"
        value={amount}
        type="number"
      />
      {error && (
        <p className="text-error text-sm bg-error/10 rounded-sm px-2 py-1 border-error/30 border">
          {error || "Insufficient tBNB"}
        </p>
      )}
      <Button disabled={loading} className="flex items-center justify-center">
        {loading ? <LoaderCircle className="animate-spin" /> : "Claim tokens"}
      </Button>
    </form>
  );
}
