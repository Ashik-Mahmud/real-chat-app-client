import axios from "axios";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  BiArrowBack,
  BiBlock,
  BiLogOut,
  BiTrash,
  BiUser,
} from "react-icons/bi";
import { FaEllipsisV, FaUsers } from "react-icons/fa";
import { HiOutlineUserRemove } from "react-icons/hi";
import swal from "sweetalert";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
  setIsShowChatList: (value: boolean) => void;
  setIsShowProfileModal: (value: boolean) => void;
};

const MessageHeader = ({ setIsShowChatList, setIsShowProfileModal }: Props) => {
  const [isMenuShow, setIsMenuShow] = useState(false);

  const {
    selectedChat,
    user,
    refetchFunc,
    setSelectedChat,
    userInfo,
    userInfoRefetch,
  } = useAppContext();

  /* handle remove chat */
  const removeFriendAndChatList = async (id: string) => {
    const isConfirm = await swal("Are you sure you want to do this?", {
      buttons: ["Oh noez!", "Aww yiss!"],
    });

    if (isConfirm) {
      const againConfirm = await swal({
        title: "Hey Look?",
        text: "Once deleted, you will lost your messages, friends and all history, then you ready? It's not recommended whatever ☹",
        icon: "warning",
        buttons: ["Cancel", "Okay, delete it"],
        dangerMode: true,
      });

      if (againConfirm) {
        console.log(id);

        await axios.delete(`${server_url}/chat/delete/${selectedChat?._id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        refetchFunc.msgRefetch();
        refetchFunc.chatRefetch();
        setSelectedChat({});
        swal("Poof! Your friendship has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    }
  };

  /* handle block/unblock user */
  const handleBlockUser = async (id: string, permission: boolean) => {
    const isConfirm = await swal("Are you sure you want to do this?", {
      buttons: ["Oh noez!", "Aww yiss!"],
    });

    if (isConfirm) {
      const { data } = await axios.get(
        `${server_url}/user/block/${id}?block=${permission}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (data?.success) {
        swal("Poof! User has been blocked!", {
          icon: "success",
        });
        refetchFunc.msgRefetch();
        refetchFunc.chatRefetch();
        userInfoRefetch();
      }
    }
  };

  /* handle leave group */
  const handleLeaveGroup = async () => {
    console.log(user?._id);
    const isConfirm = await swal({
      text: "are you want leave this group?",
      buttons: ["Oh noez!", "Aww yiss!"],
    });

    if (isConfirm) {
      const { data } = await axios.get(
        `${server_url}/chat/group/leave-group/${selectedChat?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (data?.success) {
        swal("Poof! You have been leave this group!", {
          icon: "success",
        });
        refetchFunc.msgRefetch();
        refetchFunc.chatRefetch();
        setSelectedChat({});
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 border shadow">
        <div className="flex items-center gap-3">
          <span
            onClick={() => setIsShowChatList(true)}
            className="cursor-pointer block md:hidden"
          >
            <BiArrowBack size={20} />
          </span>
          <div className="flex items-center">
            <div className="avatar">
              {selectedChat?.isGroup ? (
                <div
                  title={selectedChat?.groupName}
                  className="text-3xl w-12 h-12 rounded-full bg-gray-100 grid place-items-center font-bold"
                >
                  {selectedChat?.groupName
                    ?.split(" ")
                    .map((l: string) => l.at(0))}
                </div>
              ) : (
                <img
                  src={
                    selectedChat?.receiver?.avatar
                      ? selectedChat?.receiver?.avatar
                      : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
                  }
                  alt={selectedChat?.receiver?.name}
                  className="w-12 h-12 rounded-full object-cover border-4"
                />
              )}
            </div>
            <div className="ml-3">
              <h4 className="text-xl font-bold">
                {selectedChat?.isGroup
                  ? selectedChat?.groupName
                  : selectedChat?.receiver?.name}
              </h4>
              {selectedChat?.isGroup ? (
                <p className="text-sm text-gray-500">Group chat</p>
              ) : (
                <>
                  {selectedChat?.receiver?.isOnline ? (
                    <p className="text-sm text-green-500">Active</p>
                  ) : (
                    <p className="text-sm text-gray-500">Inactive</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <button className="" onClick={() => setIsMenuShow((state) => !state)}>
            {isMenuShow ? (
              <AiOutlineCloseCircle size={20} />
            ) : (
              <FaEllipsisV size={20} />
            )}
          </button>
          {isMenuShow && (
            <div className="menus border bg-white p-3   rounded-lg shadow-lg absolute -left-40 top-5 w-40">
              {!selectedChat?.isGroup && (
                <ul className=" ">
                  <li
                    onClick={() => setIsShowProfileModal(true)}
                    className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                  >
                    <BiUser /> <p className="text-sm">View Profile</p>
                  </li>
                  {userInfo?.blockedBy?.includes(
                    selectedChat?.receiver?._id
                  ) ? (
                    <li
                      onClick={() =>
                        handleBlockUser(selectedChat?.receiver?._id, false)
                      }
                      className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <BiUser /> <p className="text-sm">Unblock User</p>
                    </li>
                  ) : (
                    <li
                      onClick={() =>
                        handleBlockUser(selectedChat?.receiver?._id, true)
                      }
                      className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <BiBlock /> <p className="text-sm">Block</p>
                    </li>
                  )}

                  <li
                    onClick={() => removeFriendAndChatList(selectedChat?._id)}
                    className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                  >
                    <HiOutlineUserRemove />
                    <p className="text-sm">Remove</p>
                  </li>
                </ul>
              )}

              {selectedChat?.isGroup && (
                <>
                  <ul>
                    <li
                      onClick={() => setIsShowProfileModal(true)}
                      className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <FaUsers /> <p className="text-sm">View Group</p>
                    </li>
                    <li
                      onClick={handleLeaveGroup}
                      className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer"
                    >
                      <BiLogOut /> <p className="text-sm">Leave group</p>
                    </li>
                    {selectedChat?.creator === user?._id && (
                      <li className="hover:bg-gray-100 flex items-center gap-2 text-red-400 transition-all p-2 rounded-lg cursor-pointer">
                        <BiTrash /> <p className="text-sm">delete group</p>
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageHeader;
