import { Dot } from "lucide-react";
import { cn } from "../../lib/cn";

interface Props {
  className?: string;
  title: string;
}

export default function Title({ className, title }: Props) {
  return (
    <h2
      className={cn(
        "text-text/80 uppercase text-xs font-medium flex items-center",
        className
      )}
    >
      <Dot />
      {title}
    </h2>
  );
}
