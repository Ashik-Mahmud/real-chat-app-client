import { Link } from "react-router-dom";

type Props = {};

const ResetPassword = (props: Props) => {
  return (
    <div className="grid place-items-center h-screen bg-gray-50 p-5 sm:p-0">
      <div className="bg-white w-full sm:w-[30rem] p-8 shadow border">
        <div className="logo my-4">
          <h3 className="text-2xl font-bold ">Reset Password</h3>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md">
            Reset Password
          </button>

          <div className="flex justify-center items-center gap-2">
            <span>Don't have an account?</span>
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
