import { AiOutlineSend } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";

type Props = {};

const MessageFooter = (props: Props) => {
  return (
    <div className="">
      {/* send message input */}
      <div className="flex items-stretch justify-center p-3 bg-white border-t shadow-sm">
        <div className="additional flex items-center gap-3">
          <div className="emoji cursor-pointer">
            <BiSmile size={20} />
          </div>
          <div className="attachment cursor-pointer">
            <FiPaperclip size={20} />
          </div>
        </div>
        <div className="input w-full">
          <input
            type="text"
            className="w-full h-12 outline-none  px-4"
            placeholder="Type a message"
          />
        </div>
        <button className="flex items-center justify-center w-14 h-14 bg-gray-100 hover:bg-gray-200 transition-all">
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageFooter;
