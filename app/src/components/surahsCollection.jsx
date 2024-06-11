import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserCollections } from "../../../api/controllers/collectionController";
import { getCollections } from "../data/quranSlice";
import Loader from "./loader";

export default function SurahsCollection() {
  const user = useSelector((state) => state.quran.user);
  const collections = useSelector((state) => state.quran.collections);
  const isLoading = useSelector((state) => state.quran.collectionsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollections({ userID: user.id, token: user.token }));
  }, [dispatch]);

  let collectionCards = collections.map((collection, index) => (
    <Link key={collection._id} to={"/collection/" + collection._id}>
      <div className="px-3 p-2 border border-orange-300 dark:border-blue-300 flex gap-4 rounded hover:border-orange-400 dark:hover:border-blue-400 min-h-20 cursor-pointer relative ">
        <div className="w-10 flex items-center justify-center text-md number relative z-0  font-bold text-white before:bg-orange-400 before:rounded dark:before:bg-blue-400">
          {index + 1}
        </div>
        <div className="flex justify-between items-center flex-1 p-2">
          <div className="flex flex-col justify-end gap-1  h-full">
            <span className="text-lg font-montserrat font-semibold text-orange-400 dark:text-blue-400">
              {collection.name}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {collection.description.length > 20
                ? `${collection.description.substring(0, 20)}...`
                : collection.description}
            </span>
          </div>
          <div className="flex flex-col justify-end gap-1 h-full items-end">
            <span className="text-right text-sm text-orange-400 dark:text-blue-400 font-bold">
              {collection.surahs?.length} Surahs
            </span>
          </div>
        </div>
      </div>
    </Link>
  ));
  return (
    <div className="p-10 pt-8">
      <h1 className="text-5xl font-montserrat text-orange-400 font-bold text-center mb-4 dark:text-blue-400">
        Surahs Collections
      </h1>
      <p className="max-w-3xl mx-auto mb-8 text-sm text-center text-slate-500 dark:text-slate-100">
        Here are your curated collections of Surahs.
      </p>
      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-2 ">
        {!isLoading ? (
          <>
            {collectionCards}
            <Link to="/create-collection">
              <div className="px-3 p-2 border border-orange-300 dark:border-blue-300 flex gap-2 rounded hover:border-orange-400 dark:hover:border-blue-400 min-h-20 flex-col items-center justify-center h-full ">
                <div className="size-10  relative flex justify-center items-center ">
                  <span className="absolute w-full h-1 bg-orange-400 dark:bg-blue-400 rounded"></span>
                  <span className="absolute w-full h-1 bg-orange-400 dark:bg-blue-400 rotate-90 rounded"></span>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
