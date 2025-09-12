import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import Card from "./card";

interface Props {
  className?: string;
  title: string;
}

export default function LoadingUI({ className, title }: Props) {
  return (
    <Card>
      <section
        className={cn(
          "w-full flex items-center justify-center flex-col gap-y-2",
          className
        )}
      >
        <LoaderCircle className="animate-spin text-text" size={26} />
        <h2 className="text-text ">{title}</h2>
      </section>
    </Card>
  );
}
