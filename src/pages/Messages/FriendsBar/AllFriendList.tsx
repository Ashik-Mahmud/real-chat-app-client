import { BsPlus } from "react-icons/bs";
type Props = {};
const AllFriendList = (props: Props) => {
  return (
    <div className="fixed right-0 top-0 p-5 w-[50rem] bg-white z-50 h-full shadow-sm border">
      <div className="overlay fixed w-full h-full left-0 top-0 z-10 bg-[#0000001c]"></div>
      <div className="all-friend-list z-50 relative">
        <div className="title flex items-center justify-between mb-10 bg-gray-50 p-3 px-6 rounded">
          <h3 className="text-xl font-bold my-2 flex-1">Find Friends</h3>
          <div className="search-friend flex-1">
            <input
              type="text"
              placeholder="Search Friend"
              className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="friend-list grid grid-cols-1 gap-5">
          <div className="friend flex items-center justify-between bg-gray-100 p-3 rounded-lg gap-3">
            <div className="flex items-center gap-3">
              <div className="friend-image">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
              </div>
              <div className="friend-info">
                <h4 className="friend-name text-xl font-bold">John Doe</h4>
                <p className="friend-status">ashik@gmail.com</p>
              </div>
            </div>
            <div className="add-friend">
              <button className="flex items-center gap-2">
                Add to chat <BsPlus size={30} />
              </button>
            </div>
          </div>
          <div className="friend">
            <div className="friend-image">
              <img src="https://i.pravatar.cc/150?img=2" alt="" />
            </div>
            <div className="friend-info">
              <h4 className="friend-name">John Doe</h4>
              <p className="friend-status">Active 1h ago</p>
            </div>
          </div>
          <div className="friend">
            <div className="friend-image">
              <img src="https://i.pravatar.cc/150?img=3" alt="" />
            </div>
            <div className="friend-info">
              <h4 className="friend-name">John Doe</h4>
              <p className="friend-status">Active 1h ago</p>
            </div>
          </div>
          <div className="friend">
            <div className="friend-image">
              <img src="https://i.pravatar.cc/150?img=4" alt="" />
            </div>
            <div className="friend-info">
              <h4 className="friend-name">John Doe</h4>
              <p className="friend-status">Active 1h ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFriendList;
