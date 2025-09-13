import TicketsList from "../../components/dashboard/tickets/tickets-list";
import FormTicket from "../../components/dashboard/tickets/form-ticket";
import LoadingUI from "../../components/ui/loading-ui";
import Title from "../../components/ui/title";
import Card from "../../components/ui/card";

import { EqualApproximately, Ticket } from "lucide-react";
import { useLottery } from "../../hooks/useLottery";
import HistoryTickets from "../../components/dashboard/tickets/history-tickets";

export default function Tickets() {
  const { account, loading } = useLottery();

  if (loading) return <LoadingUI title="Loading lottery data..." />;
  return (
    <section className="space-y-xs">
      <div className="w-full flex items-center justify-between">
        <Title title="Tickets" />
        <div className="flex items-center gap-x-3">
          <p className="text-xs text-text">price:</p>
          <Card className="p-2">
            <p className="flex lg:text-base text-sm items-center gap-x-2 ">
              <span className="text-yellow-200">5 LT</span>{" "}
              <EqualApproximately />{" "}
              <span className="text-blue-200">1 LTK</span>
            </p>
          </Card>
        </div>
      </div>

      <section>
        <Card className="mb-2">
          <h3 className="text-text text-sm">Your tickets</h3>
          <div className="flex w-full items-center justify-between">
            <p className="text-3xl lg:text-4xl font-bold text-accent">
              {account?.tickets.length || "0"} LTK
            </p>
            <Ticket size={40} className="text-accent rotate-90" />
          </div>
        </Card>
        <TicketsList tickets={account?.tickets || []} />
        <HistoryTickets />

        <hr className="w-full border-default my-4" />

        <div className="w-full space-y-xs">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-sm text-text">Buy tickets</h3>
            <p className="text-yellow-200 px-2  bg-yellow-300/10 rounded-sm border border-yellow-200/30">
              {account?.tokenBalance} LT
            </p>
          </div>

          <FormTicket />
        </div>
      </section>
    </section>
  );
}
