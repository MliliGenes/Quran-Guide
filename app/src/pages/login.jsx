import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../data/quranSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.quran.isAuthenticated);
  const isLoading = useSelector((state) => state.quran.loginLoading);
  const errorMessage = useSelector((state) => state.quran.loginError);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (
      errors.email === "" &&
      errors.password === "" &&
      formData.email &&
      formData.password
    ) {
      dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-slate-800 font-poppins px-3 py-10">
      <div className="text-center mx-auto max-w-xl">
        <Link
          to="/"
          className="text-4xl font-montserrat font-semibold text-orange-400 dark:text-blue-400"
        >
          Quran
          <span className="font-normal text-orange-300 dark:text-blue-300">
            Guide
          </span>
          .com
        </Link>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 font-montserrat mb-5 mt-4">
          Login to your account
        </h2>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              onBlur={validateEmail}
            />
            {errors.email && (
              <span className="text-red-500 text-sm text-left">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              onBlur={validatePassword}
            />
            {errors.password && (
              <span className="text-red-500 text-sm text-left">
                {errors.password}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 dark:text-slate-200 dark:bg-blue-500 px-3 py-2 mt-4 rounded text-white hover:bg-orange-400 text-md cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="text-md dark:text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 dark:text-blue-400 font-normal hover:underline"
            >
              Register
            </Link>
          </div>
          <div className="text-md dark:text-white">
            Go back to{" "}
            <Link
              to="/"
              className="text-orange-500 dark:text-blue-400 font-normal hover:underline"
            >
              QuranGuide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
