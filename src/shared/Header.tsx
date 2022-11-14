import { AiOutlineBell } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white mb-3 p-2 px-8">
        <div className="flex items-center gap-2">
          <BsChatSquareDots size={30} /> Real Chat.
        </div>
        <div className="flex items-center gap-5">
          <div className="notification">
            <div className="notification-icon cursor-pointer">
              <AiOutlineBell size={30} />
              <div className="dot">4</div>
            </div>
          </div>
          {/* notification end */}
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
            <div className="bg-sky-100 text-sky-500 p-2 rounded-lg">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt=""
                className="rounded-full w-8 h-8"
              />
            </div>
            <div className="flex items-start flex-col">
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
  );
};

export default Header;
