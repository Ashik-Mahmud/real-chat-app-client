import { BiX } from "react-icons/bi";

type Props = {
  setIsShowNewGroupModal: (value: boolean) => void;
};
const CreateNewGroupModal = ({ setIsShowNewGroupModal }: Props) => {
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
              <input
                type="text"
                placeholder="Group Name"
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Group Description"
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Group Image"
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="new_users">Add Users</label>
              <input
                type="text"
                placeholder="Add Users"
                className="w-full p-4 rounded-lg border-2 border-sky-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="mt-5">
              <button className="bg-sky-500 text-sky-100 p-4 rounded-lg w-full">
                Create Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGroupModal;