import { useAppContext } from "../../../Context/AppProvider";

type Props = {
  user: any;
};

const ListItem = ({ user }: Props) => {
  const { setSelectedChat } = useAppContext();

  return (
    <li
      onClick={() => setSelectedChat(user)}
      className="bg-sky-50 cursor-pointer hover:bg-sky-200 transition-all w-full p-2 rounded-lg"
    >
      <div className="flex items-center">
        <div className="avatar w-14 h-14 rounded-full border-4 overflow-hidden">
          {user?.isGroup ? (
            <img
              src={
                user?.groupImage
                  ? user?.groupImage
                  : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              }
              alt={user?.groupName}
              className="w-full h-full object-cover "
            />
          ) : (
            <img
              src={
                user?.receiver?.avatar
                  ? user?.receiver?.avatar
                  : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              }
              alt={user?.receiver?.name}
              className="object-cover w-full h-full rounded-full"
            />
          )}
        </div>
        <div className="w-full ml-3">
          <div className="flex items-center gap-4 w-full">
            <h4 className="text-md text-gray-600 font-bold capitalize">
              {user?.isGroup ? user?.groupName : user?.receiver?.name}
            </h4>
            <p className="text-xs text-gray-500">Active 1h ago</p>
          </div>
          <div className="lastMessage text-sm">
            <p className="text-xs text-gray-500">
              <b>Ashik Mahmud</b> : Hey where are you now?
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
