import useIsOwner from "../../../hooks/useIsOwner";
import WinnerModal from "./winner-modal";
import Button from "../../ui/button";
import { useState } from "react";
import { useLottery } from "../../../hooks/useLottery";
import NotParticipantsModal from "./not-participants-modal";

export default function GenerateWinnerButton() {
  const { lotteryData } = useLottery();
  const { isOwner } = useIsOwner();

  const { totalParticipants } = lotteryData;

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  if (!isOwner) return null;

  return (
    <>
      <Button onClick={onOpen}>Generate Winner!</Button>
      {totalParticipants > 1 ? (
        <WinnerModal isOpen={open} onOpen={onOpen} />
      ) : (
        <NotParticipantsModal isOpen={open} onOpen={onOpen} />
      )}
    </>
  );
}
