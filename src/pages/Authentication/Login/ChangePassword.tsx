import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
type Props = {};

const ChangePassword = (props: Props) => {
  const { userId } = useParams<string>();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

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
      const { data: result } = await axios.patch(
        `http://localhost:5000/api/user/change-password`,
        {
          user_id: userId,
          password: data?.password,
        }
      );

      console.log(result);
    } catch (err) {
      console.log(err);
      cogoToast.error("something went wrong");
    }

    console.log(data);
  });

  return (
    <div className="grid place-items-center h-screen">
      <div className="change-password-form bg-white p-12 sm:w-[28rem]">
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
