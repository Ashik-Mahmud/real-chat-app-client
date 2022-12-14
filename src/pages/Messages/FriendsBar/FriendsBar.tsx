import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useQuery } from "react-query";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import ListItem from "./ListItem";
type Props = {
  setShowAllFriends: (value: boolean) => void;
  setIsShowJoinModal: (value: boolean) => void;
  setIsShowNewGroupModal: (value: boolean) => void;
  setIsShowChatList: (value: boolean) => void;
};

const FriendsBar = ({
  setShowAllFriends,
  setIsShowJoinModal,
  setIsShowNewGroupModal,
  setIsShowChatList,
}: Props) => {
  const [search, setSearch] = useState("");
  const { user, setRefetchFunc } = useAppContext();

  /* get all the chat for particular user */
  const {
    data,
    isLoading,
    refetch: friendsRefetch,
  } = useQuery(["friends", user, search], async () => {
    if (user) {
      const { data } = await axios.get(
        `${server_url}/chat/user?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data;
    }
  });

  useEffect(() => {
    setRefetchFunc((prev: any) => {
      return {
        ...prev,
        chatRefetch: friendsRefetch,
      };
    });
  }, [friendsRefetch, setRefetchFunc]);

  return (
    <div>
      <div className=" bg-white p-8 mt-5 md:mt-0">
        <div className="title flex flex-col md:flex-row items-center justify-between bg-sky-100 text-sky-500  px-3 py-3 rounded">
          <h3 className="text-xl font-bold my-2">Friends</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShowNewGroupModal(true)}
              className="bg-sky-500 text-sm text-sky-100 p-2 rounded-sm px-4 flex items-center gap-2"
            >
              Create Group <BsPlus size={20} />
            </button>
            <button
              onClick={() => setIsShowJoinModal(true)}
              title="Join Group via group code"
              className="bg-sky-200 text-sky-500 text-sm  p-2 rounded-sm px-4 flex items-center gap-2"
            >
              Join
            </button>
          </div>
        </div>
        <div className="chatLists mt-5">
          <div className="search-chatList mb-3">
            <input
              type="text"
              placeholder="Search Chat"
              onInput={(e) => setSearch(e.currentTarget.value)}
              value={search}
              className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
            />
          </div>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : data?.chats?.length || data?.groupChats?.length > 0 ? (
            <>
              <ul className="flex items-start flex-col gap-2 h-[25rem] sm:h-[30rem] overflow-y-auto">
                {data?.chats?.map((receiver: any) => (
                  <ListItem
                    key={receiver?._id}
                    user={receiver}
                    setIsShowChatList={setIsShowChatList}
                  />
                ))}

                {data?.groupChats?.length > 0 && (
                  <>
                    {data?.groupChats?.map((chat: any) => (
                      <ListItem
                        key={chat?._id}
                        user={chat}
                        setIsShowChatList={setIsShowChatList}
                      />
                    ))}
                  </>
                )}
              </ul>
            </>
          ) : (
            <div className="text-center">No Chat Found</div>
          )}
        </div>

        <div className="find-friends mt-6">
          <div
            onClick={() => setShowAllFriends(true)}
            className="bg-blue-100 text-blue-500 p-4 block font-bold cursor-pointer rounded-lg text-center"
          >
            Find Friends
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsBar;
