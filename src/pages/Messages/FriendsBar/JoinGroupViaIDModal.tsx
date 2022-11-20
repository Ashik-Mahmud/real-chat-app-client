import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {
  setIsShowJoinModal: (value: boolean) => void;
};

const JoinGroupViaIDModal = ({ setIsShowJoinModal }: Props) => {
  const [id, setId] = useState("");
  const { user, refetchFunc } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  /* handle join by code  */
  const handleJoiByCode = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server_url}/chat/group/join-by-code`,
        { joinId: id },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (data?.success) {
        cogoToast.success("Joined successfully");
        setIsShowJoinModal(false);
        refetchFunc?.chatRefetch();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      const { data } = (error as any).response;
      cogoToast.error(data.message);
    }
  };

  return (
    <div>
      {/* modal */}
      <div className="fixed z-40 inset-0 overflow-y-auto">
        <div className="flex  z-40 items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => setIsShowJoinModal(false)}
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute z-40 inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-10 sm:pb-4 w-full">
              <div className="w-full">
                <div className="mt-3 text-center sm:mt-0  sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Join Group via Group Code
                  </h3>
                  <div className="mt-2 w-full">
                    <p className="text-sm text-gray-500 mb-2">
                      Enter the group code to join the group
                    </p>
                    <input
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      value={id}
                      className="w-full p-4 rounded-lg border-2  border-sky-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleJoiByCode}
                disabled={isLoading}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {isLoading && (
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

                {isLoading ? "Joining..." : "Join"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupViaIDModal;
