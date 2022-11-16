type Props = {};

const GlobalLoading = (props: Props) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full z-50 bg-[#ffffff69] backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;
