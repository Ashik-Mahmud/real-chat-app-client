import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
const animatedComponents = makeAnimated();
type Props = {
  setIsOpenAddMembersModal: (value: boolean) => void;
  setIsShowProfileModal: (value: boolean) => void;
};
const AddMembersModal = ({
  setIsOpenAddMembersModal,
  setIsShowProfileModal,
}: Props) => {
  const { user, refetchFunc, selectedChat, setSelectedChat } = useAppContext();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [memberLoading, setMemberLoading] = useState(false);
  /* get all the friends */
  const { data, isLoading } = useQuery(["friends", user], async () => {
    if (user?.token) {
      const res = await axios.get(
        `${server_url}/user/existing-users/${selectedChat?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return res?.data;
    }
  });

  /* get users except already added */
  const options = data?.users?.map((user: any) => {
    return {
      value: user._id,
      label: user.name + "-" + user.email,
      avatar: user.avatar,
    };
  });

  /* handle Add Members */
  const handleAddMembers = async () => {
    if (selectedUsers?.length < 1)
      return cogoToast.warn(`put at least 1 user for group chat`);

    const sendingData = {
      members: selectedUsers.map((user: any) => user?.value),
    };
    try {
      setMemberLoading(true);
      const { data } = await axios.post(
        `${server_url}/chat/group/add-members/${selectedChat?._id}`,
        sendingData,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (data?.success) {
        cogoToast.success(`Members added successfully`);
        refetchFunc.chatRefetch();
        setIsOpenAddMembersModal(false);
        setIsShowProfileModal(false);
        setSelectedChat({});
        setMemberLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMemberLoading(false);
    }
  };

  return (
    <div>
      {/* add members modal in design of tailwind */}
      <div
        className="fixed inset-0 z-30 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => setIsOpenAddMembersModal(false)}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:p-6 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Add Members
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur, ex.
                    </p>

                    <div className="relative">
                      <div className=" mt-4 w-full">
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={options}
                          isLoading={isLoading}
                          onChange={(e) => setSelectedUsers(e)}
                        />
                      </div>

                      <button
                        onClick={handleAddMembers}
                        disabled={memberLoading}
                        type="button"
                        className="w-full inline-flex justify-center mt-4 rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {memberLoading && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                            ></path>
                          </svg>
                        )}

                        {memberLoading ? "Adding..." : "Add Members"}
                      </button>
                    </div>
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

export default AddMembersModal;
