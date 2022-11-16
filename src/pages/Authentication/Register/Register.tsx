import axios from "axios";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../api/AuthenticationApi";
import { upload_api } from "../../../config/config";
import { useAppContext } from "../../../Context/AppProvider";
type Props = {};

const Register = (props: Props) => {
  const { handleSubmit, register } = useForm();
  const [registerAuth, { data, isLoading, error }] = useRegisterMutation();
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAppContext();

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

    if (data?.image?.length > 0) {
      if (data?.image[0].size > 1000000) {
        cogoToast.error("Image size should be less than 1MB");
        return;
      }
      if (!data?.image[0].type.includes("image")) {
        cogoToast.error("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", data.image[0]);
      data.image = formData;
    }
    setUploadLoading(true);
    try {
      /* upload image in imgbb using api call */
      const { data: imageResponse } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${upload_api}`,
        data.image
      );
      data.image = imageResponse.data.url;

      await registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data?.image,
      });
      setUploadLoading(false);
    } catch (error) {
      console.log(error);
      setUploadLoading(false);
    }
  });

  useEffect(() => {
    if (data) {
      cogoToast.success(data?.message);
      navigate("/login");
    }
    if (error) {
      cogoToast.error((error as any)?.data?.message);
    }
  }, [data, navigate, error, user]);

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
            <label htmlFor="file">
              Choose Profile <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              {...register("image")}
              required
              id="file"
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {isLoading || uploadLoading ? (
            <button
              type="submit"
              disabled
              className="bg-blue-400 text-white p-2 rounded-md mt-4 cursor-not-allowed"
            >
              Registering...
            </button>
          ) : (
            <button className="bg-blue-500 text-white p-2 rounded-md">
              Register account
            </button>
          )}

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
