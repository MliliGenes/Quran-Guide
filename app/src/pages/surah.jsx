import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSurah } from "../data/quranSlice";
import Page from "../components/page";
import Header from "../components/header";
import Loader from "../components/loader";
import Footer from "../components/footer";

export default function Surah() {
  const { number } = useParams();
  const dispatch = useDispatch();
  const surah = useSelector((state) => state.quran.surah);
  const isLoading = useSelector((state) => state.quran.surahLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [number]);

  useEffect(() => {
    dispatch(getSurah(number));
  }, [number]);

  const surahPages = surah.pages?.map((page) => (
    <Page key={page.number} props={page} surahNumber={surah.number} />
  ));

  return (
    <div className="bg-orange-50 dark:bg-gray-800  font-poppin">
      <div className="min-h-screen">
        <Header back={true} to="/" />
        {!isLoading ? (
          <>
            <div className=" min-h-48 bg-gradient-to-r from-orange-400 to-orange-300 flex-col gap-2  flex justify-center items-center shadow-sm dark:from-blue-400 dark:to-blue-300 py-5 relative">
              {surah.number < 114 && (
                <Link
                  to={"/surahs/" + (+surah.number + 1)}
                  className="absolute right-2 rounded flex justify-center items-center  inset-y-2 w-20"
                >
                  <span className="border-t-4 border-r-4 rotate-45 border-white size-6 dark:border-slate-700"></span>
                </Link>
              )}
              {surah.number > 1 && (
                <Link
                  to={"/surahs/" + (+surah.number - 1)}
                  className="absolute left-2 rounded flex justify-center items-center  inset-y-2 w-20"
                >
                  <span className="border-b-4 border-l-4 rotate-45 border-white size-6 dark:border-slate-700"></span>
                </Link>
              )}
              <h2 className="relative font-montserrat font-bold text-xl text-orange-400 dark:text-blue-400 number before:bg-orange-50 z-0 mb-4 before:rounded dark:before:bg-slate-800">
                {surah.number}
              </h2>
              <h1 className="text-7xl text-white dark:text-gray-800 text-center  font-uthmani ">
                {surah.name}
              </h1>
              <p className="text-white text-lg flex flex-col items-center mb-2 dark:text-slate-800">
                {surah.englishName}
                <span className="text-sm">
                  ({surah.englishNameTranslation})
                </span>
              </p>

              <div className="flex gap-8 text-sm font-semibold  text-white dark:text-slate-800">
                <span>{surah.ayahsNumber} Ayahs</span>
                <span>{surah.pages?.length} Pages</span>
                <span>{surah.revelationType}</span>
              </div>
            </div>
            <div className="max-w-2xl mx-auto ">
              <div
                className="flex flex-col divide-y divide-orange-400 dark:divide-blue-300 "
                dir="rtl"
              >
                {surahPages}
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </div>
  );
}
