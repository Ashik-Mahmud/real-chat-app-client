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
};
const AddMembersModal = ({ setIsOpenAddMembersModal }: Props) => {
  const { user, refetchFunc, selectedChat } = useAppContext();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
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
      }
    } catch (error) {
      console.log(error);
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                      >
                        Add Members
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
