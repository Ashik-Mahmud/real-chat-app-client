type Props = {};

const ChangePassword = (props: Props) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="change-password-form bg-white p-12 sm:w-[28rem]">
        <h1 className="text-2xl my-3 mb-5">Change Password</h1>
        <form>
          <div className="form-group flex flex-col items-start gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control p-4 outline-none border border-gray-300 rounded-md focus:border-blue-500 w-full"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group flex flex-col items-start gap-1 mt-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control p-4 outline-none border border-gray-300 rounded-md focus:border-blue-500 w-full"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white p-3 rounded-md w-full mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
