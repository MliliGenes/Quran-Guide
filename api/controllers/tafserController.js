import Surah from "../models/surah.js";
import Tafseer from "../models/tafser.js";

export const getTasfer = async (req, res) => {
  let surahNumber = parseInt(req.params.surahNumber, 10);
  let ayahNumber = parseInt(req.params.ayahNumber, 10);

  let query = `/quran/${surahNumber}/${ayahNumber}/`;
  try {
    let tafseer = await Tafseer.findOne({ ayah_url: query });

    if (!tafseer) {
      return res.status(404).json({ message: "Tafseer not found" });
    }

    let surahData = await Surah.findOne({ number: surahNumber });

    if (!surahData) {
      return res.status(404).json({ message: "Surah not found" });
    }

    let surah = {
      number: surahData.number,
      englishName: surahData.englishName,
      name: surahData.name,
      englishNameTranslation: surahData.englishNameTranslation,
      ayahsNumber: surahData.ayahsNumber,
      revelationType: surahData.revelationType,
    };

    let ayah = surahData.ayahs.find((a) => a.numberInSurah === ayahNumber);

    if (!ayah) {
      return res.status(404).json({ message: "Ayah not found" });
    }

    res.json({ tafseer, ayah, surah });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
