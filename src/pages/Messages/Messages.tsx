import FriendsBar from "./FriendsBar/FriendsBar";
import MessageBody from "./MessageBody/MessageBody";
import MessageFooter from "./MessageBody/MessageFooter";
import MessageHeader from "./MessageHeader";

type Props = {};

const Messages = (props: Props) => {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="container mx-auto">
        <div className="message-container py-5 grid grid-cols-1 sm:grid-cols-3 items-stretch gap-2">
          <div className="friends-sidebar sm:col-span-1 bg-white">
            <FriendsBar />
          </div>
          <div className="message-content sm:col-span-2 ">
            <MessageHeader />
            <div className="message-body bg-gray-50">
              <MessageBody />
              <MessageFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
