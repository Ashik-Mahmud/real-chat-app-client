import axios from "axios";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import GlobalLoading from "../../../components/GlobalLoading";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import SingleMessage from "./SingleMessage";

type Props = {};
const MessageBody = (props: Props) => {
  const { selectedChat, user, setSentMsgRefetch } = useAppContext();

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

  const messageBodyRef = useRef(null);
  /* make scroll to bottom */
  useEffect(() => {
    (messageBodyRef as any).current.scrollTop = (
      messageBodyRef as any
    ).current.scrollHeight;
    setSentMsgRefetch({
      refetch: refetch,
    });
  }, [messageList, refetch, setSentMsgRefetch]);

  return (
    <div
      className="message-body h-[60vh] sm:h-[40rem] overflow-y-auto p-3 md:p-10"
      ref={messageBodyRef}
    >
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <>
          {messageList?.messages?.length > 0 ? (
            <>
              {messageList?.messages?.map((message: any) => (
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
  );
};

export default MessageBody;
