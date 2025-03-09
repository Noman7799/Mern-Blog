import { useState, useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../Components/Logo";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      setErrorMessage("Please fill all fields");
      setLoading(true);
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/Signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "fail" || data.status === "error") {
        setErrorMessage(data.data.error);
        setFormData({ email: "", password: "" });
        setLoading(true);
        return;
      }

      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Failed to Sign in. Please try again later.");
      setFormData({ email: "", password: "" });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setLoading(false); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="parent py-5 md:h-screen flex flex-col justify-center gap-5 items-center md:flex-row">
      <div className="logo flex flex-col gap-3 text-center">
        <Logo />
        <p className="max-w-lg text-gray-500 text-sm">
          This is a demo project. You can sign in with your email and password
          or with Google.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full md:w-[400px] flex flex-col gap-3"
      >
        {/* Email */}
        <div className="email">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <IoMdMail />
            </span>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              value={formData.email}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        {/* Password */}
        <div className="password">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="flex relative">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <RiLockPasswordFill />
            </span>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="*******"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg px-4 py-3 text-sm font-medium tracking-w-normal text-white transition duration-300 ease-in-out ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            } focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div>
          <p className="font-semibold">
            Don't have an account?{" "}
            <span className="text-blue-500">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error: </span> {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
