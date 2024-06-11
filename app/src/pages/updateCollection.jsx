import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import SurahCard from "../components/surahCard";
import {
  addMoreSurahs,
  createCollection,
  getCollection,
  getSurahs,
  searchSurah,
  setSearchQuery,
  updateCollection,
} from "../data/quranSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCollection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.quran.searchQuery);
  const user = useSelector((state) => state.quran.user);
  const collectionToEdit = useSelector((state) => state.quran.collection);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCollection({ id, token: user.token }));
  }, [id]);

  useEffect(() => {
    setCollection(collectionToEdit);
  }, [collectionToEdit]);

  const [collection, setCollection] = useState({
    name: "",
    description: "",
    surahs: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    surahs: "",
  });

  const validateCollection = () => {
    let valid = true;
    let errors = { name: "", description: "", surahs: "" };

    if (collection.name.trim().length < 10) {
      errors.name = "Collection name must be at least 10 characters";
      valid = false;
    }

    if (collection.description.trim().length < 10) {
      errors.description =
        "Collection description must be at least 10 characters";
      valid = false;
    }

    if (collection.surahs.length < 3) {
      errors.surahs = "Collection must have at least 3 surahs";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateCollection()) {
      let { name, description, surahs } = collection;

      let surahCollection = {
        name,
        description,
        surahs,
      };

      dispatch(
        updateCollection({ id, collection: surahCollection, token: user.token })
      );

      navigate("/collection/" + id);
    }
  };

  useEffect(() => {
    searchQuery == ""
      ? dispatch(getSurahs(searchQuery))
      : dispatch(searchSurah(searchQuery));
  }, [searchQuery, dispatch]);

  function toggleToCollection(surah) {
    let flag =
      collection.surahs.filter((s) => s.number === surah.number).length > 0;

    if (flag) {
      setCollection({
        ...collection,
        surahs: collection.surahs.filter((s) => s.number !== surah.number),
      });
    } else {
      setCollection({
        ...collection,
        surahs: [...collection.surahs, surah],
      });
    }
  }

  useEffect(() => {
    console.log(collection.surahs);
  }, [collection.surahs]);

  const allSurahs = useSelector((state) => state.quran.surahs);

  useEffect(() => {
    dispatch(getSurahs());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  const isloading = useSelector((state) => state.quran.surahsLoading);

  let selectedSurahs = collection.surahs?.map((surah) => {
    return (
      <div
        className="px-3 p-2 border border-orange-300 dark:border-blue-300 flex gap-4 rounded hover:border-orange-400 dark:hover:border-blue-400 min-h-20 cursor-pointer bg-orange-400 dark:bg-blue-400"
        onClick={() =>
          toggleToCollection({ name: surah.name, number: surah.number })
        }
        key={surah.number}
      >
        <div className="w-10 flex items-center justify-center text-md number relative z-0  font-bold text-orange-400 before:bg-white before:rounded dark:before:bg-white dark:text-blue-400">
          {surah.number}
        </div>
        <div className="flex justify-between items-center flex-1 p-2">
          <div className="flex flex-col justify-end gap-1  h-full">
            <span className="text-lg font-montserrat font-semibold text-white dark:text-slate-800">
              {surah.englishName}
            </span>
            <span className="text-xs text-slate-200 font-semibold">
              {surah.englishNameTranslation}
            </span>
          </div>
          <div className="flex flex-col justify-end gap-1 h-full items-end">
            <span className="text-right text-md text-white dark:text-slate-800  font-arabic">
              {surah.name}
            </span>
            <span className="text-xs text-slate-200 font-semibold">
              {surah.ayahsNumber} Ayahs
            </span>
          </div>
        </div>
      </div>
    );
  });

  const length = useSelector((state) => state.quran.surahsNumber);
  let surahsToShow = allSurahs.slice(0, length);

  let cards = surahsToShow.map((surah) => {
    let flag =
      collection.surahs.filter((s) => s.number === surah.number).length > 0;

    if (flag) {
      return;
    }

    return (
      <div
        className="px-3 p-2 border border-orange-300 dark:border-blue-300 flex gap-4 rounded hover:border-orange-400 dark:hover:border-blue-400 min-h-20 cursor-pointer"
        onClick={() => toggleToCollection(surah)}
        key={surah.number}
      >
        <div className="w-10 flex items-center justify-center text-md number relative z-0  font-bold text-white before:bg-orange-400 before:rounded dark:before:bg-blue-400">
          {surah.number}
        </div>
        <div className="flex justify-between items-center flex-1 p-2">
          <div className="flex flex-col justify-end gap-1  h-full">
            <span className="text-lg font-montserrat font-semibold text-orange-400 dark:text-blue-400">
              {surah.englishName}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {surah.englishNameTranslation}
            </span>
          </div>
          <div className="flex flex-col justify-end gap-1 h-full items-end">
            <span className="text-right text-md text-orange-400 dark:text-blue-400  font-arabic">
              {surah.name}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {surah.ayahsNumber} Ayahs
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-orange-50 dark:bg-gray-800  font-poppin  flex flex-col ">
      <div className=" min-h-screen">
        <Header back={true} to="/" />
        <>
          <div className="min-h-48 bg-gradient-to-r from-orange-400 to-orange-300 flex-col gap-2  flex justify-center items-center shadow-sm dark:from-blue-400 dark:to-blue-300 py-5 ">
            <h1 className="text-5xl font-montserrat text-orange-50 dark:text-slate-800 font-bold text-center">
              Update Collection
            </h1>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 py-6 max-w-5xl mx-auto  ">
              <div className="flex flex-col gap-1">
                <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
                  Collection Name
                </label>
                <input
                  type="text"
                  className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
                  placeholder="Enter Collection Name"
                  value={collection.name}
                  onChange={(e) =>
                    setCollection({ ...collection, name: e.target.value })
                  }
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-left text-md font-medium text-slate-500 dark:text-slate-200">
                  Collection Description
                </label>
                <textarea
                  className="outline border border-orange-400 outline-0 rounded py-2 px-3 text-md dark:bg-slate-900 dark:text-slate-200 dark:border-blue-400"
                  placeholder="Enter Collection Description"
                  rows="4"
                  value={collection.description}
                  onChange={(e) =>
                    setCollection({
                      ...collection,
                      description: e.target.value,
                    })
                  }
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>

              <button
                className="bg-orange-400 dark:text-salte-200 dark:bg-blue-400 px-3 py-2  rounded text-white text-md cursor-pointer"
                onClick={handleSubmit}
              >
                Update Collection
              </button>
            </div>
            {errors.surahs && (
              <span className="text-red-500 text-sm block text-center">
                {errors.surahs}
              </span>
            )}
            <h2 className="text-center text-4xl font-montserrat font-bold text-orange-400 dark:text-blue-400 mb-4">
              Add some Surahs
            </h2>
            <div className="w-[600px] rounded bg-orange-400 dark:bg-gray-800 h-12 relative flex shadow-sm mx-auto mb-8">
              <input
                type="text"
                className="bg-transparent flex-1 h-full outline-none text-white px-5 text-md font-normal dark:text-white placeholder:text-white"
                placeholder="Search for Surahs ..."
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                value={searchQuery}
              />
              <button
                className="bg-white px-8 rounded-md text-orange-400 border-4 border-orange-400 text-md dark:border-gray-800 dark:text-gray-800 dark:bg-blue-400"
                onClick={() => dispatch(setSearchQuery(""))}
              >
                Clear
              </button>
            </div>
            <div className="grid grid-cols-3 w-full gap-2 mb-10">
              {!isloading ? (
                <>
                  {selectedSurahs}
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
        </>
      </div>
      <Footer />
    </div>
  );
}
