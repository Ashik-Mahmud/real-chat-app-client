import { BiX } from "react-icons/bi";

type Props = {};

const ViewProfileModal = (props: Props) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-20 grid place-items-center bg-[#ffffff9c] backdrop-blur-sm w-full h-full">
        <div className="modal-container  w-[40rem]  bg-white z-20 rounded-md shadow-lg">
          <div className="modal-header flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold">View Profile</h3>
            <button className="text-2xl font-semibold">
              <BiX />
            </button>
          </div>
          <div className="modal-body flex flex-col items-center justify-center p-8">
            <div className="profile-image w-32 h-32 rounded-full bg-gray-200"></div>
            <h3 className="text-xl font-semibold mt-4">John Doe</h3>
            <p>ashikmahmud@gmail.com</p>

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
