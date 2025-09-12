import { useLottery } from "../../../hooks/useLottery";
import DisclosureUI from "../../ui/disclousure-ui";
import TicketsList from "../tickets/tickets-list";

export default function TicketsDisclosure() {
  const { account } = useLottery();

  return (
    <DisclosureUI title="Your tickets">
      {account?.tickets && account?.tickets.length > 0 ? (
        <TicketsList tickets={account?.tickets || []} />
      ) : (
        <p className="text-text">You don't have any tickets.</p>
      )}
    </DisclosureUI>
  );
}
