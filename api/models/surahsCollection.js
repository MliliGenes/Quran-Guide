import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SurahSchema = new Schema({
  number: Number,
  name: String,
  englishName: String,
  englishNameTranslation: String,
  revelationType: String,
  ayahsNumber: Number,
});

const SurahsCollectionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  surahs: [SurahSchema],
});

const SurahsCollection = mongoose.model(
  "SurahsCollection",
  SurahsCollectionSchema
);

export default SurahsCollection;
