import RoundsList from "../../components/dashboard/lottery/rounds-list";
import LoadingUI from "../../components/ui/loading-ui";
import Title from "../../components/ui/title";
import Card from "../../components/ui/card";
import { User } from "lucide-react";
import { useLottery } from "../../hooks/useLottery";

export default function Home() {
  const { loading, lotteryData } = useLottery();

  const {
    contractBalance,
    tokensInCirculation,
    totalParticipants,
    totalTickets,
    currentRound,
    rounds,
  } = lotteryData;

  if (loading) return <LoadingUI title="Loading dashboard data..." />;

  return (
    <section className="space-y-xs">
      <section className="flex flex-col gap-y-2 mb-4">
        <Title title="Dashboard" />
        {/* Tokens, Tickets, Participants Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <Card>
            <h3 className="text-text text-sm">Transit tokens</h3>
            <p className="text-3xl lg:text-4xl font-bold text-accent">
              {tokensInCirculation} LT
            </p>
          </Card>
          <Card>
            <h3 className="text-text text-sm">Tickets purchased</h3>
            <p className="text-3xl lg:text-4xl font-bold text-accent">
              {totalTickets} LTK
            </p>
          </Card>
          <Card>
            <h3 className="text-text text-sm flex items-center gap-x-1 ">
              Participants <User size={16} />
            </h3>
            <p className="text-3xl lg:text-4xl font-bold text-accent flex items-center gap-x-0.5">
              {totalParticipants}
            </p>
          </Card>
        </div>

        {/* LT and LTK Price */}
        <div className="grid grid-cols-2 gap-x-2">
          <Card className="px-4 py-2">
            <h3 className="text-yellow-200 text-xs">Price LT</h3>
            <p className="text-2xl font-bold text-accent flex items-end gap-x-1">
              0.001 tBNB
            </p>
          </Card>
          <Card className="px-4 py-2">
            <h3 className="text-blue-200 text-xs">Price LTK</h3>
            <p className="text-2xl font-bold text-accent">5 LT</p>
          </Card>
        </div>

        {/* Round and Prize Collected Data */}
        <div className="flex gap-2">
          <Card className="flex-2 gradient-accent ">
            <h3 className="text-accent-dark text-lg lg:text-xl font-medium flex items-center gap-x-1 mb-2">
              Round
            </h3>
            <p className="text-4xl lg:text-5xl font-bold text-accent-dark">
              #{currentRound}
            </p>
          </Card>
          <Card className="flex-10">
            <h3 className="text-text text-lg lg:text-xl font-medium flex items-center gap-x-1 mb-2">
              Prize collected
            </h3>
            <p className="text-4xl lg:text-5xl font-bold text-accent">
              {contractBalance} tBNB
            </p>
          </Card>
        </div>
      </section>
      {rounds.length > 0 && (
        <section>
          <Title title="Last winner" className="mb-2" />
          <RoundsList rounds={[rounds[rounds.length - 1]]} />
        </section>
      )}
    </section>
  );
}
