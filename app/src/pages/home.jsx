import React from "react";
import Header from "../components/header";
import Search from "../components/search";
import SurahsGrid from "../components/surahsGrid";
import Footer from "../components/footer";
import SurahsCollection from "../components/surahsCollection";
import { useSelector } from "react-redux";

export default function Home() {
  let isAuthenticated = useSelector((state) => state.quran.isAuthenticated);
  return (
    <div className="bg-orange-50 dark:bg-gray-800  font-poppin  flex flex-col ">
      <div className=" min-h-screen">
        <Header />
        <Search />
        <SurahsGrid />
        {isAuthenticated && <SurahsCollection />}
      </div>
      <Footer />
    </div>
  );
}
