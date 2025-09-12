import type { Round } from "../../../interfaces/Lottery";
import { formatDate } from "../../../utils/format-date";
import { useLottery } from "../../../hooks/useLottery";
import { ExternalLink, Ticket } from "lucide-react";
import Card from "../../ui/card";

interface Props {
  card: Round;
}

export default function RoundCard({ card }: Props) {
  const { account } = useLottery();

  return (
    <div className="flex flex-col lg:flex-row gap-1  items-start w-full">
      <div className="flex items-center gap-x-2">
        {/* Round Number */}
        <Card className="flex-1 text-center w-20 h-20  flex items-center justify-center gradient-accent relative">
          <p className=" text-2xl font-bold text-accent-dark">#{card.round}</p>
          <span className="text-[9px] text-accent-dark font-bold absolute bottom-1 left-1/2 -translate-x-1/2 w-full">
            {formatDate(card.timestamp)}
          </span>
        </Card>
        <p className="text-text block lg:hidden">Round</p>
      </div>

      {/* Round Detail */}
      <Card className="relative flex-4/5 h-20 bg-card-light flex items-center w-full justify-between">
        {/* Winning outline */}
        {account?.account.toLowerCase() === card.winner.toLowerCase() && (
          <>
            <div className="absolute top-0 right-0 w-[60%]  border-winner h-full rounded-lg"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 size-3 rounded-full bg-yellow-200 glow"></div>
          </>
        )}

        <div className="flex flex-col">
          <p className="text-text/40 text-[10px]">Tickets</p>
          <p className="flex items-center font-semibold gap-x-1 text-lg lg:text-xl text-title ">
            {card.ticketCount} <Ticket className="text-accent/60 rotate-90" />
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-text/40 text-[10px]">Prize</p>
          <p className="text-lg lg:text-xl text-title font-semibold">
            {card.prize}{" "}
            <span className="text-base font-normal text-accent">tBNB</span>
          </p>
        </div>
        <div className="flex flex-col z-10">
          <div className="flex items-center justify-between">
            <p className="text-text/40 text-[10px]">Winner: </p>
            <p className="text-text/60 text-[10px]">
              #{card.winningTicketCode}
            </p>
          </div>

          <a
            target="_blank"
            href={`https://etherscan.io/address/${card.winner}`}
            className="group"
          >
            <div className="flex items-center">
              <p className="truncate w-24 lg:w-32 text-title text-lg lg:text-xl group-hover:opacity-80 transition-colors">
                {card.winner}
              </p>
              <ExternalLink
                className="text-accent lg:-ml-2  group-hover:opacity-80 transition-colors"
                size={22}
              />
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
}
