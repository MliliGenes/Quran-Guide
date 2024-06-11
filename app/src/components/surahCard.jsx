import React from "react";
import { Link } from "react-router-dom";

export default function SurahCard({ props }) {
  return (
    <Link
      to={"/surahs/" + props.number}
      className="px-3 p-2 border border-orange-300 dark:border-blue-300 flex gap-4 rounded hover:border-orange-400 dark:hover:border-blue-400 min-h-20"
    >
      <div className="w-10 flex items-center justify-center text-md number relative z-0  font-bold text-white before:bg-orange-400 before:rounded dark:before:bg-blue-400">
        {props.number}
      </div>
      <div className="flex justify-between items-center flex-1 p-2">
        <div className="flex flex-col justify-end gap-1  h-full">
          <span className="text-lg font-montserrat font-semibold text-orange-400 dark:text-blue-400">
            {props.englishName}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {props.englishNameTranslation}
          </span>
        </div>
        <div className="flex flex-col justify-end gap-1 h-full items-end">
          <span className="text-right text-md text-orange-400 dark:text-blue-400  font-arabic">
            {props.name}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {props.ayahsNumber} Ayahs
          </span>
        </div>
      </div>
    </Link>
  );
}
