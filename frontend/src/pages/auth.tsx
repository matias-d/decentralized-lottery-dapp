import { LoaderCircle, RotateCcw } from "lucide-react";
import { useLottery } from "../hooks/useLottery";
import { useNavigate } from "react-router";
import Card from "../components/ui/card";
import { useEffect } from "react";

export default function Auth() {
  const { account, loading, error, loadAccounts } = useLottery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && account !== null) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loading, account, navigate]);

  return (
    <>
      <main className="h-screen w-full flex-col gap-y-6 max-container padding-container flex items-center justify-center">
        <img src="/logo.webp" className="w-12 opacity-15" />
        <Card className="flex items-center  gap-x-2 lg:w-[60%]">
          <img
            src="/metamask.svg"
            alt="Metamask wallet logo"
            className="size-12"
          />
          {loading ? (
            <div className="flex items-center gap-x-2 text-gray-300">
              <p>Connecting your wallet...</p>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : !loading && error ? (
            <div className="flex items-center gap-x-2 text-gray-300">
              <p className="text-red-300">
                There was an error connecting your account.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-y-1 text-gray-300">
              <p>Connected account:</p>
              <div>
                {!account?.account ? (
                  <p className="text-sm text-text flex items-center gap-x-1">
                    Getting your account...{" "}
                    <LoaderCircle className="animate-spin" size={16} />
                  </p>
                ) : (
                  <p className="text-sm text-accent truncate max-w-64 lg:max-w-72">
                    {account?.account}
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>

        {!loading && error && (
          <button
            onClick={loadAccounts}
            className="text-gray-500 cursor-pointer transition-colors hover:bg-card/40 rounded-md p-2 flex items-center justify-center text-sm gap-x-1"
          >
            <p>Try again</p>
            <RotateCcw size={16} />
          </button>
        )}

        {!loading && !error && (
          <div className="text-gray-500 flex items-center justify-center text-sm gap-x-1">
            <p>Redirecting to dashboard...</p>
            <LoaderCircle className="animate-spin" size={16} />
          </div>
        )}

        <div className="flex flex-col items-center gap-2 absolute bottom-24 px-4 text-center ">
          <img className="size-8" src="/bnb-logo.svg" alt="BNB Logo" />
          <p className="text-sm text-text/40">
            This DApp only works on the BNB Testnet <br /> (BSC Testnet)
          </p>
        </div>
      </main>

      <footer className="absolute left-1/2 -translate-x-1/2 bottom-2">
        <p className="text-text/30 text-xs">
          Make by{" "}
          <a href="https://github.com/matias-d" className="hover:underline">
            matias-d
          </a>{" "}
          ❤
        </p>
      </footer>
    </>
  );
}
