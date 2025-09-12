import type { Round } from "../../../interfaces/Lottery";
import RoundCard from "./round-card";

interface Props {
  rounds: Round[];
}

export default function RoundsList({ rounds }: Props) {
  return (
    <section className="grid grid-cols-1 gap-2">
      {rounds.map((round) => (
        <RoundCard key={round.timestamp} card={round} />
      ))}
    </section>
  );
}
