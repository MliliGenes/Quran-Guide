import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollection, getCollection } from "../data/quranSlice";
import Loader from "../components/loader";
import SurahCard from "../components/surahCard";

export default function Collection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.quran.collection);
  const isloading = useSelector((state) => state.quran.collectionLoading);
  const user = useSelector((state) => state.quran.user);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCollection({ id, token: user.token }));
  }, [id]);
  let cards = collection?.surahs?.map((surah) => (
    <SurahCard key={surah.number} props={surah} />
  ));

  function handelDelete(id) {
    dispatch(deleteCollection({ id, token: user.token }));
    navigate("/");
  }

  return (
    <div className="bg-orange-50 dark:bg-gray-800  font-poppin">
      <div className="min-h-screen">
        <Header back={true} to="/" />
        {!isloading ? (
          <>
            <div className="min-h-48 bg-gradient-to-r from-orange-400 to-orange-300 flex-col gap-2  flex justify-center items-center shadow-sm dark:from-blue-400 dark:to-blue-300 py-5 ">
              <h1 className="text-5xl font-montserrat text-orange-50 dark:text-slate-800 font-bold text-center">
                {collection?.name}
              </h1>
              <p className="text-xl text-orange-50 dark:text-slate-800 mb-2">
                {collection?.description}
              </p>
              <div className=" flex gap-5">
                <Link
                  to={"/collection/edit/" + collection._id}
                  className="bg-green-500 py-2 px-4 rounded text-white"
                >
                  Update Collection
                </Link>
                <button
                  className="bg-red-500 py-2 px-4 rounded text-white"
                  onClick={() => handelDelete(collection._id)}
                >
                  Delete Collection
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 max-w-7xl mx-auto gap-2 py-8">
              {cards}
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
