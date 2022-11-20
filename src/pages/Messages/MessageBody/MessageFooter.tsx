import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {};

const MessageFooter = (props: Props) => {
  const { selectedChat, user, refetchFunc, userInfo, socket, setIsTyping } =
    useAppContext();
  const [message, setMessage] = useState("");

  /* handle send Message */
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!message) return cogoToast.error(`Write message`);
    setIsTyping("");
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
    }
  };

  /* handle typing */
  const handleTyping = () => {
    socket.emit("typing", selectedChat?._id);
  };

  return (
    <div className="">
      {/* send message input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-stretch justify-center p-3 bg-white border-t shadow-sm"
      >
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
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    onInput={handleTyping}
                    className="w-full h-12 outline-none  px-4"
                    placeholder="Type a message"
                  />
                </div>
                <button className="flex items-center justify-center w-14 h-14 bg-gray-100 hover:bg-gray-200 transition-all">
                  <AiOutlineSend size={20} />
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default MessageFooter;
