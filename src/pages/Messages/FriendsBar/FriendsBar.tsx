import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import AllFriendList from "./AllFriendList";
import ListItem from "./ListItem";
type Props = {};

const FriendsBar = (props: Props) => {
  return (
    <div>
      <AllFriendList />
      <div className=" bg-white p-8 ">
        <div className="title flex items-center justify-between bg-sky-100 text-sky-500  px-3 py-3 rounded">
          <h3 className="text-xl font-bold my-2">Friends</h3>
          <button className="bg-sky-500 text-sky-100 p-2 rounded-sm px-4 flex items-center gap-2">
            Create New Group <BsPlus size={30} />
          </button>
        </div>
        <div className="chatLists mt-5">
          <div className="search-chatList mb-3">
            <input
              type="text"
              placeholder="Search Chat"
              className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
            />
          </div>
          <ul className="flex items-start flex-col gap-2 h-[30rem] overflow-y-auto">
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </ul>
        </div>

        <div className="find-friends mt-6">
          <Link
            to={"/friends"}
            className="bg-blue-100 text-blue-500 p-4 block font-bold"
          >
            Find Friends
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendsBar;
