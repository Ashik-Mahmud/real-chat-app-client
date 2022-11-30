import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
type Props = {};
const ChangeImageModal = (props: Props) => {
  //   const [editorRef, setEditorRef] = useState();

  const imageRef = useRef();
  console.log(imageRef);

  const [zoom, setZoom] = useState(1.2);
  const [rotate, setRotate] = useState(1);

  console.log(zoom);
  return (
    <div>
      {/* modal */}
      <div className="fixed z-40 inset-0 overflow-y-auto">
        <div className="flex  z-40 items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => {}}
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
                    <p className="text-sm text-gray-500 mb-2">
                      Enter the group code to join the group
                    </p>
                    <input
                      type="text"
                      className="w-full p-4 rounded-lg border-2  border-sky-100 focus:outline-none focus:border-sky-500"
                    />
                    <AvatarEditor
                      ref={imageRef as any}
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6EL0Nq5vhvAocu_Vy6zyA87xSZ0YKTgP6QCasBWaMDg&s"
                      width={250}
                      height={250}
                      border={50}
                      scale={zoom}
                      rotate={rotate}
                    />

                    <input
                      type={"range"}
                      onChange={(e) => setZoom(Number(e.currentTarget.value))}
                      min={1}
                      max={3}
                      step="0.2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm">
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
