import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurahCard from "./surahCard";
import Loader from "./loader";
import { addMoreSurahs } from "../data/quranSlice";

export default function SurahsGrid() {
  const dispatch = useDispatch();
  const allSurahs = useSelector((state) => state.quran.surahs);
  const isloading = useSelector((state) => state.quran.surahsLoading);
  const length = useSelector((state) => state.quran.surahsNumber);

  let surahsToShow = allSurahs.slice(0, length);

  let cards = surahsToShow.map((surah) => (
    <SurahCard key={surah.number} props={surah} />
  ));

  return (
    <div className="p-10 pt-8">
      <h1 className="text-5xl font-montserrat text-orange-400 font-bold text-center mb-4 dark:text-blue-400">
        Quran Growth Journey
      </h1>
      <p className=" max-w-3xl mx-auto mb-8 text-sm text-center text-slate-500 dark:text-slate-100">
        Embarking on a Quranic Exploration: Nurturing Spiritual Growth, Finding
        Insight, and Illuminating Paths to Personal and Collective
        Enlightenment.
      </p>

      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-2 ">
        {!isloading ? (
          <>
            {cards}
            {allSurahs?.length > length && (
              <button
                className="col-span-3 flex justify-center bg-orange-400 text-white py-3 text-md font-montserrat  rounded mt-2 dark:text-slate-800 dark:bg-blue-300"
                onClick={() => dispatch(addMoreSurahs())}
              >
                Load more
              </button>
            )}
          </>
        ) : (
          <Loader />
        )}
        {allSurahs?.length === 0 && !isloading && (
          <p className="text-center col-span-3 font-semibold italic text-slate-500 dark:text-slate-200">
            No Surahs Found
          </p>
        )}
      </div>
    </div>
  );
}
