import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    otp: "",
    showOtpInput: false,
    password: "",
    showPasswordInput: false,
  });

  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false); // New state variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email } = user;
      if (email) {
        await axios.post("https://lcf-backend.onrender.com/api/sendOTP", {
          email,
        });
        toast.success("OTP sent successfully.", { autoClose: 3000 });
        setUser({
          ...user,
          showOtpInput: true,
        });
        setEmailDisabled(true); // Disable email input after sending OTP
      } else {
        toast.error("Please enter your email.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again later.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, otp } = user;
      if (otp) {
        const res = await axios.post(
          "https://lcf-backend.onrender.com/api/verifyOTP",
          { email, otp }
        );
        if (res.data === "OTP verified successfully") {
          toast.success("OTP verified successfully.", { autoClose: 3000 });
          setUser({
            ...user,
            showOtpInput: false,
            showPasswordInput: true,
          });
          setOtpVerified(true);
          setEmailDisabled(true); // Keep email input disabled after OTP is verified
        } else {
          toast.error("Invalid OTP. Please try again.", { autoClose: 3000 });
        }
      } else {
        toast.error("Please enter the OTP.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again later.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = user;
      if (email && password) {
        const res = await axios.post(
          "https://lcf-backend.onrender.com/api/auth/register",
          user
        );
        toast.success(res.data.message, { autoClose: 3000 });
        setUser({
          email: "",
          otp: "",
          showOtpInput: false,
          password: "",
          showPasswordInput: false,
        });
        setEmailDisabled(false); // Reset email disabled state after registration
        navigate("/login");
      } else {
        toast.error("Invalid details.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user. Please try again later.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center min-h-screen p-10">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl mb-5 font-bold text-purple-500">
            LetsCoFound
          </h1>
          <p className="mb-6 text-gray-600">
            Connect with entrepreneurs and startups.
          </p>

          <form>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
              <input
                className="flex-grow p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={emailDisabled} // Disable email input based on state
              />
              {!otpVerified && (
                <button
                  onClick={sendOTP}
                  className="text-sm font-bold rounded-lg text-white bg-purple-500 p-3 hover:bg-purple-600 flex items-center justify-center"
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-t-2 border-t-white border-gray-200 border-solid rounded-full animate-spin"></div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              )}
            </div>

            {user.showOtpInput && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-4">
                <input
                  className="flex-grow p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  name="otp"
                  value={user.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  required
                />
                {user.showOtpInput && !otpVerified && (
                  <button
                    className="text-white bg-purple-500 p-3 rounded-lg hover:bg-purple-600 flex items-center justify-center"
                    onClick={verifyOTP}
                    type="button"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-t-2 border-t-white border-gray-200 border-solid rounded-full animate-spin"></div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                )}
              </div>
            )}

            {user.showPasswordInput && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-4">
                <input
                  className="flex-grow p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="text-white bg-purple-500 p-3 rounded-lg hover:bg-purple-600 flex items-center justify-center"
                  onClick={register}
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-t-2 border-t-white border-gray-200 border-solid rounded-full animate-spin"></div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            )}
          </form>

          <h4 className="text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              className="text-purple-500 font-bold hover:underline"
              to="/login"
            >
              Sign In
            </Link>
          </h4>
          <div className="text-center text-sm text-gray-500 mt-6">
            By Signing up, you agree to our{" "}
            <Link to="/policy">
              <span className="text-purple-500 font-bold underline">
                Privacy Policy
              </span>
              .
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
