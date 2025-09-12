import { cn } from "../../lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <article
      className={cn("shadow border-default  bg-card rounded-lg p-4", className)}
    >
      {children}
    </article>
  );
}
