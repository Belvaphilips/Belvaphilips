import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/helperFunctions";
import { PiCalendarDots } from "react-icons/pi";

const DeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  date: string;
  postId: string;
  postType: string;

  isDeleting: boolean;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  date,
  postId,
  postType,

  isDeleting,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:!max-w-[599px] !max-w-[333px] !rounded-none">
        <DialogHeader>
          <DialogTitle className="text-[26px] font-bold text-left">
            CONFIRM DELETE
          </DialogTitle>
          <div className="border-[0.5px] border-[#C9C9C9] !max-w-[503px] p-5 mt-4">
            <div>
              <span className="mr-2 flex items-center gap-1">
                <PiCalendarDots className="text-lg" />
                {formatDate(date)}
              </span>
            </div>
            <div className="mt-4 text-left">
              <h1 className="uppercase text-[22px] font-semibold leading-[-1px] text-[#1D1D1B]">
                {title}
              </h1>
            </div>
          </div>
        </DialogHeader>

        <div className="flex justify-start items-center gap-3 mt-2">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-[123px] h-[32px] flex items-center justify-center bg-[#E72E2E] text-white rounded-full uppercase text-sm font-semibold cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete post"}
          </button>
          <button
            onClick={onClose}
            className="w-[86px] h-[32px] flex items-center justify-center border border-[#444444] rounded-full uppercase text-sm font-semibold cursor-pointer"
          >
            cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
