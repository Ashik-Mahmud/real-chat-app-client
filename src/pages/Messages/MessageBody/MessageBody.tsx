import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ScrollToBottom from "react-scroll-to-bottom";
import PulseLoader from "react-spinners/PulseLoader";
import GlobalLoading from "../../../components/GlobalLoading";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import SingleMessage from "./SingleMessage";

type Props = {};
const MessageBody = (props: Props) => {
  const { selectedChat, user, setRefetchFunc, socket, setNotificationList } =
    useAppContext();

  const [allMessages, setAllMessage] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);

  const {
    data: messageList,
    isLoading,
    refetch,
  } = useQuery(["MessageList", selectedChat], async () => {
    if (user?.token) {
      const { data } = await axios.get(
        `${server_url}/chat/${selectedChat?._id}`,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data;
    }
  });

  /* make scroll to bottom */
  useEffect(() => {
    setRefetchFunc((prev: any) => {
      return {
        ...prev,
        msgRefetch: refetch,
      };
    });
  }, [messageList, refetch, setRefetchFunc]);

  /* after fetching data we store here */
  useEffect(() => {
    setAllMessage(messageList?.messages);
  }, [messageList]);

  /* joining to the selected user to the room in socket.io */
  useEffect(() => {
    socket.emit("join_chat", selectedChat?._id);
  }, [socket, selectedChat]);

  /* for received message to the backend */
  useEffect(() => {
    let compareSelectedChat = selectedChat;
    socket.on("message_received", (message: any) => {
      if (
        !compareSelectedChat ||
        compareSelectedChat?._id !== message?.chat?._id
      ) {
        console.log("give notification");
        setNotificationList((prev: any) => [...prev, message]);
      } else {
        setAllMessage((prev: any) => [...prev, message]);
      }
    });

    socket.on("typing", (data: any) => {
      if (data?.chatId) {
        setIsTyping(true);
      }
    });

    return () => {
      socket.off("message_received");
      socket.off("typing");
      setAllMessage([]);
      setIsTyping(false);
    };
  }, [socket, selectedChat, setNotificationList]);

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  }, [isTyping]);

  return (
    <ScrollToBottom className="message-body h-[60vh] sm:h-[40rem] overflow-y-auto p-2">
      <div className="p-5 md:p-8 z-0">
        {isLoading ? (
          <GlobalLoading />
        ) : (
          <>
            {allMessages?.length > 0 ? (
              <>
                {allMessages?.map((message: any) => (
                  <SingleMessage
                    key={message?._id}
                    message={message?.message}
                    me={message?.sender?._id === user?._id}
                    data={message}
                    refetch={refetch}
                  />
                ))}
                {isTyping && (
                  <div>
                    <div
                      className={`single-message   font-montserrat group flex  gap-2 mb-2`}
                    >
                      <div className="avatar cursor-pointer">
                        <img
                          src={
                            "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
                          }
                          alt={"Someone"}
                          className="w-7 h-7 rounded-full object-cover border-4 border-slate-200"
                        />
                      </div>

                      <div
                        className={`message-content flex items-center gap-2`}
                      >
                        <p
                          className={`rounded-lg leading-6  font-poppins text-sm  p-2 px-3 bg-blue-100 text-blue-800`}
                        >
                          <PulseLoader size={8} color="#5198f0" />
                        </p>
                        <small className="text-xs text-slate-500">
                          {new Date().toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>No Message Found.</div>
            )}
          </>
        )}
      </div>
    </ScrollToBottom>
  );
};

export default MessageBody;
