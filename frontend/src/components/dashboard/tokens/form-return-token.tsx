import { useTransaction } from "../../../hooks/useTransaction";
import { useLottery } from "../../../hooks/useLottery";
import { LoaderCircle } from "lucide-react";
import Button from "../../ui/button";
import Input from "../../ui/input";

export default function FormReturnToken() {
  const { returnTokens } = useLottery();
  const { amount, error, handleChange, handleSubmit, loading } =
    useTransaction(returnTokens);

  return (
    <form onSubmit={handleSubmit} className="space-y-sm mb-4">
      <Input
        placeholder="0"
        name="amount-return"
        value={amount}
        onChange={(e) => handleChange(e.target.value)}
        type="number"
        className="py-1.5 px-4 text-lg text-yellow-200 focus:border-yellow-200"
      />
      {error && (
        <p className="text-error text-sm bg-error/10 rounded-sm px-2 py-1 border-error/30 border">
          Insufficient tokens to return
        </p>
      )}
      <Button
        disabled={loading}
        className="flex items-center justify-center h-10 text-base bg-yellow-200 hover:bg-yellow-200/80 disabled:bg-yellow-200/80"
      >
        {loading ? <LoaderCircle className="animate-spin" /> : "Return tokens"}
      </Button>
    </form>
  );
}
