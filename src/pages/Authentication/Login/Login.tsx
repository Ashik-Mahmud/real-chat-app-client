import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useLoginMutation } from "../../../api/AuthenticationApi";

type Props = {};
const Login = (props: Props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { handleSubmit, register, setValue } = useForm();
  const [loginAuth, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onLoginSubmit = handleSubmit(async (data) => {
    if (!data?.email || !data?.password) {
      cogoToast.error("Please fill all the fields");
      return;
    }
    try {
      await loginAuth({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      cogoToast.error((error as any).data?.message);
    }
  });

  /* handle guest user credentials */
  const handleGuestUserCredential = async () => {
    const isConfirm = await swal({
      title: "Are you sure?",
      text: "You want to login as a guest user",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
    });
    if (isConfirm) {
      setValue("email", "guest@user.com");
      setValue("password", "guest@user");
    }
  };

  useEffect(() => {
    if (data?.token) {
      setCookie("user", { ...data?.user, token: data?.token }, { path: "/" });
      navigate("/messages");
    }
    if (error) {
      cogoToast.error((error as any).data?.message);
    }
  }, [data, navigate, error, cookies, setCookie]);

  return (
    <div className="login grid place-items-center h-screen  bg-gray-50  sm:p-0">
      <div className="login-wrapper  bg-white w-full sm:w-[30rem] p-8 shadow border">
        <div className="logo my-4">
          <h3 className="text-2xl font-bold mb-4">Login to your account</h3>
        </div>

        <form className="flex flex-col gap-4" onSubmit={onLoginSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              className="border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className="border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/reset-password" className="text-blue-500">
              Forgot password?
            </Link>
          </div>

          {isLoading ? (
            <button
              type="submit"
              disabled
              className="bg-blue-500 text-white p-4 rounded-md mt-4 cursor-not-allowed flex items-center justify-center gap-2"
            >
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
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded-md mt-4"
            >
              Login
            </button>
          )}

          <button
            type="button"
            onClick={handleGuestUserCredential}
            className="bg-yellow-50 shadow shadow-yellow-100 border border-yellow-200 text-yellow-600 p-2 rounded-md mt-4"
          >
            Login As Guest
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
