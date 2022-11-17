import axios from "axios";
import { BiX } from "react-icons/bi";
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

  const { data, isLoading } = useQuery(
    ["user", user, selectedChat],
    async () => {
      if ((user as any)?.token) {
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
              {isLoading ? (
                <>
                  <div>loading....</div>
                </>
              ) : data?.user?.friends?.length > 0 ? (
                <div className="friend-list-body grid grid-cols-3 gap-2 mt-4">
                  {data?.user?.friends?.map((friend: any) => (
                    <div
                      key={friend._id}
                      className="friend-item w-full h-20 flex items-start gap-3 bg-gray-200 border bg-center bg-no-repeat rounded-md p-3 backdrop-blur-sm"
                    >
                      <div className="flex flex-col items-start z-20">
                        <span className="font-bold">{friend?.name}</span>
                        <small>{friend?.email}</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xl font-medium">
                  no friends found
                </div>
              )}
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
