import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import Card from "./card";

interface Props {
  description: string;
  onOpen: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onOpen,
  description,
  title,
  children,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onOpen} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
        <Transition appear={true} show={isOpen}>
          <DialogPanel className="transition duration-200 data-closed:translate-y-1  ease-in-out data-closed:opacity-0">
            <Card className="max-w-lg border p-12  ">
              <DialogTitle className="font-bold mb-4">{title}</DialogTitle>
              <Description className="text-text mb-6">
                {description}
              </Description>

              {/* Content dinamic */}
              {children}
            </Card>
          </DialogPanel>
        </Transition>
      </div>
    </Dialog>
  );
}
