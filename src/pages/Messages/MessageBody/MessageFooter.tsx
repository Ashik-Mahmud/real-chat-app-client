import axios from "axios";
import cogoToast from "cogo-toast";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiSmile, BiX } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {};

const MessageFooter = (props: Props) => {
  const { selectedChat, user, refetchFunc, userInfo, socket, setIsTyping } =
    useAppContext();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  /* handle send Message */
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!message) return cogoToast.error(`Write message`);
    setIsTyping("");
    setIsLoading(true);
    const messageContent = {
      chatId: selectedChat?._id,
      message: message,
    };
    const { data } = await axios.post(
      `${server_url}/chat/message`,
      messageContent,
      {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );

    socket.emit("new_message", data?.sentMessage);
    if (data?.success) {
      refetchFunc.msgRefetch();
      refetchFunc.chatRefetch();
      setMessage("");
      setIsLoading(false);
    }
  };

  /* handle typing */
  const handleTyping = () => {
    socket.emit("typing", selectedChat?._id);
  };

  /* handle emoji pick */
  const handleEmojiPick = (e: any, emojiObject: any) => {
    setMessage(message + e.emoji);
  };

  return (
    <div className="">
      {/* send message input */}
      <form
        onSubmit={handleSendMessage}
        className={`flex items-stretch justify-center p-3 bg-white border-t shadow-sm relative w-full ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        <div
          className={`absolute left-0 w-full transition-all ${
            isEmojiPickerOpen
              ? "opacity-100 pointer-events-auto -top-[25rem]"
              : "opacity-0 pointer-events-none -top-[22rem]"
          }`}
        >
          <EmojiPicker
            height={400}
            width={"100%"}
            onEmojiClick={handleEmojiPick}
          />
        </div>
        {userInfo?.blockedBy?.includes(selectedChat?.receiver?._id) ? (
          <div className="flex items-center justify-center w-full py-3">
            <h1 className="text-red-500">You have been blocked by this user</h1>
          </div>
        ) : (
          <>
            {selectedChat?.receiver?.blockedBy?.includes(user?._id) ? (
              <div className="flex items-center justify-center w-full py-3">
                <h1 className="text-red-500">
                  {selectedChat?.receiver?.name} has blocked you
                </h1>
              </div>
            ) : (
              <>
                <div className="additional flex items-center gap-3 relative">
                  <div
                    className="emoji cursor-pointer select-none"
                    onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                  >
                    {isEmojiPickerOpen ? (
                      <BiX className="text-2xl" />
                    ) : (
                      <BiSmile className="text-2xl" />
                    )}
                  </div>
                  <div className="attachment cursor-not-allowed opacity-75">
                    <FiPaperclip size={20} />
                  </div>
                </div>
                <div className="input w-full">
                  <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    onInput={handleTyping}
                    className={`w-full h-12 outline-none  px-4 ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isLoading}
                    placeholder="Type a message"
                  />
                </div>
                {isLoading ? (
                  <button
                    disabled
                    className="flex cursor-not-allowed  items-center justify-center w-14 h-14 bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <div className="animate-spin ease-linear rounded-full border-4 border-t-4 border-t-blue-400 border-gray-400 h-5 w-5"></div>
                  </button>
                ) : (
                  <button className="flex items-center justify-center w-14 h-14 bg-gray-100 hover:bg-gray-200 transition-all">
                    <AiOutlineSend size={20} />
                  </button>
                )}
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default MessageFooter;
