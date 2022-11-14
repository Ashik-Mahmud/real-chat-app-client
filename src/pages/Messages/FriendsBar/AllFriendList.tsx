import { BiArrowBack } from "react-icons/bi";
import FriendItem from "./FriendItem";
type Props = {
  showAllFriends: boolean;
  setShowAllFriends: (value: boolean) => void;
};
const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "jhone@doe.com ",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Sayman Doe",
    email: "jane@doe.com ",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Abir Doe",
    email: "newjohone@gamil.com ",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Mou Doe",
    email: "bal@done.com ",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Salma Doe",
    email: "chat@done.com ",

    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "John Doe",
    email: "nill@gmail.com ",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "John Doe",
    email: "pagla@gmail.com ",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "John Doe",
    email: "hero@gmail.com ",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "John Doe",
    email: "sagol@gmail.com ",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "John Doe",
    email: "tal@gmail.com ",
    image: "https://i.pravatar.cc/150?img=10",
  },
];
const AllFriendList = ({ showAllFriends, setShowAllFriends }: Props) => {
  return (
    <>
      <div
        onClick={() => setShowAllFriends(false)}
        className={`overlay fixed w-full transition-opacity h-full left-0 top-0 z-10 bg-[#0000003b] backdrop-blur-sm ${
          showAllFriends
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`fixed  transition-all  top-0 p-5 w-full sm:w-[50rem] bg-white z-50 h-full shadow-sm border ${
          showAllFriends ? "right-0" : "-right-[200%]"
        }`}
      >
        <div className="all-friend-list z-50 relative">
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
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="friend-list grid grid-cols-1 gap-3 h-[80vh] overflow-y-auto  p-5">
            {usersData.map((user) => (
              <FriendItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFriendList;
