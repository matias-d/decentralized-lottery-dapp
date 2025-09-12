/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type ActionFunction = (value: string) => Promise<any>;

export function useTransaction(action: ActionFunction) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => setAmount(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("The amount must be greater than 0.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await action(amount);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Transaction failed");
    } finally {
      setLoading(false);
      setAmount("");
    }
  };

  return {
    amount,
    loading,
    error,
    handleChange,
    handleSubmit,
    setAmount,
  };
}
