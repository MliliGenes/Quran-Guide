import mongoose from "mongoose";

const tafseerSchema = new mongoose.Schema({
  tafseer_id: {
    type: Number,
    required: true,
  },
  tafseer_name: {
    type: String,
    required: true,
  },
  ayah_url: {
    type: String,
    required: true,
  },
  ayah_number: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Tafseer = mongoose.model("Tafseer", tafseerSchema);

export default Tafseer;
