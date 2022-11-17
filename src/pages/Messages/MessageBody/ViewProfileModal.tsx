import { BiX } from "react-icons/bi";
import { useAppContext } from "../../../Context/AppProvider";

type Props = {
  setIsShowProfileModal: (value: boolean) => void;
  isShowProfileModal: boolean;
};

const ViewProfileModal = ({
  setIsShowProfileModal,
  isShowProfileModal,
}: Props) => {
  const { selectedChat } = useAppContext();

  console.log(selectedChat);
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
            <h3 className="text-xl font-semibold">View Profile</h3>
            <button
              onClick={() => setIsShowProfileModal(false)}
              className="text-2xl font-semibold"
            >
              <BiX />
            </button>
          </div>
          <div className="modal-body flex flex-col items-center justify-center p-8">
            <div className="profile-image overflow-hidden w-32 h-32 border-4 rounded-full bg-gray-200 text-3xl font-bold grid place-items-center uppercase">
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
            </div>
            <h3 className="text-xl font-semibold mt-4">
              {selectedChat?.receiver?.name}
            </h3>
            <p>{selectedChat?.receiver?.email}</p>

            {/* friend list */}
            <div className="friend-list w-full mt-4">
              <div className="friend-list-header flex justify-between items-center">
                <h3 className="text-lg font-semibold">Friends</h3>
                <button className="text-sm font-semibold">See All</button>
              </div>
              <div className="friend-list-body grid grid-cols-3 gap-2 mt-4">
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
                <div className="friend-item w-full h-20 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="modal-footer flex justify-end items-center p-4 border-t border-gray-200">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              Block
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfileModal;
