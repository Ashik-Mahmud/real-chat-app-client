import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import swal from "sweetalert";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {
  user: any;
  refetch: () => void;
  setShowAllFriends: (value: boolean) => void;
};

const FriendItem = ({ user, refetch, setShowAllFriends }: Props) => {
  const { refetchFunc, user: cookieUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  /* handle add to chat */
  const handleAddToChat = async (id: string) => {
    const isConfirm = await swal("Are you sure you want add this?", {
      buttons: ["Oh noez!", true],
    });

    if (isConfirm) {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server_url}/chat/create`,
        { receiverId: id },
        {
          headers: {
            authorization: `Bearer ${cookieUser?.token}`,
          },
        }
      );
      if (data?.success) {
        refetch();
        setIsLoading(false);
        refetchFunc.chatRefetch();
        setShowAllFriends(false);
      }
    }
  };

  return (
    <div className="friend w-full flex flex-col sm:flex-row h-auto sm:items-center justify-between cursor-pointer transition-all hover:bg-slate-200 bg-slate-100 font-montserrat p-3 rounded-lg gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="friend-image w-14 h-14 rounded-full border-4 border-blue-500 overflow-hidden">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-blue-500">
              {user?.name?.charAt(0)}
            </div>
          )}
        </div>
        <div className="friend-info">
          <h4 className="friend-name text-xl font-bold">{user?.name}</h4>
          <p className="friend-status">{user?.email}</p>
        </div>
      </div>
      <div className="add-friend">
        {isLoading ? (
          <button className="flex items-center gap-2 cursor-not-allowed bg-blue-500 text-blue-100 text-sm p-2 px-4 rounded-ful">
            <AiOutlineLoading3Quarters className="animate-spin" /> Adding...
          </button>
        ) : (
          <button
            onClick={() => handleAddToChat(user?._id)}
            className="flex items-center gap-2 bg-blue-500 text-blue-100 text-sm p-2 px-4 rounded-full"
          >
            <span className="sm:block">Add to chat</span>
            <BsPlus size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendItem;
