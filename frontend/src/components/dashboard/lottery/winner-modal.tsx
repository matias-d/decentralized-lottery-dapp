import { useLottery } from "../../../hooks/useLottery";
import { LoaderCircle } from "lucide-react";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
}

export default function WinnerModal({ isOpen, onOpen }: Props) {
  const { generateWinner } = useLottery();
  const [loadWinner, setLoadWinner] = useState(false);

  const onGenerate = async () => {
    setLoadWinner(true);
    await generateWinner();
    setLoadWinner(false);
    onOpen();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpen={onOpen}
      title="Confirm Winner Generation"
      description="You are about to select the winner for the current lottery
                round. This action cannot be undone."
    >
      <div className="flex gap-4 justify-between w-full">
        <Button
          disabled={loadWinner}
          onClick={onOpen}
          className="bg-card hover:bg-bg/30 font-normal disabled:bg-card transition-colors cursor-pointer px-4 rounded-md lg:h-12 w-auto text-lg shadow-none text-white"
        >
          Cancel
        </Button>
        <Button
          disabled={loadWinner}
          className="lg:h-12   w-28 flex items-center justify-center"
          onClick={onGenerate}
        >
          {loadWinner ? <LoaderCircle className="animate-spin" /> : "Generate"}
        </Button>
      </div>
    </Modal>
  );
}
