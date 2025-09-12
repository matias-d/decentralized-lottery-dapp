import HistoryTicketsList from "./history-tickets-list";
import { useLottery } from "../../../hooks/useLottery";
import DisclosureUI from "../../ui/disclousure-ui";

export default function HistoryTickets() {
  const { account } = useLottery();

  return (
    <DisclosureUI title="History tickets">
      <section className="flex flex-col gap-2">
        {account?.historyTickets && account.historyTickets.length ? (
          <>
            <div className="flex items-center gap-x-10">
              <h3 className="text-text/40 text-xs pl-2">Round</h3>
              <h3 className="text-text/40 text-xs">Tickets</h3>
            </div>
            <HistoryTicketsList historyTickets={account.historyTickets} />
          </>
        ) : (
          <p className="text-text">You do not have a ticket history.</p>
        )}
      </section>
    </DisclosureUI>
  );
}
