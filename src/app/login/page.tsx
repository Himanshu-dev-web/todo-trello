"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { email, password } = user;
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isFormValid) {
       // console.log(user);

        const response = await axios.post("/api/users/login", user);

        if (response.status === 200) {
        
          const loadingToast = toast.loading("Loggin in...");
          toast.success(
            `${response.data.user.username} ${response.data.message}`,
            { id: loadingToast }
          );
          console.log("Login Successful");
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 2 seconds
          router.replace("/");
        } else {
          const loadingToast = toast.loading("Saving...");
          toast.error("Failed to Login!", { id: loadingToast });
        }
      }
    } catch (error: any) {
      //console.error("message ", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-400">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md sm:p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />

        <h2 className="text-3xl font-bold text-center text-black">
          Welcome back to <span className="text-purple-600">Workflo</span>!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2 mt-2 text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          >
            Log in
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
