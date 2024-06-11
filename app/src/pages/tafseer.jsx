import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import { getTafseer } from "../data/quranSlice";
import Footer from "../components/footer";

export default function Tafseer() {
  const dispatch = useDispatch();
  const { surahNumber, ayahNumber } = useParams();

  useEffect(() => {
    dispatch(getTafseer({ surahNumber, ayahNumber }));
  }, [surahNumber, ayahNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let isLoading = useSelector((state) => state.quran.tafseerLoading);
  let { tafseer, ayah, surah } = useSelector((state) => state.quran.tafseer);

  const TextWithHighlight = (text) => {
    // Regular expression to match text within parentheses
    const regex = /\(([^)]+)\)/g;

    // Function to replace matched text with highlighted span
    const highlightedText = text.replace(regex, (match, p1) => {
      if (match.startsWith("(") && match.endsWith(")")) {
        // Remove the surrounding parentheses for the highlighted text
        const content = match.slice(1, -1);
        return `<span class="text-orange-400">(${content})</span>`;
      } else if (match.startsWith("[") && match.endsWith("]")) {
        // Remove the surrounding square brackets for the highlighted text
        const content = match.slice(1, -1);
        return `<span class="text-blue-400">${content}</span>`;
      }
      return match;
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>;
  };

  return (
    <div className="bg-orange-50 dark:bg-gray-800 font-poppin">
      <div className="min-h-screen ">
        <Header back={true} to={"/surahs/" + surahNumber} />
        {!isLoading ? (
          <>
            <div className=" min-h-48 bg-gradient-to-r from-orange-400 to-orange-300 flex-col gap-2  flex justify-center items-center shadow-sm dark:from-blue-400 dark:to-blue-300 py-5 relative">
              {ayah.numberInSurah < surah.ayahsNumber && (
                <Link
                  to={`/tafseer/${surah.number}/` + (+ayah.numberInSurah + 1)}
                  className="absolute right-2 rounded flex justify-center items-center  inset-y-2 w-20"
                >
                  <span className="border-t-4 border-r-4 rotate-45 border-white size-6 dark:border-slate-700"></span>
                </Link>
              )}
              {ayah.numberInSurah > 1 && (
                <Link
                  to={`/tafseer/${surah.number}/` + (+ayah.numberInSurah - 1)}
                  className="absolute left-2 rounded flex justify-center items-center  inset-y-2 w-20"
                >
                  <span className="border-b-4 border-l-4 rotate-45 border-white size-6 dark:border-slate-700"></span>
                </Link>
              )}
              <h1 className="text-5xl text-white dark:text-gray-800 text-center  font-uthmani ">
                {surah.name}
              </h1>
              <p className="text-white text-sm flex flex-col items-center dark:text-slate-800 mb-2">
                {surah.englishName}
                <span className="text-xs">
                  ({surah.englishNameTranslation})
                </span>
              </p>

              <h2
                className="text-4xl text-white dark:text-gray-800 text-center  font-uthmani cursor-pointer max-w-5xl  leading-loose"
                dir="rtl"
              >
                {ayah.text}
                <span className="cursor-pointer text-5xl mx-2 font-number text-white dark:text-slate-800">
                  {ayah.numberInSurah}
                </span>
              </h2>
            </div>
            <div
              className="max-w-3xl mx-auto text-black dark:text-slate-100 leading-normal text-center py-10 text-2xl font-uthmani px-5"
              dir="rtl"
            >
              <h1 className="text-4xl font-uthmani text-center dark:text-slate-100 items-center mb-4">
                {tafseer.tafseer_name}
              </h1>
              {tafseer.text}
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
