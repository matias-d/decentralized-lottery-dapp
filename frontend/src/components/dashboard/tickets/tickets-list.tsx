import type { Ticket } from "../../../interfaces/Lottery";
import Card from "../../ui/card";

export default function TicketsList({ tickets }: { tickets: Ticket[] }) {
  return (
    <section className="flex flex-wrap items-center gap-2 mb-4">
      {tickets.map((ticket) => (
        <Card key={ticket.ticketCode} className="group p-3">
          <h3 className="text-text text-xs">
            <span className="text-[10px] text-text/80">Ticket ID:</span>{" "}
            {ticket.tokenId}
          </h3>
          <p className="text-accent/70 text-sm group-hover:text-accent transition-all group-hover:font-medium">
            C. #{ticket.ticketCode}
          </p>
        </Card>
      ))}
    </section>
  );
}
