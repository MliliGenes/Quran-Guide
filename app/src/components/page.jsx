import React from "react";
import { useNavigate } from "react-router-dom";

export default function Page({ props, surahNumber }) {
  // const tafseer = useSelector((state) => state.quran.tafseer);
  // const fetchTafseer = (surahNumber, ayahNumber) => {
  //   dispatch(getTafseer({ surahNumber, ayahNumber }));
  // };

  const navigate = useNavigate();

  return (
    <div className="py-6 px-6 ">
      <div
        className=" font-uthmani text-black dark:text-slate-100 text-3xl leading-loose text-center"
        dir="rtl"
      >
        {props.ayahs.map((ayah) => (
          <span key={ayah.numberInSurah}>
            <span
              className="hover:text-orange-300 cursor-pointer dark:hover:text-sky-300"
              onClick={() =>
                navigate(`/tafseer/${surahNumber}/${ayah.numberInSurah}`)
              }
            >
              {ayah.text}
            </span>
            <span className="cursor-pointer text-4xl mx-2 font-number text-orange-300 dark:text-blue-300 ">
              {ayah.numberInSurah}
            </span>
          </span>
        ))}
      </div>
      <span className="text-xs font-montserrat flex justify-center font-semibold text-slate-800 dark:text-slate-300 mx-5 mt-6">
        {props.page}
      </span>
    </div>
  );
}
