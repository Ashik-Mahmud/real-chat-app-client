import axios from "axios";
import cogoToast from "cogo-toast";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import DragUpload from "../components/DragUpload";
import { server_url } from "../config/config";
import { useAppContext } from "../Context/AppProvider";
type Props = {
  setIsShowChangeImage: React.Dispatch<React.SetStateAction<any>>;
  isShowChangeImage: any;
  setIsShowProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChangeImageModal = ({
  setIsShowChangeImage,
  isShowChangeImage,
  setIsShowProfileModal,
}: Props) => {
  const { user, refetchFunc, setSelectedChat, userInfoRefetch } =
    useAppContext();
  /* additional states */
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<any>(null);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  const [image, setImage] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState<any>("");
  const [rounded, setRounded] = useState(0);

  if (image?.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  }

  /* handle get image */
  const handleGetImage = async () => {
    const croppedImage = imageRef?.current?.getImage().toDataURL();
    if (!croppedImage) return cogoToast.error("select image");
    const image = { image: croppedImage };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server_url}/user/change-photo?where=${isShowChangeImage?.where}&id=${isShowChangeImage?.id}`,
        image,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data?.success) {
        setLoading(false);
        cogoToast.success(data?.message || "Updated");
        refetchFunc.msgRefetch();
        refetchFunc.chatRefetch();
        userInfoRefetch();
        setIsShowChangeImage(false);
        setSelectedChat("");
        setIsShowProfileModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* modal */}
      <div className="fixed z-40 inset-0 overflow-y-auto">
        <div className="flex  z-40 items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() =>
              setIsShowChangeImage({ isChange: false, where: "profile" })
            }
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
                    className="text-lg leading-6 font-medium text-gray-900 capitalize"
                    id="modal-headline"
                  >
                    Change {isShowChangeImage?.where} Photo
                  </h3>
                  <div className="mt-2 w-full">
                    <p className="text-sm text-gray-500 mb-2">Upload Or Drug</p>

                    {!previewImage && <DragUpload setImage={setImage} />}

                    {previewImage && (
                      <div>
                        <AvatarEditor
                          ref={imageRef}
                          image={previewImage}
                          width={250}
                          height={250}
                          border={50}
                          color={[0, 0, 0, 0.5]} // RGBA
                          scale={zoom}
                          rotate={rotate}
                          borderRadius={rounded}
                        />
                        <div className="controls">
                          <div className="flex flex-col my-2">
                            <label htmlFor="zoom">Zoom</label>
                            <input
                              type="range"
                              step={0.2}
                              min={0}
                              max={20}
                              value={zoom}
                              onChange={(e) =>
                                setZoom(Number(e.currentTarget.value))
                              }
                            />
                          </div>
                          <div className="flex flex-col my-2">
                            <label htmlFor="zoom">Rotate</label>
                            <input
                              type="range"
                              step={1}
                              min={0}
                              max={360}
                              onChange={(e) =>
                                setRotate(Number(e.currentTarget.value))
                              }
                            />
                          </div>
                          <div className="flex flex-col my-2">
                            <label htmlFor="zoom">Rounded</label>
                            <input
                              type="range"
                              step={1}
                              min={0}
                              max={500}
                              onChange={(e) =>
                                setRounded(Number(e.currentTarget.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {loading ? (
                <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 opacity-75 cursor-not-allowed items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm">
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
                  </svg>{" "}
                  Waiting...
                </button>
              ) : (
                <button
                  onClick={handleGetImage}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeImageModal;
