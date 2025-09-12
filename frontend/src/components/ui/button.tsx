import { cn } from "../../lib/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        "bg-accent disabled:bg-accent/80 disabled:cursor-default hover:scale-[0.99] duration-300 hover:bg-accent/80 ease-in-out transition-all cursor-pointer shadow shadow-accent/20 text-bg  rounded-md w-full h-12 lg:h-14 text-lg font-medium ",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
