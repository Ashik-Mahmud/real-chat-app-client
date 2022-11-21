import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server_url } from "../../../config/config";
type Props = {};

const ChangePassword = (props: Props) => {
  const { userId } = useParams<string>();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ((userId as any)?.length !== 24) {
      navigate(`/login`);
    }
  }, [userId, navigate]);

  /* handle change password */
  const handleChangePassword = handleSubmit(async (data) => {
    if (!data?.password) return cogoToast.warn("Password field is required");
    if (data?.password?.length < 6)
      return cogoToast.warn("Password should be 6 chars and more");
    if (!data?.confirmPassword)
      return cogoToast.warn("Confirm Password field is required");

    if (data?.password !== data?.confirmPassword) {
      return cogoToast.error("Password does not match");
    }

    try {
      setIsLoading(true);
      const { data: result } = await axios.post(
        `${server_url}/user/change-password`,
        {
          user_id: userId,
          password: data?.password,
        }
      );

      if (result?.success) {
        navigate("/login");
        cogoToast.success(result?.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      cogoToast.error("something went wrong");
    }
  });

  return (
    <div className="grid place-items-center h-screen">
      <div className="change-password-form bg-white p-12  sm:w-[36rem]">
        {userId && (
          <div className="bg-green-50 text-green-500 p-5 rounded my-3 block ">
            Verify successfully done
          </div>
        )}
        <h1 className="text-2xl my-3 mb-5">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <div className="form-group flex flex-col items-start gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control p-4 outline-none border border-gray-300 rounded-md focus:border-blue-500 w-full"
              id="password"
              {...register("password")}
              placeholder="Password"
            />
          </div>
          <div className="form-group flex flex-col items-start gap-1 mt-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="form-control p-4 outline-none border border-gray-300 rounded-md focus:border-blue-500 w-full"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          {isLoading ? (
            <button
              type="submit"
              disabled
              className="btn cursor-not-allowed opacity-75 btn-primary bg-blue-500 text-white p-3 rounded-md w-full mt-4"
            >
              Password Changing...
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white p-3 rounded-md w-full mt-4"
            >
              Change Password
            </button>
          )}
          <Link
            to="/login"
            className="my-5 text-center block text-blue-400 underline"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
