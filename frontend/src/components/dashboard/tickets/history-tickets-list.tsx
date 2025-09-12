import type { UserTicket } from "../../../interfaces/Lottery";
import Card from "../../ui/card";

interface Props {
  historyTickets: { round: number; tickets: UserTicket[] }[];
}

export default function HistoryTicketsList({ historyTickets }: Props) {
  return (
    <section className="flex flex-col gap-2 ">
      {historyTickets.map((round) => (
        <div key={round.round} className="flex items-center gap-2 flex-wrap">
          <Card className="gradient-accent size-16 flex items-center justify-center">
            <p className="text-accent-dark font-bold text-xl">#{round.round}</p>
          </Card>
          {round.tickets.map((ticket) => (
            <Card key={ticket.ticketCode} className="group p-3">
              <h3 className="text-text text-xs">
                <span className="text-[10px] text-text/80">Ticket ID:</span>{" "}
                {ticket.ticketId}
              </h3>
              <p className="text-accent/70 text-sm group-hover:text-accent transition-all group-hover:font-medium">
                C. #{ticket.ticketCode}
              </p>
            </Card>
          ))}
        </div>
      ))}
    </section>
  );
}
