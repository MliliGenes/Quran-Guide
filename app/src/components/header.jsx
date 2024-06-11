import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logOut, toggleTheme } from "../data/quranSlice";

export default function Header({ back, to }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.quran.isAuthenticated);
  const { userName } = useSelector((state) => state.quran.user);
  const dispatch = useDispatch();
  function toggle() {
    dispatch(toggleTheme());
  }
  let theme = useSelector((state) => state.quran.theme);
  return (
    <header className=" px-6 py-4 flex justify-center  items-center shadow-sm relative">
      <Link
        to="/"
        className="text-3xl font-montserrat font-semibold text-orange-400 dark:text-blue-400 "
      >
        Quran
        <span className="font-normal text-orange-300 dark:text-blue-300">
          Guide
        </span>
        .com
      </Link>
      <div className="absolute right-6 flex items-center gap-4">
        <button
          onClick={toggle}
          className=" text-orange-400 dark:text-blue-400"
        >
          {theme === "light" ? (
            <div className=" flex gap-2">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="circle-half-stroke"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="rotate-180 unchecked-icon svg-inline--fa fa-circle-half-stroke fa-fw"
              >
                <path
                  fill="currentColor"
                  d="M464 256c0-114.9-93.1-208-208-208V464c114.9 0 208-93.1 208-208zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                  className=""
                ></path>
              </svg>{" "}
              <span>Light</span>
            </div>
          ) : (
            <div className=" flex gap-2">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="circle-half-stroke"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="unchecked-icon svg-inline--fa fa-circle-half-stroke fa-fw "
              >
                <path
                  fill="currentColor"
                  d="M464 256c0-114.9-93.1-208-208-208V464c114.9 0 208-93.1 208-208zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                  className=""
                ></path>
              </svg>
              <span>Dark</span>
            </div>
          )}
        </button>
        {isAuthenticated ? (
          <button
            onClick={() => {
              dispatch(logOut());
              navigate("/login");
            }}
            className="bg-orange-400 dark:bg-blue-400 text-white dark:text-slate-800 py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-orange-400 dark:bg-blue-400 text-white dark:text-slate-800 py-2 px-4 rounded"
          >
            Login
          </Link>
        )}
      </div>
      <div className="absolute  left-6 flex  items-center gap-5">
        {back && (
          <Link to={to} className="size-10 text-orange-400 dark:text-blue-400 ">
            <span className="top-1/2  left-4  -translate-y-1/2 absolute border-b-4 border-l-4 rotate-45 border-orange-400 dark:border-blue-400 size-4"></span>
          </Link>
        )}
        {isAuthenticated && (
          <div className="text-orange-400 dark:text-blue-400 capitalize">
            <span className="text-black dark:text-slate-200">
              👋 Welcome back,{" "}
            </span>
            {userName}
          </div>
        )}
      </div>
    </header>
  );
}
