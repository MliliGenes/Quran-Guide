import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getSurahs,
  searchSurah,
  setSearchQuery,
  setSurahs,
} from "../data/quranSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.quran.searchQuery);

  useEffect(() => {
    searchQuery == ""
      ? dispatch(getSurahs(searchQuery))
      : dispatch(searchSurah(searchQuery));
  }, [searchQuery, dispatch]);

  return (
    <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-300   flex justify-center items-center shadow-sm dark:from-blue-400 dark:to-blue-300">
      <div className="w-[600px] rounded-2xl bg-white dark:bg-gray-800 h-12 relative flex shadow-sm ">
        <input
          type="text"
          className="bg-transparent flex-1 h-full outline-none text-orange-950 px-5 text-md font-normal dark:text-white"
          placeholder="Search for Surahs ..."
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          value={searchQuery}
        />
        <button
          className="bg-orange-400 px-8 rounded-xl text-white border-4 border-white text-md dark:border-gray-800 dark:text-gray-800 dark:bg-blue-400"
          onClick={() => dispatch(setSearchQuery(""))}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
