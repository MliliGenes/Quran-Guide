import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, resetRegister } from "../data/quranSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRegistered = useSelector((state) => state.quran.isRegistered);
  const isLoading = useSelector((state) => state.quran.registerLoading);
  const errorMessage = useSelector((state) => state.quran.registerError);

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered]);

  let [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateUserName = () => {
    const userNamePattern = /^[A-Za-z1-9]{3,}$/;
    if (!userNamePattern.test(formData.userName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Username must be at least 3 letters",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "",
      }));
    }
  };

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
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const validateConfirmPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.userName === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.confirmPassword === "" &&
      formData.userName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      setFormData((formData) => ({
        ...formData,
        password: "",
        confirmPassword: "",
      }));
      dispatch(resetRegister());
      console.log("Form data is valid. Submitting form...", formData);
      dispatch(
        register({
          userName: formData.userName,
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
          Create new account
        </h2>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
              User Name
            </label>
            <input
              name="userName"
              type="text"
              className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
              placeholder="Enter your user name"
              value={formData.userName}
              onChange={(e) => {
                setFormData({ ...formData, userName: e.target.value });
              }}
              onBlur={validateUserName}
            />
            {errors.userName && (
              <span className="text-red-500 text-sm text-left">
                {errors.userName}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
              Email
            </label>
            <input
              type="email"
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
          <div className="flex flex-col gap-1">
            <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
              Confirm password
            </label>
            <input
              type="password"
              className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              onBlur={validateConfirmPassword}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm text-left">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 dark:text-salte-200 dark:bg-blue-500 px-3 py-2 mt-4 rounded text-white text-md cursor-pointer"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="text-md dark:text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 dark:text-blue-400 font-normal hover:underline"
            >
              Login
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
