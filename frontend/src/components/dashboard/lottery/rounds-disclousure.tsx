import { useLottery } from "../../../hooks/useLottery";
import DisclosureUI from "../../ui/disclousure-ui";
import RoundsList from "./rounds-list";

export default function RoundsDisclousure() {
  const { lotteryData } = useLottery();
  const { rounds } = lotteryData;

  return (
    <DisclosureUI title="Round history" className="mb-4">
      {rounds.length > 0 ? (
        <div className="space-y-1">
          <div className="flex items-center gap-x-12">
            <h3 className="text-text/40 text-xs pl-2">Round</h3>
            <h3 className="text-text/40 text-xs">Detail</h3>
          </div>
          <RoundsList rounds={rounds} />
        </div>
      ) : (
        <p className="text-text">There has not been a round yet.</p>
      )}
    </DisclosureUI>
  );
}
