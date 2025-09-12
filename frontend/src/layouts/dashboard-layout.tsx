import { Outlet, useNavigate } from "react-router";
import { useLottery } from "../hooks/useLottery";
import Tabs from "../components/dashboard/tabs";
import { LoaderCircle, RotateCcw } from "lucide-react";
import Card from "../components/ui/card";
import { useEffect } from "react";
import useIsOwner from "../hooks/useIsOwner";

export default function DashboardLayout() {
  const { account, error, loading, loadAccounts } = useLottery();
  const { isOwner } = useIsOwner();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (error || !account)) {
      navigate("/");
    }
  }, [loading, error, account, navigate]);

  return (
    <main className=" h-screen w-full flex-col gap-y-6 max-container padding-container flex items-center justify-center py-4">
      <section className=" w-full relative bg-card/20 rounded-lg overflow-auto lg:h-[80vh] p-4 shadow border-default">
        <header>
          <Card className="flex flex-col gap-y-1 relative">
            <div className="absolute bottom-1 lg:bottom-2 right-3 lg:right-2 flex items-center gap-x-1 ">
              <p className="text-[10px] lg:text-xs text-text/50">BSC Testnet</p>
              <img src="/bnb-logo.svg" className="size-4" />
            </div>
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-y-2">
                <LoaderCircle className="animate-spin text-text" size={26} />
                <h2 className="text-text ">Loading account</h2>
              </div>
            ) : (
              <>
                <p className="text-text text-sm flex items-center gap-x-2">
                  Connected account:{" "}
                  {isOwner && (
                    <span className="text-[10px] p-1 rounded-sm bg-accent/10 text-accent border-accent/20 border">
                      Owner
                    </span>
                  )}
                </p>
                <p className=" text-accent lg:w-auto w-56 truncate">
                  {account?.account}
                </p>
                <button
                  onClick={loadAccounts}
                  className="absolute transition-colors hover:bg-bg/30 rounded-sm cursor-pointer p-1 top-2 right-2"
                >
                  <RotateCcw size={16} />
                </button>
              </>
            )}
          </Card>
          <Tabs />
        </header>

        <Outlet />

        <footer className="text-center mt-2 lg:mt-6">
          <p className="text-text/30 text-xs">
            Make by{" "}
            <a href="https://github.com/matias-d" className="hover:underline">
              matias-d
            </a>{" "}
            ❤
          </p>
        </footer>
      </section>
    </main>
  );
}
