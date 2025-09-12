import GenerateWinnerButton from "../../components/dashboard/lottery/generate-winner-button";
import RoundsDisclousure from "../../components/dashboard/lottery/rounds-disclousure";
import TicketsDisclosure from "../../components/dashboard/lottery/tickets-disclousure";
import LoadingUI from "../../components/ui/loading-ui";
import { useLottery } from "../../hooks/useLottery";
import Title from "../../components/ui/title";
import Card from "../../components/ui/card";
import { Trophy, User } from "lucide-react";

export default function Lottery() {
  const { loading, lotteryData } = useLottery();

  const { contractBalance, totalTickets, totalParticipants, currentRound } =
    lotteryData;

  if (loading) return <LoadingUI title="Loading lottery data..." />;

  return (
    <section className="space-y-xs">
      <Title title="Lottery" />
      <div className=" flex gap-2">
        <Card className="flex-2 gradient-accent ">
          <h3 className="text-accent-dark text-lg lg:text-xl font-medium flex items-center gap-x-1 mb-2">
            Round
          </h3>
          <p className="text-4xl lg:text-5xl font-bold text-accent-dark">
            #{currentRound}
          </p>
        </Card>
        <Card className=" flex-9">
          <h3 className="text-text text-lg lg:text-xl font-medium flex items-center gap-x-1 mb-2">
            Prize collected
          </h3>
          <div className="w-full flex items-center justify-between">
            <p className="text-4xl lg:text-5xl font-bold text-accent">
              {contractBalance} tBNB
            </p>
            <Trophy
              size={40}
              className="text-accent bg-accent/5 size-12 p-2 rounded-md border-accent/30 border"
            />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-x-2 ">
        <Card>
          <h3 className="text-text text-sm">Tickets purchased</h3>
          <p className="text-3xl lg:text-4xl font-bold text-accent">
            {totalTickets} LTK
          </p>
        </Card>
        <Card>
          <h3 className="text-text text-sm flex items-center gap-x-1">
            Participants <User size={16} />
          </h3>
          <p className="text-3xl lg:text-4xl font-bold text-accent flex items-center gap-x-0.5">
            {totalParticipants}
          </p>
        </Card>
      </div>
      <TicketsDisclosure />
      <RoundsDisclousure />

      <GenerateWinnerButton />
    </section>
  );
}
