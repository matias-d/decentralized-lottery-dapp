import { cn } from "../../lib/cn";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

export default function Button({
  className,
  children,
  asChild,
  ...props
}: Props) {
  const Comp = asChild ? "span" : "button"; // contenedor para <Slot>
  return (
    <Comp
      className={cn(
        "bg-accent font-semibold disabled:bg-accent/80 disabled:cursor-default hover:scale-[0.99] duration-300 hover:bg-accent/80 ease-in-out transition-all cursor-pointer shadow shadow-accent/20 text-bg rounded-md w-full h-12 lg:h-14 text-lg flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
