import axios from "axios";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import swal from "sweetalert";
import { server_url } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {
  me?: boolean;
  message: string;
  data: any;
  refetch: () => void;
};

const SingleMessage = ({ message, me, data, refetch }: Props) => {
  const [showActionMessage, setShowActionMessage] = useState(false);
  const { user } = useAppContext();
  const time = new Date(data?.createdAt).toLocaleTimeString();
  /* handle delete message for */
  const handleMessage = async (id: string) => {
    const isConfirm = await swal("Are you sure you want delete this?", {
      buttons: ["Oh noez!", true],
    });
    if (isConfirm) {
      await axios.delete(`${server_url}/chat/message/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      refetch();
    }
  };

  return (
    <div
      className={`single-message   font-montserrat group flex  gap-2 mb-2 ${
        me ? "flex-row-reverse justify-start items-end " : " items-start "
      }`}
    >
      {!me && (
        <div className="avatar cursor-pointer" title={data?.sender?.name}>
          <img
            src={
              data?.sender?.avatar
                ? data?.sender?.avatar
                : "https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
            }
            alt={data?.sender?.name}
            className="w-7 h-7 rounded-full object-cover border-4 border-slate-200"
          />
        </div>
      )}

      <div
        className={`message-content flex items-center gap-2  ${
          me ? "flex-row-reverse" : ""
        }`}
      >
        <p
          className={` rounded-lg leading-6  font-poppins text-sm  p-3  ${
            message?.length > 100 ? "w-full md:w-[35rem]" : ""
          } 
           ${me ? "bg-blue-400 text-blue-50" : "bg-blue-100 text-blue-800"}`}
        >
          {message}
        </p>
        <small className="text-xs text-slate-500">{time}</small>

        <div
          className="relative transition-all scale-0 group-hover:scale-100 "
          onClick={() => setShowActionMessage((state) => !state)}
        >
          <small className="cursor-pointer  block ">
            <FaEllipsisV />
          </small>
          {showActionMessage && (
            <div
              onMouseLeave={() => setShowActionMessage(false)}
              className="popovers text-xs border bg-white p-2 shadow-sm rounded absolute -top-8 left-5 z-40 "
            >
              <ul className="flex flex-col gap-2">
                <li
                  onClick={() => navigator.clipboard.writeText(message)}
                  className="bg-blue-50 text-blue-500 p-1 text-xs rounded-lg cursor-pointer"
                  title="Copy Message"
                >
                  <FiCopy />
                </li>
                {me && (
                  <li
                    onClick={() => handleMessage(data?._id)}
                    className="bg-red-50 text-red-400 p-1 text-xs rounded-lg cursor-pointer"
                    title="Delete Message"
                  >
                    <FiTrash2 />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
