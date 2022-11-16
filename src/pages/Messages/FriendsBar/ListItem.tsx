type Props = {
  user: any;
};

const ListItem = ({ user }: Props) => {
  return (
    <li className="bg-sky-50 cursor-pointer hover:bg-sky-200 transition-all w-full p-2 rounded-lg">
      <div className="flex items-center">
        <div className="avatar">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
            }
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover border-4"
          />
        </div>
        <div className="w-full ml-3">
          <div className="flex items-center gap-4 w-full">
            <h4 className="text-md text-gray-600 font-bold capitalize">
              {user?.name || "No Name"}
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
