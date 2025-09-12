import { cn } from "../../lib/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      required={true}
      className={cn(
        "border-default rounded-sm p-4 text-2xl bg-card w-full text-accent outline-none focus:border-accent focus:border-2",
        className
      )}
    />
  );
}
