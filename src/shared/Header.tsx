import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import { useAppContext } from "../Context/AppProvider";
import ProfileCard from "./ProfileCard";
type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
};

const Header = ({ setIsShowProfile, isShowProfile }: Props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { userInfo, notificationList, setSelectedChat, setNotificationList } =
    useAppContext();

  /* handle notification click */
  const handleNotificationClick = (item: any) => {
    setSelectedChat(item?.chat);
    setNotificationList(
      notificationList.filter(
        (notification: any) => notification._id !== item._id
      )
    );
  };

  return (
    <div>
      <ProfileCard
        setIsShowProfile={setIsShowProfile}
        isShowProfile={isShowProfile}
      />
      <div className="flex items-center justify-between bg-white mb-3 p-2 px-8 relative">
        <div className="flex items-center gap-2">
          <BsChatSquareDots size={30} /> Real Chat.
        </div>
        <div className="flex items-center gap-5">
          <div className="notification relative">
            <div
              className="notification-icon cursor-pointer relative"
              onClick={() => setShowNotifications((state) => !state)}
            >
              <AiOutlineBell size={30} />
              {notificationList?.length > 0 && (
                <div className="dot absolute w-5 h-5 text-xs rounded-full grid place-items-center bg-blue-500 text-blue-100 -top-1 -right-1">
                  {notificationList?.length}
                </div>
              )}
            </div>
            {showNotifications && (
              <div className="absolute right-0 top-10 bg-white w-48 rounded-lg shadow-lg p-3 flex flex-col gap-2 border sm:w-[15rem]">
                {notificationList?.length > 0 ? (
                  notificationList?.map((item: any) => {
                    return (
                      <div
                        onClick={() => handleNotificationClick(item)}
                        key={item?._id}
                        className="flex items-center gap-2  shadow hover:bg-slate-100 p-2 rounded-lg cursor-pointer"
                      >
                        {item?.chat?.isGroup ? (
                          <div className="w-8 h-8 rounded-full grid place-items-center border">
                            {item?.chat?.groupName
                              ?.split(" ")
                              .map((item: any) => item.at(0))}
                          </div>
                        ) : (
                          <img
                            src={
                              item?.sender?.avatar
                                ? item?.sender?.avatar
                                : "https://i.pravatar.cc/150?img=1"
                            }
                            alt={item?.sender?.name}
                            className="rounded-full w-8 h-8 object-cover"
                          />
                        )}

                        <div className="flex items-start flex-col">
                          <span className="text-sky-500 font-bold">
                            {item?.chat?.isGroup
                              ? item?.chat?.groupName
                              : item?.sender?.name}
                          </span>
                          <span className="text-gray-500 flex items-center text-xs  gap-1">
                            {item?.chat?.isGroup && <b>someone: </b>}{" "}
                            {item?.message}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-500 py-6">
                    No Notification
                  </div>
                )}
              </div>
            )}
          </div>
          {/* notification end */}
          <div className="relative">
            <div
              onClick={() => setIsShowProfile(true)}
              className="flex cursor-pointer items-center gap-2 bg-gray-50 p-2 rounded-lg"
            >
              <div className="bg-sky-100 text-sky-500 p-2 rounded-lg">
                <img
                  src={
                    userInfo?.avatar
                      ? userInfo?.avatar
                      : "https://i.pravatar.cc/150?img=1"
                  }
                  alt={userInfo?.name}
                  className="rounded-full w-8 h-8 object-cover"
                />
              </div>
              <div className="flex items-start flex-col cursor-pointer">
                <span className="text-sky-500 font-bold capitalize">
                  {userInfo?.name}
                </span>
                {userInfo?.isOnline ? (
                  <span className="text-green-500 text-xs flex items-center  gap-1">
                    <i className=" w-2 h-2 block rounded-full bg-green-500"></i>
                    Online
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs flex items-center  gap-1">
                    <i className=" w-2 h-2 block rounded-full bg-gray-500"></i>
                    offline
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
