import mongoose from "mongoose";

const AyahSchema = new mongoose.Schema({
  number: Number,
  text: String,
  numberInSurah: Number,
  juz: Number,
  manzil: Number,
  page: Number,
  ruku: Number,
  hizbQuarter: Number,
  sajda: Boolean,
});

const SurahSchema = new mongoose.Schema({
  number: Number,
  name: String,
  englishName: String,
  englishNameTranslation: String,
  revelationType: String,
  ayahs: [AyahSchema],
});

const PageSchema = new mongoose.Schema({
  pageNumber: Number,
  surahs: [SurahSchema],
});

const Page = mongoose.model("Page", PageSchema);

export default Page;
