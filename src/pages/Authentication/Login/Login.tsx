import { Link } from "react-router-dom";

type Props = {};
const Login = (props: Props) => {
  return (
    <div className="login grid place-items-center p-4 h-screen bg-gray-50">
      <div className="login-wrapper bg-white w-[30rem] p-8 shadow border">
        <div className="logo my-4">
          <h3 className="text-2xl font-bold ">Login to your account</h3>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/" className="text-blue-500">
              Forgot password?
            </a>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>

          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-10 bg-gray-300"></div>
            <span className="text-gray-400">or</span>
            <div className="h-[1px] w-10 bg-gray-300"></div>
          </div>
          <Link
            to="/register"
            className="bg-blue-100 text-blue-500 p-3 text-center block rounded-full"
          >
            create an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
