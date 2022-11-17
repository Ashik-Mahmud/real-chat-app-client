import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiArrowBack, BiBlock, BiUser } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { HiOutlineUserRemove } from "react-icons/hi";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
  setIsShowChatList: (value: boolean) => void;
};

const MessageHeader = ({ setIsShowChatList }: Props) => {
  const [isMenuShow, setIsMenuShow] = useState(false);

  const { selectedChat } = useAppContext();
  console.log(selectedChat);

  return (
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
            <img
              src={
                selectedChat?.receiver?.avatar
                  ? selectedChat?.receiver?.avatar
                  : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              }
              alt={selectedChat?.receiver?.name}
              className="w-12 h-12 rounded-full object-cover border-4"
            />
          </div>
          <div className="ml-3">
            <h4 className="text-xl font-bold">
              {selectedChat?.receiver?.name}
            </h4>
            <p className="text-sm text-gray-500">Active 1h ago</p>
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
            <ul className=" ">
              <li className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer">
                <BiUser /> <p className="text-sm">View Profile</p>
              </li>
              <li className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer">
                <BiBlock /> <p className="text-sm">Block</p>
              </li>
              <li className="hover:bg-gray-100 flex items-center gap-2 transition-all p-2 rounded-lg cursor-pointer">
                <HiOutlineUserRemove />
                <p className="text-sm">Remove</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHeader;
