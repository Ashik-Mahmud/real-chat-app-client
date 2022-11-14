import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import ProfileCard from "./ProfileCard";
type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
};

const Header = ({ setIsShowProfile, isShowProfile }: Props) => {
  const [showNotifications, setShowNotifications] = useState(false);

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
              <div className="dot absolute w-5 h-5 text-xs rounded-full grid place-items-center bg-blue-500 text-blue-100 -top-1 -right-1">
                4
              </div>
            </div>
            {showNotifications && (
              <div className="absolute right-0 top-10 bg-white w-48 rounded-lg shadow-lg p-3 flex flex-col gap-2 border sm:w-[15rem]">
                <div className="flex items-center gap-2  shadow hover:bg-slate-100 p-2 rounded-lg cursor-pointer">
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                    className="rounded-full w-8 h-8"
                  />
                  <div className="flex items-start flex-col">
                    <span className="text-sky-500 font-bold">John Doe</span>
                    <span className="text-gray-500 flex items-center text-xs  gap-1">
                      send you a message
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2  shadow hover:bg-slate-100 p-2 rounded-lg cursor-pointer">
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                    className="rounded-full w-8 h-8"
                  />
                  <div className="flex items-start flex-col">
                    <span className="text-sky-500 font-bold">John Doe</span>
                    <span className="text-gray-500 flex items-center text-xs  gap-1">
                      send you a message
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* notification end */}
          <div className="relative">
            <div
              onClick={() => setIsShowProfile(true)}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
            >
              <div className="bg-sky-100 text-sky-500 p-2 rounded-lg">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt=""
                  className="rounded-full w-8 h-8"
                />
              </div>
              <div className="flex items-start flex-col cursor-pointer">
                <span className="text-sky-500 font-bold">John Doe</span>
                <span className="text-gray-500 flex items-center text-xs  gap-1">
                  <i className=" w-2 h-2 block rounded-full bg-green-500"></i>{" "}
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
