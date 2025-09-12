import FormReturnToken from "../../components/dashboard/tokens/form-return-token";
import FormToken from "../../components/dashboard/tokens/form-token";
import { EqualApproximately, Wallet } from "lucide-react";
import LoadingUI from "../../components/ui/loading-ui";
import Title from "../../components/ui/title";
import Card from "../../components/ui/card";
import { useLottery } from "../../hooks/useLottery";

export default function Tokens() {
  const { loading, lotteryData, account } = useLottery();

  if (loading) return <LoadingUI title="Loading lottery data..." />;
  return (
    <section className="space-y-xs">
      <div className="w-full flex-col lg:flex-row items-start flex lg:items-center justify-between">
        <Title title="Tokens" />
        <section className="flex justify-between lg:justify-start w-full lg:w-auto items-center gap-x-0 lg:gap-x-3">
          <div className="flex items-center gap-x-0.5 lg:gap-x-3">
            <p className="text-xs text-text">total supply:</p>
            <Card className="p-1 lg:p-2">
              <p className="flex text-xs lg:text-sm items-center text-yellow-200 gap-x-2 ">
                {lotteryData.totalSupply} TL
              </p>
            </Card>
          </div>
          <div className="flex items-center gap-x-0.5 lg:gap-x-3">
            <p className="text-xs text-text">price:</p>
            <Card className="p-1 lg:p-2">
              <p className="flex items-center gap-x-1 lg:gap-x-2 text-xs lg:text-sm">
                0.001 tBNB <EqualApproximately />{" "}
                <span className="text-yellow-200">1 LT</span>
              </p>
            </Card>
          </div>
        </section>
      </div>
      <section>
        <Card className="mb-4">
          <h3 className="text-text text-sm">Your tokens</h3>
          <div className="flex w-full items-center justify-between">
            <p className="text-3xl lg:text-4xl font-bold text-accent">
              {account?.tokenBalance} LT
            </p>
            <Wallet size={40} className="text-accent " />
          </div>
        </Card>
        <hr className="w-full border-default mb-4" />

        <div className="w-full space-y-xs mb-4">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-sm text-text">Buy tokens</h3>
            <p className="text-yellow-200 px-2  bg-yellow-300/10 rounded-sm border border-yellow-200/30 flex items-center gap-x-1">
              {Number(account?.balanceBNB).toFixed(3)} tBNB{" "}
              <img src="/bnb-logo.svg" className="size-4" />
            </p>
          </div>

          <FormToken />
        </div>

        <div className="w-full space-y-xs ">
          <h3 className="text-sm text-text">Return tokens</h3>

          <FormReturnToken />
        </div>
      </section>
    </section>
  );
}
