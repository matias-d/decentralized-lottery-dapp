import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Card from "./card";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DisclosureUI({ title, children, className }: Props) {
  return (
    <Card className={`p-4 ${className}`}>
      <Disclosure>
        <DisclosureButton className="group cursor-pointer text-sm w-full flex items-center justify-between">
          <p className="group-hover:text-accent transition-colors">{title}</p>
          <ChevronRight className="group-data-open:rotate-90 transition-all group-hover:text-accent" />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500 mt-4">
          {children}
        </DisclosurePanel>
      </Disclosure>
    </Card>
  );
}
