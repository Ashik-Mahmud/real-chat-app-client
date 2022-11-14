import { BiMinus } from "react-icons/bi";

type Props = {
  setIsShowProfile: (value: boolean) => void;
  isShowProfile: boolean;
};

const ProfileCard = ({ setIsShowProfile, isShowProfile }: Props) => {
  return (
    <div>
      <div
        onClick={() => setIsShowProfile(false)}
        className={`modal-overlay w-full h-full fixed left-0 transition-opacity top-0 bg-[#ffffff69] backdrop-blur-sm z-10 ${
          isShowProfile
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`modal fixed w-[30rem] h-full right-0 z-20 bg-white top-0 border transition-all ${
          isShowProfile ? "right-0" : "-right-[100%]"
        }`}
      >
        <div className="modal-content  p-5 ">
          <div className=" my-5">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt=""
              className="rounded-full w-32 h-32 mx-auto border-4 border-blue-400"
            />
            <div className="flex items-center flex-col justify-center gap-0 mt-3">
              <h3 className="text-sky-500 font-bold text-2xl">John Doe</h3>
              <span>ashikmahmud@gmail.com</span>
              <span className="text-gray-500 flex items-center text-xs  gap-1">
                <i className=" w-2 h-2 block rounded-full bg-green-500"></i>{" "}
                Online
              </span>
            </div>

            <div className="mt-5 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sky-500 font-bold text-2xl">Friends</h3>
                <BiMinus className="text-2xl text-gray-500 cursor-pointer" />
              </div>
              <div className="friend-list">
                <div className="flex items-center justify-between gap-2 mt-5 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://i.pravatar.cc/150?img=1"
                      alt=""
                      className="rounded-full w-8 h-8"
                    />
                    <div className="flex items-start flex-col">
                      <span className="text-sky-500 font-bold">John Doe</span>
                      <span className="text-gray-500 flex items-center text-xs  gap-1">
                        <i className=" w-2 h-2 block rounded-full bg-green-500"></i>{" "}
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-red-100 flex items-center gap-2 flex-row-reverse text-sm px-3 text-red-600 p-2 rounded-full">
                      Remove <BiMinus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
