import cogoToast from "cogo-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
type Props = {};

const Register = (props: Props) => {
  const { handleSubmit, register } = useForm();
  /* handle register */

  const onRegisterSubmit = handleSubmit(async (data) => {
    if (
      !data?.name ||
      !data?.email ||
      !data?.password ||
      !data?.confirmPassword
    ) {
      cogoToast.error("Please fill all the fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      cogoToast.error("Password and confirm password does not match");
      return;
    }

    /* handle register */
    console.log(data);
  });

  return (
    <div className="grid place-items-center h-screen bg-gray-50">
      <div className="bg-white w-full sm:w-[30rem] p-8 shadow border">
        <div className="logo my-4">
          <h3 className="text-2xl font-bold ">Register to your account</h3>
        </div>

        <form onSubmit={onRegisterSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="name"
              {...register("name")}
              id="name"
              placeholder="Enter your name"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="password"
              placeholder="Enter your password"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="file">Choose Profile </label>
            <input
              type="file"
              {...register("image")}
              id="file"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md">
            Register account
          </button>

          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-10 bg-gray-300"></div>
            <span className="text-gray-400">or</span>
            <div className="h-[1px] w-10 bg-gray-300"></div>
          </div>
          <Link
            to="/login"
            className="bg-blue-100 block text-center text-blue-500 p-3 rounded-full"
          >
            Login an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
