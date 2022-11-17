import axios from "axios";
import { useState } from "react";
import { BiCheck, BiLogOut, BiPen, BiPlus, BiX } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";

type Props = {
  setIsShowProfileModal: (value: boolean) => void;
  isShowProfileModal: boolean;
};

const ViewProfileModal = ({
  setIsShowProfileModal,
  isShowProfileModal,
}: Props) => {
  const { selectedChat, user } = useAppContext();

  const [isEditGroupName, setIsEditGroupName] = useState(false);

  const { data, isLoading } = useQuery(
    ["user", user, selectedChat],
    async () => {
      if (selectedChat?.receiver?._id) {
        const { data } = await axios.get(
          `${server_url}/user/me/${selectedChat?.receiver?._id}`,
          {
            headers: {
              Authorization: `Bearer ${(user as any)?.token}`,
            },
          }
        );
        return data;
      }
    }
  );

  return (
    <>
      <div
        className={`fixed left-0 transition-all top-0 z-20 grid place-items-center bg-[#ffffff9c] backdrop-blur-sm w-full h-full  ${
          isShowProfileModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`modal-container w-full md:w-[40rem]  bg-white z-20 rounded-md shadow-lg transition-transform ${
            isShowProfileModal ? "scale-100" : "scale-75"
          }`}
        >
          <div className="modal-header flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold">
              View {selectedChat?.isGroup ? " Group" : " Profile"}
            </h3>
            <button
              onClick={() => setIsShowProfileModal(false)}
              className="text-2xl font-semibold"
            >
              <BiX />
            </button>
          </div>
          <div className="modal-body flex flex-col items-center justify-center p-8">
            <div
              title={(selectedChat?.isGroup && selectedChat?.groupName) || ""}
              className="profile-image overflow-hidden w-32 h-32 border-4 rounded-full bg-gray-200 text-6xl font-bold grid place-items-center uppercase"
            >
              {!selectedChat?.isGroup ? (
                <>
                  {selectedChat?.receiver?.avatar ? (
                    <img
                      src={selectedChat?.receiver?.avatar}
                      alt={selectedChat?.receiver?.name}
                      className="w-32 h-32 object-cover"
                    />
                  ) : (
                    selectedChat?.receiver?.name
                      ?.split(" ")
                      .map((name: string) => name.at(0))
                  )}
                </>
              ) : (
                <>
                  {selectedChat?.groupName
                    ?.split(" ")
                    .map((l: string) => l.at(0))}
                </>
              )}
            </div>
            {selectedChat?.isGroup ? (
              <h3 className="text-xl font-semibold mt-4 flex items-center gap-3">
                {isEditGroupName ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={selectedChat?.groupName}
                      className="border p-2 text-sm rounded outline-none"
                    />
                  </div>
                ) : (
                  selectedChat?.groupName
                )}
                {isEditGroupName ? (
                  <>
                    <span
                      title="Save"
                      className="edit text-2xl bg-blue-50 p-1 cursor-pointer text-blue-600"
                    >
                      <BiCheck />
                    </span>
                    <span
                      title="Edit"
                      onClick={() => setIsEditGroupName(false)}
                      className="edit cursor-pointer bg-red-50 p-1 text-2xl text-red-600"
                    >
                      <BiX />
                    </span>
                  </>
                ) : (
                  <span
                    title="Edit"
                    onClick={() => setIsEditGroupName(true)}
                    className="edit cursor-pointer text-blue-600"
                  >
                    <BiPen />
                  </span>
                )}
              </h3>
            ) : (
              <h3 className="text-xl font-semibold mt-4">
                {selectedChat?.receiver?.name}
              </h3>
            )}

            <div>
              {selectedChat?.isGroup && (
                <span className="my-1 text-sm text-gray-600">
                  Group Public chat
                </span>
              )}
              {!selectedChat?.isGroup && selectedChat?.receiver?.email}
            </div>

            {/* friend list */}
            <div className="friend-list w-full mt-4">
              <div className="friend-list-header flex bg-gray-100 p-2 rounded px-4 justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {selectedChat?.isGroup && (
                    <span className="flex items-center gap-1 bg-blue-200 cursor-pointer text-blue-600 p-1 rounded-full px-2 capitalize text-sm">
                      <BiPlus /> add
                    </span>
                  )}
                  {selectedChat?.isGroup ? "Members" : "Friends"}
                </h3>
                {!selectedChat?.isGroup && (
                  <button className="text-sm font-semibold">See All</button>
                )}
                {selectedChat?.isGroup && (
                  <span>
                    Total Members{" "}
                    <small className="text-blue-500">
                      {selectedChat?.users?.length}
                    </small>
                  </span>
                )}
              </div>
              {isLoading ? (
                <>
                  <div>loading....</div>
                </>
              ) : (
                <>
                  {!selectedChat?.isGroup && (
                    <>
                      {data?.user?.friends?.length > 0 ? (
                        <div className="friend-list-body grid grid-cols-3 gap-2 mt-4">
                          {data?.user?.friends?.map((friend: any) => (
                            <div
                              key={friend._id}
                              className={`friend-item w-full h-20 flex items-start gap-3  border bg-center bg-no-repeat rounded-md p-3 backdrop-blur-sm ${
                                friend?._id === user?._id
                                  ? "bg-sky-200"
                                  : "bg-gray-200"
                              }`}
                              title={
                                friend?._id === user?._id
                                  ? "It's you"
                                  : null || ""
                              }
                            >
                              <div className="flex flex-col items-start z-20">
                                <span className="font-bold flex items-center gap-3">
                                  {friend?.name}

                                  {friend?.isOnline ? (
                                    <small
                                      title="Online"
                                      className="w-2 h-2 rounded-full bg-green-500 block cursor-pointer"
                                    ></small>
                                  ) : (
                                    <small
                                      title="Offline"
                                      className="w-2 h-2 rounded-full bg-gray-500 block cursor-pointer"
                                    ></small>
                                  )}
                                </span>
                                <small>{friend?.email}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 py-10 flex items-center justify-center flex-col capitalize text-center text-xl font-medium">
                          <FaUsers size={50} />
                          <span>no friends found</span>
                        </div>
                      )}
                    </>
                  )}

                  {selectedChat?.isGroup && (
                    <>
                      <div className="my-3">
                        <ul>
                          {selectedChat?.users?.map((member: any) => (
                            <li
                              key={member?._id}
                              className="flex items-center mb-1 justify-between bg-blue-50 p-2 rounded px-5"
                            >
                              <div className="flex items-center gap-2">
                                {member?.name}
                                {member?._id === user?._id && (
                                  <span
                                    title="It's you"
                                    className="bg-blue-100 text-xs px-2 py-0 rounded-full cursor-pointer text-blue-500"
                                  >
                                    you
                                  </span>
                                )}
                              </div>
                              <span>{member?.email}</span>
                              <span>
                                {member?.isOnline ? (
                                  <small className="bg-teal-100 text-teal-500 px-3 rounded-full">
                                    active
                                  </small>
                                ) : (
                                  <small className="bg-gray-100 text-gray-500 px-3 rounded-full">
                                    inactive
                                  </small>
                                )}
                              </span>
                              {selectedChat?.creator === user?._id && (
                                <span
                                  title={"let you leave " + member?.email}
                                  className="cursor-pointer text-red-600"
                                >
                                  <BiLogOut />
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {!selectedChat?.isGroup && (
            <div className="modal-footer flex justify-end items-center p-4 border-t border-gray-200">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Block
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProfileModal;
