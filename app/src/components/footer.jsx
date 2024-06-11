import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../data/quranSlice";

export default function Footer() {
  const dispatch = useDispatch();
  function toggle() {
    dispatch(toggleTheme());
  }
  let theme = useSelector((state) => state.quran.theme);
  return (
    <div className="min-h-44  bg-white dark:bg-gray-700    px-8">
      <div className="flex justify-between py-6  max-w-7xl mx-auto">
        <div className="max-w-96">
          <Link
            to="/"
            className="text-3xl font-montserrat font-semibold text-orange-400 dark:text-blue-400  "
          >
            Quran
            <span className="font-normal text-orange-300 dark:text-blue-300">
              Guide
            </span>
            .com
          </Link>
          <h1 className="text-lg font-montserrat font-semibold text-slate-800 dark:text-slate-300 mb-1 mt-2">
            Read, study, and learn The Holy Quran.
          </h1>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            QuranGuide.com is a Sadaqah Jariyah. Our mission is to make it
            accessible for everyone to read, study, and understand The Holy
            Quran. The Holy Quran is known by many names including Al-Quran
            Al-Kareem, Al-Ketab, Al-Furqan, Al-Maw'itha, Al-Thikr, and Al-Noor.
          </p>
          <a
            href=""
            className="text-sm text-white py-2 px-4  flex justify-center items-center bg-orange-400 dark:bg-blue-400  rounded mt-3"
          >
            Join our Github
          </a>
        </div>
        <div className="max-w-96 flex self-end">
          <button
            onClick={toggle}
            className=" text-white bg-orange-400 dark:bg-blue-400 py-2 px-4 rounded text-sm"
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
        </div>
      </div>
    </div>
  );
}
