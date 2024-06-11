import mongoose from "mongoose";

const ayahSchema = new mongoose.Schema({
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

const surahSchema = new mongoose.Schema({
  number: Number,
  name: String,
  englishName: String,
  englishNameTranslation: String,
  revelationType: String,
  ayahs: [ayahSchema],
  ayahsNumber: Number,
});

const Surah = mongoose.model("Surah", surahSchema);

export default Surah;
