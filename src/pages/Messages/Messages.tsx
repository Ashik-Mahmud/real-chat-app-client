import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useAppContext } from "../../Context/AppProvider";
import Header from "../../shared/Header";
import AllFriendList from "./FriendsBar/AllFriendList";
import CreateNewGroupModal from "./FriendsBar/CreateNewGroupModal";
import FriendsBar from "./FriendsBar/FriendsBar";
import JoinGroupViaIDModal from "./FriendsBar/JoinGroupViaIDModal";
import MessageBody from "./MessageBody/MessageBody";
import MessageFooter from "./MessageBody/MessageFooter";
import MessageHeader from "./MessageBody/MessageHeader";
import ViewProfileModal from "./MessageBody/ViewProfileModal";

type Props = {};

const Messages = (props: Props) => {
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [isShowChatList, setIsShowChatList] = useState(false);
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [isShowProfileModal, setIsShowProfileModal] = useState(false);
  const [isShowJoinModal, setIsShowJoinModal] = useState(false);
  const [isShowNewGroupModal, setIsShowNewGroupModal] = useState(false);
  /* handle Get All the chat */
  const { selectedChat } = useAppContext();
  return (
    <>
      <ViewProfileModal
        isShowProfileModal={isShowProfileModal}
        setIsShowProfileModal={setIsShowProfileModal}
      />

      <AllFriendList
        showAllFriends={showAllFriends}
        setShowAllFriends={setShowAllFriends}
      />

      {isShowJoinModal && (
        <JoinGroupViaIDModal setIsShowJoinModal={setIsShowJoinModal} />
      )}

      {isShowNewGroupModal && (
        <CreateNewGroupModal setIsShowNewGroupModal={setIsShowNewGroupModal} />
      )}

      <div className="bg-slate-200 md:h-screen py-5 z-5">
        <div className="container mx-auto">
          <Header
            setIsShowProfile={setIsShowProfile}
            isShowProfile={isShowProfile}
          />

          <div className="message-container  grid grid-cols-1 md:grid-cols-3 items-stretch gap-2 ">
            <div
              className={`friends-sidebar fixed h-full md:h-auto z-10 left-0 top-0 md:z-0  md:relative order-2 md:order-1 md:col-span-1 bg-white  ${
                isShowChatList ? "block " : "hidden md:block"
              }`}
            >
              <span
                onClick={() => setIsShowChatList(false)}
                className="absolute left-4 top-5 block md:hidden"
              >
                <BiArrowBack size={20} />
              </span>
              <FriendsBar
                setIsShowNewGroupModal={setIsShowNewGroupModal}
                setIsShowJoinModal={setIsShowJoinModal}
                setShowAllFriends={setShowAllFriends}
                setIsShowChatList={setIsShowChatList}
              />
            </div>
            <div className="message-content order-1 md:order-2 md:col-span-2">
              {selectedChat?._id ? (
                <>
                  <MessageHeader
                    setIsShowProfileModal={setIsShowProfileModal}
                    setIsShowChatList={setIsShowChatList}
                    setIsShowProfile={setIsShowProfile}
                    isShowProfile={isShowProfile}
                  />

                  <div className="message-body bg-gray-50">
                    <MessageBody />
                    <MessageFooter />
                  </div>
                </>
              ) : (
                <div className="h-full bg-white grid place-items-center font-montserrat py-10">
                  <h2 className="text-xl hidden md:block cursor-pointer md:cursor-auto font-medium text-gray-500">
                    Click to Continue chat
                  </h2>
                  <h2
                    onClick={() => setIsShowChatList((prev) => !prev)}
                    className="text-xl block md:hidden bg-gray-100 md:bg-white p-4 rounded md:p-0 cursor-pointer md:cursor-auto font-medium text-gray-500"
                  >
                    Click to Open Chat List
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
