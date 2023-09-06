
import { useNavigate, useLocation } from "react-router-dom";
import React , { useState, ChangeEvent } from "react";
import { verifyOtpOfMail } from "../../api/endpoints/auth/user-auth";
import { registerUser } from "../../api/endpoints/auth/user-auth";
import { UserData } from "../../types/userType";
import { notify, ToastContainer } from "../../utils/notificationUtils";
import { AxiosError } from "axios";
import { ScaleLoader } from "react-spinners";

const OtpVerifyComponent: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const userInfo = location.state;
  const [loading,setLoading] = useState(false)

  const handleOtpVerification = async (otp: string) => {
    try {
      setLoading(true);
      const otpResponse = await verifyOtpOfMail(otp);
      setLoading(false)
      return otpResponse?.data.message;
    } catch (error) {
      console.error(error);
      notify("Error verifying OTP", "error");
      throw error;
    }
  };

  const handleUserRegistration = async (userInfo: UserData) => {
    try {
      setLoading(true);
      const registerResponse = await registerUser(userInfo);
      setLoading(false);
      if (registerResponse?.data.message === "User signup successful") {
        notify("User registered successfully!", "success");
        return true;
      }
      return false;
    } catch (error: unknown) {
      console.error("Error during registration:", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred during verification.", "error");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!location.state) {
        notify("User information not available", "error");
        return;
      }

      const otpMessage = await handleOtpVerification(otp.toString());

      if (otpMessage === "OTP expired") {
        setError("OTP expired");
        setTimeout(() => navigate("/signup"), 3000);
      } else if (otpMessage === "Invalid OTP") {
        setError("Enter valid OTP");
      } else if (otpMessage === "OTP verified") {
        const registrationSuccessful = await handleUserRegistration(userInfo);
        if (registrationSuccessful) {
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setTimeout(() => navigate("/signup"), 3000);
        }
      }
    } catch (error: unknown) {
      notify("Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
          <ScaleLoader color="#007BFF" loading={true} />
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-4">Email OTP Verification</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label htmlFor="otpInput" className="mb-2">
          Enter OTP:
        </label>
        <input
          type="number"
          id="otpInput"
          name="otp"
          pattern="[0-9]{6}"
          className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={otp}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setOTP(e.target.value);
          }}
          required
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit OTP
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OtpVerifyComponent;
