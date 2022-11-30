import { BiArrowBack, BiCamera, BiLogOut, BiMinus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import { useLogoutMutation } from "../api/AuthenticationApi";
import { useAppContext } from "../Context/AppProvider";
const cookie = new Cookie();

type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
  setIsShowChangeImage: (value: any) => void;
};

const ProfileCard = ({
  setIsShowProfile,
  isShowProfile,
  setIsShowChangeImage,
}: Props) => {
  const { userInfo, setUser } = useAppContext();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  /* handleLogout */
  const handleLogout = async () => {
    setUser(null);
    cookie.remove("user", { path: "/" });
    navigate("/login");
    await logout(userInfo?._id);
  };

  return (
    <div>
      <div
        onClick={() => setIsShowProfile(false)}
        className={`modal-overlay w-full h-full fixed left-0 transition-opacity top-50 bg-[#ffffff69] backdrop-blur-sm z-10 ${
          isShowProfile
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`modal fixed w-full sm:w-[30rem] h-full right-0 z-20 bg-white top-0 border transition-all ${
          isShowProfile ? "right-0" : "-right-[150%]"
        }`}
      >
        <div className="modal-content  p-5 ">
          <span
            className="text-2xl cursor-pointer block sm:hidden"
            onClick={() => setIsShowProfile(false)}
          >
            <BiArrowBack />
          </span>
          <div className=" my-5">
            <div className="rounded-full w-32 h-32 mx-auto  relative">
              <img
                src={
                  userInfo?.avatar
                    ? userInfo?.avatar
                    : "https://i.pravatar.cc/150?img=1"
                }
                alt={userInfo?.name}
                className="rounded-full w-32 h-32 object-cover mx-auto border-4 border-blue-400"
              />
              <div
                className="change-photo absolute right-2 bottom-2 w-8 h-8 border rounded-full bg-blue-400 grid place-items-center text-white cursor-pointer"
                onClick={() =>
                  setIsShowChangeImage({ isChange: true, where: "profile" })
                }
                title="Change Photo"
              >
                <BiCamera />
              </div>
            </div>
            <div className="flex items-center flex-col justify-center gap-0 mt-3">
              <h3 className="text-sky-500 font-bold text-2xl capitalize">
                {userInfo?.name}
              </h3>
              <span>{userInfo?.email}</span>
              {userInfo?.isOnline ? (
                <span className="text-gray-500 flex items-center text-xs  gap-1">
                  <i className=" w-2 h-2 block rounded-full bg-green-500"></i>
                  Online
                </span>
              ) : (
                <span className="text-gray-500 flex items-center text-xs  gap-1">
                  <i className=" w-2 h-2 block rounded-full bg-gray-500"></i>
                  Offline
                </span>
              )}

              <button
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 flex-row-reverse bg-red-100 text-red-500 p-1 px-3 rounded-full"
              >
                Logout <BiLogOut />
              </button>
            </div>

            <div className="mt-5 bg-slate-50 p-6">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-sky-500 font-bold text-2xl">Friends</h3>
                <BiMinus className="text-2xl text-gray-500 cursor-pointer" />
              </div>
              <div className="friend-list h-[20rem] sm:min-h-[30rem] overflow-x-auto">
                {userInfo?.friends?.length > 0 ? (
                  userInfo?.friends?.map((friend: any, index: number) => (
                    <div
                      key={friend?._id + index}
                      className="flex items-center justify-between gap-2 mt-2 bg-blue-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            friend?.avatar
                              ? friend?.avatar
                              : "https://i.pravatar.cc/150?img=1"
                          }
                          alt={friend?.name}
                          className="rounded-full w-10 h-10 border-4 object-cover border-blue-400"
                        />
                        <div className="flex items-start flex-col">
                          <span className="text-sky-500 font-bold capitalize flex items-center gap-2 ">
                            {friend?.name}
                            {friend?.isOnline ? (
                              <span
                                className="text-gray-500 flex items-center text-xs  gap-1 cursor-pointer"
                                title="Online"
                              >
                                <i className=" w-2 h-2 block rounded-full bg-green-500"></i>
                              </span>
                            ) : (
                              <span
                                className="text-gray-500 flex items-center text-xs  gap-1 cursor-pointer"
                                title="Offline"
                              >
                                <i className=" w-2 h-2 block rounded-full bg-gray-500"></i>
                              </span>
                            )}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {friend?.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-red-100 flex cursor-not-allowed items-center gap-2 flex-row-reverse text-sm px-3 text-red-600 p-2 rounded-full">
                          <span className="hidden sm:block"> Remove</span>{" "}
                          <BiMinus />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-5">
                    <span className="text-gray-500">No friends</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
