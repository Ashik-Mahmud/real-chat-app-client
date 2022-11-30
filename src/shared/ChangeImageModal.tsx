import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import DragUpload from "../components/DragUpload";
type Props = {
  setIsShowChangeImage: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChangeImageModal = ({ setIsShowChangeImage }: Props) => {
  /* additional states */
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
  const handleGetImage = () => {
    const croppedImage = imageRef?.current?.getImage().toDataURL();
    console.log(croppedImage);
  };

  return (
    <div>
      {/* modal */}
      <div className="fixed z-40 inset-0 overflow-y-auto">
        <div className="flex  z-40 items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => setIsShowChangeImage(false)}
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
                    Change Profile Photo
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
                          color={[0, 0, 0, 0.3]} // RGBA
                          scale={zoom}
                          rotate={rotate}
                          borderRadius={rounded}
                        />
                        <div className="controls">
                          <div className="flex flex-col my-5">
                            <label htmlFor="zoom">Zoom</label>
                            <input
                              type="range"
                              step={0.2}
                              min={0}
                              max={5}
                              value={zoom}
                              onChange={(e) =>
                                setZoom(Number(e.currentTarget.value))
                              }
                            />
                          </div>
                          <div className="flex flex-col my-5">
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
                          <div className="flex flex-col my-5">
                            <label htmlFor="zoom">Rounded</label>
                            <input
                              type="range"
                              step={1}
                              min={0}
                              max={300}
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
              <button
                onClick={() => handleGetImage()}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeImageModal;
