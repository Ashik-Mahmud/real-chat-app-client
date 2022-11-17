import axios from "axios";
import { useQuery } from "react-query";
import GlobalLoading from "../../../components/GlobalLoading";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import SingleMessage from "./SingleMessage";

type Props = {};
const MessageBody = (props: Props) => {
  const { selectedChat, user } = useAppContext();

  const { data: messageList, isLoading } = useQuery("MessageList", async () => {
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

  console.log(messageList);
  if (isLoading) return <GlobalLoading />;

  return (
    <div className="message-body h-[60vh] sm:h-[40rem] overflow-y-auto p-3 md:p-10">
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <>
          {messageList?.messages?.length > 0 ? (
            <>
              <SingleMessage message="Hey bro?" />
              <SingleMessage me={true} message="How are you doing?" />
              <SingleMessage
                me={true}
                message="Tailwind CSS is the only framework that I've seen scale"
              />
              <SingleMessage message="How can I help you bro? " />
              <SingleMessage
                me={true}
                message="do you have any number or somethings? I'm a full stack developer"
              />
              <SingleMessage message="yeah! I know you, you are so skill full " />
              <SingleMessage
                me={true}
                message="Are you a freelancer or a company?"
              />
              <SingleMessage message="Not exactly!! but i have many resource for place people. If you are interest to place somewhere. you can knock me for that. I help you my best. " />
              <SingleMessage
                me={true}
                message="Are you a freelancer or a company?"
              />
              <SingleMessage message="How can I help you bro? " />
              <SingleMessage message="Hey bro?" />
              <SingleMessage message="Are you there bro?" />
              <SingleMessage
                me={true}
                message="hah bro! I lost my internet connection"
              />
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
