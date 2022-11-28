import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { useQuery } from "react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
const animatedComponents = makeAnimated();

type Props = {
  setIsShowNewGroupModal: (value: boolean) => void;
};
const CreateNewGroupModal = ({ setIsShowNewGroupModal }: Props) => {
  const { user, refetchFunc } = useAppContext();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [groupName, setGroupName] = useState("");
  const [groupLoading, setGroupLoading] = useState(false);

  /* get all the friends */
  const { data, isLoading } = useQuery(["friends", user], async () => {
    if (user?.token) {
      const res = await axios.get(`${server_url}/user/all-of-them`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res?.data;
    }
  });

  const options = data?.users?.map((user: any) => {
    return {
      value: user?._id,
      label: user?.name + " - " + user?.email,
    };
  });

  /* handle Create Group Chat */
  const handleCreateGroupChat = async () => {
    if (!groupName) return cogoToast.warn(`Put group name`);
    if (selectedUsers?.length < 2)
      return cogoToast.warn(`put at least 2 users for group chat`);

    const sendingData = {
      name: groupName,
      members: selectedUsers.map((user: any) => user?.value),
    };
    setGroupLoading(true);

    try {
      await axios.post(`${server_url}/chat/group/create`, sendingData, {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });

      refetchFunc.chatRefetch();
      refetchFunc.msgRefetch();
      setIsShowNewGroupModal(false);
      setGroupLoading(false);
    } catch (err) {
      setGroupLoading(false);
      console.log(err);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center p-5">
        <div className="bg-white p-5 w-full sm:w-[30rem] rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Create New Group</h3>
              <BiX
                onClick={() => setIsShowNewGroupModal(false)}
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="group-image">
                Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="new_users">
                Add Users <span className="text-red-500">*</span>
              </label>
              <div className="w-full pb-2 px-2 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500">
                <small className="text-xs mb-1">
                  select minimum 2 users for group
                </small>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  isLoading={isLoading}
                  onChange={(e) => setSelectedUsers(e)}
                />
              </div>
            </div>

            <div className="mt-5">
              {groupLoading ? (
                <button className="bg-sky-500 text-sky-100 p-4 rounded-lg w-full opacity-75 cursor-not-allowed">
                  Creating Group...
                </button>
              ) : (
                <button
                  onClick={() => handleCreateGroupChat()}
                  className="bg-sky-500 text-sky-100 p-4 rounded-lg w-full"
                >
                  Create Group
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGroupModal;
