import { formatDistance } from "date-fns";
import { useAppContext } from "../../../Context/AppProvider";

type Props = {
  user: any;
};

const ListItem = ({ user: chat }: Props) => {
  const { setSelectedChat, user, selectedChat } = useAppContext();

  const lastActive = formatDistance(
    new Date(),
    new Date(chat?.receiver?.updatedAt),
    { includeSeconds: true }
  );

  return (
    <li
      onClick={() => setSelectedChat(chat)}
      className={` cursor-pointer hover:bg-sky-200 transition-all w-full p-2 rounded-lg ${
        chat.receiver?._id === selectedChat?.receiver?._id
          ? "bg-sky-200"
          : "bg-sky-50"
      }`}
    >
      <div className="flex items-center">
        <div className="avatar w-14 h-14 rounded-full border-4 overflow-hidden">
          {chat?.isGroup ? (
            <img
              src={
                chat?.groupImage
                  ? chat?.groupImage
                  : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              }
              alt={chat?.groupName}
              className="w-full h-full object-cover "
            />
          ) : (
            <img
              src={
                chat?.receiver?.avatar
                  ? chat?.receiver?.avatar
                  : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              }
              alt={chat?.receiver?.name}
              className="object-cover w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="w-full ml-3">
          <div className="flex items-center gap-2 w-full">
            <h4 className="text-md text-gray-600 font-bold capitalize">
              {chat?.isGroup ? chat?.groupName : chat?.receiver?.name}
            </h4>
            {chat?.receiver?.isOnline ? (
              <p className="text-xs w-2 h-2 rounded-full bg-green-500"></p>
            ) : (
              <p className="text-xs text-gray-500">Active {lastActive} ago</p>
            )}
          </div>
          <div className="lastMessage text-sm">
            <p className="text-xs text-gray-500" title={chat?.lastMessage?.msg}>
              {chat?.lastMessage?.msg ? (
                <>
                  <b>
                    {chat?.lastMessage?.sender?._id === user?._id
                      ? "You"
                      : chat?.lastMessage?.sender?.name}
                  </b>
                  : {chat?.lastMessage?.msg?.slice(0, 35) + "..."}
                </>
              ) : (
                chat?.receiver?.email
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
