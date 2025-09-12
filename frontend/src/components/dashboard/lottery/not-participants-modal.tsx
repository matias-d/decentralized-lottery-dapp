import Button from "../../ui/button";
import Modal from "../../ui/modal";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
}

export default function NotParticipantsModal({ isOpen, onOpen }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpen={onOpen}
      title="Insufficient Participants"
      description="The lottery requires a minimum of 2 participants. Invite your friends to play!"
    >
      <div className="flex gap-4 justify-end w-full">
        <Button
          onClick={onOpen}
          className="bg-card hover:bg-bg/30 font-normal disabled:bg-card transition-colors cursor-pointer px-4 rounded-md lg:h-12 w-auto text-lg shadow-none text-white"
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
}
