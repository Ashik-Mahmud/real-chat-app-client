import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ScrollToBottom from "react-scroll-to-bottom";
import GlobalLoading from "../../../components/GlobalLoading";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import SingleMessage from "./SingleMessage";

type Props = {};
const MessageBody = (props: Props) => {
  const { selectedChat, user, setRefetchFunc, socket } = useAppContext();

  const [allMessages, setAllMessage] = useState<any>([]);

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
      } else {
        setAllMessage((prev: any) => [...prev, message]);
      }
    });

    return () => {
      setAllMessage([]);
    };
  }, [socket, selectedChat]);

  return (
    <ScrollToBottom className="message-body h-[60vh] sm:h-[40rem] overflow-y-auto p-2">
      <div className="p-5 md:p-8">
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
