import axios from "axios";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
import FriendItem from "./FriendItem";
type Props = {
  showAllFriends: boolean;
  setShowAllFriends: (value: boolean) => void;
};

const AllFriendList = ({ showAllFriends, setShowAllFriends }: Props) => {
  const { user } = useAppContext();
  const [search, setSearch] = useState("");

  /* get all the friends */
  const { data: friends, isLoading: friendsLoading } = useQuery(
    ["friends", search, user],
    async () => {
      const res = await axios.get(`${server_url}/user/all?q=${search}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res?.data;
    }
  );

  console.log(friends);

  return (
    <div>
      <div
        onClick={() => setShowAllFriends(false)}
        className={`overlay fixed w-full  transition-opacity h-full left-0 top-0 z-10 bg-[#0000003b] backdrop-blur-sm ${
          showAllFriends
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`fixed   transition-all  top-0 p-5 w-full sm:w-[50rem] bg-white z-20 h-full shadow-sm border ${
          showAllFriends ? "right-0" : "-right-[200%]"
        }`}
      >
        <div className="all-friend-list z-50 ">
          <div className="title flex items-center justify-between mb-5 bg-gray-50 p-3 px-6 rounded">
            <div className="flex items-center flex-1 gap-2">
              <span
                onClick={() => setShowAllFriends(false)}
                className="text-xl cursor-pointer block sm:hidden"
              >
                <BiArrowBack />
              </span>
              <h3 className="text-xl font-bold my-2 flex-1">Find Friends</h3>
            </div>
            <div className="search-friend flex-1">
              <input
                type="text"
                placeholder="Search Friend"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {friendsLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            </div>
          ) : (
            <div className="friend-list">
              {friends?.users?.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 h-[80vh] overflow-y-auto grid-rows-6  p-5">
                  {friends?.users?.map((user: any) => (
                    <FriendItem key={user._id} user={user} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col py-20 gap-4 h-full">
                  <span>
                    <FaUsers size={105} />
                  </span>
                  <h3 className="text-xl font-bold">No Friends Found</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFriendList;
