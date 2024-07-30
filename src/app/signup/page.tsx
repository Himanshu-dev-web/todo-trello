"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SignupPage: React.FC = () => {
   const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { email, password, username } = user;
    setIsFormValid(
      email.trim() !== "" && password.trim() !== "" && username.trim() !== ""
    );
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    try {
      if (isFormValid) {
        console.log(user)
       
        const response = await axios.post("/api/users/signup", user);
        console.log(response.status);

        if (response.status === 200) {
          console.log(response);
          const loadingToast = toast.loading("Saving...");
          toast.success(`${response.data.user.username} ${response.data.message}`, { id: loadingToast });
          await new Promise((resolve) => setTimeout(resolve, 1200)); // Wait for 2 seconds
          router.push("/login");
        } else {
          const loadingToast = toast.loading("Saving...");
          toast.error('Failed to save data!', { id: loadingToast });
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
          <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md sm:p-6 lg:p-8">
        {loading ? (
          "loading .."
        ) : (
          <h2 className="text-3xl font-bold text-center text-black">
            Welcome to <span className="text-purple-600">Workflow</span>!
          </h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
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
            className={`w-full px-4 py-2 font-bold text-white rounded focus:outline-none ${
              isFormValid
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
