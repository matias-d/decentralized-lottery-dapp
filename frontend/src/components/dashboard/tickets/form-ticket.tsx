import { useTransaction } from "../../../hooks/useTransaction";
import { useLottery } from "../../../hooks/useLottery";
import { LoaderCircle } from "lucide-react";
import Button from "../../ui/button";
import Input from "../../ui/input";

export default function FormTicket() {
  const { buyTickets } = useLottery();
  const { amount, error, handleChange, handleSubmit, loading } =
    useTransaction(buyTickets);

  return (
    <form onSubmit={handleSubmit} className="space-y-sm">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        value={amount}
        name="amount-ticket"
        placeholder="0"
        type="number"
      />
      {error && (
        <p className="text-error text-sm bg-error/10 rounded-sm px-2 py-1 border-error/30 border">
          Insufficient tokens
        </p>
      )}
      <Button disabled={loading} className="flex items-center justify-center">
        {loading ? <LoaderCircle className="animate-spin" /> : "Claim Tickets"}
      </Button>
    </form>
  );
}
