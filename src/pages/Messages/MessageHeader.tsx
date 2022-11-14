type Props = {};

const MessageHeader = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 ">
        <div className="flex items-center">
          <div className="avatar">
            <img
              src="https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png"
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-4"
            />
          </div>
          <div className="ml-3">
            <h4 className="text-xl font-bold">John Doe</h4>
            <p className="text-sm text-gray-500">Active 1h ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
