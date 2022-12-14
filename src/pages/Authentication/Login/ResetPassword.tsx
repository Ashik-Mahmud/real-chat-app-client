import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { server_url } from "../../../config/config";

type Props = {};

const ResetPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /* handle reset password link */
  const handleResetPassword = async () => {
    if (!email) return cogoToast.warn("Please enter your email");

    try {
      setLoading(true);
      cogoToast.loading("Sending reset password link...");
      const { data } = await axios.post(
        `${server_url}/user/send-reset-password-link`,
        {
          email,
        }
      );
      if (data?.success) {
        swal({
          title: "Reset Password Link Sent",
          text: "Please check your email for the reset password link",
          icon: "success",
          buttons: ["cancel", "Ok"],
        });
        setEmail("");
        setLoading(false);
      } else {
        cogoToast.error("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      const { data } = (err as any).response;
      (cogoToast.loading("Sending reset password link...") as any).then(() => {
        cogoToast.error(data.message);
        setLoading(false);
      });
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-50  sm:p-0">
      <div className="bg-white w-full  sm:w-[30rem] p-8 shadow border">
        <div className="logo my-4">
          <h3 className="text-2xl font-bold ">Reset Password</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              placeholder="Enter your email"
              className="border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {loading ? (
            <button
              className="bg-blue-500 text-white p-4 rounded-md cursor-not-allowed opacity-75"
              disabled
            >
              Sending reset password link...
            </button>
          ) : (
            <button
              onClick={handleResetPassword}
              className="bg-blue-500 text-white p-4 rounded-md"
            >
              Reset Password
            </button>
          )}

          <div className="flex justify-center items-center gap-2">
            <span>Don't have an account?</span>
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
