import { formatDistance } from "date-fns";
import { useAppContext } from "../../../Context/AppProvider";

type Props = {
  user: any;
};

const ListItem = ({ user: chat }: Props) => {
  const { setSelectedChat, user, selectedChat } = useAppContext();

  const lastActive = formatDistance(
    new Date(),
    new Date(!chat?.isGroup && chat?.receiver?.updatedAt),
    { includeSeconds: true }
  );

  return (
    <li
      onClick={() => setSelectedChat(chat)}
      className={` cursor-pointer hover:bg-sky-200 transition-all w-full p-2 rounded-lg ${
        !chat?.isGroup && chat.receiver?._id === selectedChat?.receiver?._id
          ? "bg-sky-200"
          : "bg-sky-50"
      }`}
    >
      <div className="flex items-center ">
        <div className="avatar w-12 h-12 rounded-full border-4 overflow-hidden">
          {chat?.isGroup ? (
            <>
              <div className="text-2xl grid place-items-center font-bold bg-gray-50 text-gray-500 h-full w-full">
                {chat?.groupName?.split(" ").map((l: string) => l.at(0))}
              </div>
            </>
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
        <div className=" ml-2 relative">
          <div className="flex items-center gap-2 w-full ">
            <h4 className="text-md text-gray-600 font-bold capitalize flex items-center gap-2">
              {chat?.isGroup ? chat?.groupName : chat?.receiver?.name}
              {chat?.isGroup && (
                <span
                  className="text-xs font-bold cursor-pointer text-gray-500 grid place-items-center bg-gray-100 w-4 h-4 rounded-full"
                  title="Group"
                >
                  G
                </span>
              )}
            </h4>
            {!chat?.isGroup && (
              <>
                {chat?.receiver?.isOnline ? (
                  <p className="text-xs w-2 h-2 rounded-full bg-green-500"></p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Active {lastActive} ago
                  </p>
                )}
              </>
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
              ) : !chat?.isGroup ? (
                chat?.receiver?.email
              ) : chat?.lastMessage?.msg ? (
                chat?.lastMessage?.msg?.slice(0, 35) + "..."
              ) : (
                "not available"
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
