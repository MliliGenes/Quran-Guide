import Surah from "../models/surah.js";

export const getSurah = async (req, res) => {
  let number = req.params.number;
  try {
    const id = await Surah.findOne({ number: number });
    const surah = await Surah.aggregate([
      {
        $match: {
          _id: id._id,
        },
      },
      { $unwind: "$ayahs" },
      {
        $group: {
          _id: {
            surahId: "$_id",
            page: "$ayahs.page",
          },
          surahDetails: {
            $first: {
              number: "$number",
              name: "$name",
              englishName: "$englishName",
              englishNameTranslation: "$englishNameTranslation",
              revelationType: "$revelationType",
              ayahsNumber: "$ayahsNumber",
            },
          },
          ayahs: {
            $push: {
              number: "$ayahs.number",
              text: "$ayahs.text",
              numberInSurah: "$ayahs.numberInSurah",
              ruku: "$ayahs.ruku",
              hizbQuarter: "$ayahs.hizbQuarter",
              sajda: "$ayahs.sajda",
            },
          },
        },
      },
      {
        $sort: { ayahs: 1 },
      },
      {
        $group: {
          _id: "$_id.surahId",
          number: { $first: "$surahDetails.number" },
          name: { $first: "$surahDetails.name" },
          englishName: { $first: "$surahDetails.englishName" },
          englishNameTranslation: {
            $first: "$surahDetails.englishNameTranslation",
          },
          revelationType: { $first: "$surahDetails.revelationType" },
          ayahsNumber: { $first: "$surahDetails.ayahsNumber" },
          pages: {
            $push: {
              page: "$_id.page",
              ayahs: "$ayahs",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          number: 1,
          name: 1,
          englishName: 1,
          englishNameTranslation: 1,
          revelationType: 1,
          ayahsNumber: 1,
          pages: 1,
        },
      },
    ]);

    res.json(surah[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSurahs = async (req, res) => {
  try {
    let surahs = await Surah.find(
      {},
      {
        name: 1,
        number: 1,
        englishName: 1,
        englishNameTranslation: 1,
        revelationType: 1,
        ayahsNumber: 1,
      }
    );
    res.json(surahs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSurahBysearchQuery = async (req, res) => {
  let searchQuery = req.params.searchQuery;
  try {
    let surahs = await Surah.find(
      {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { englishName: { $regex: searchQuery, $options: "i" } },
          { englishNameTranslation: { $regex: searchQuery, $options: "i" } },
        ],
      },
      {
        name: 1,
        number: 1,
        englishName: 1,
        englishNameTranslation: 1,
        revelationType: 1,
        ayahsNumber: 1,
      }
    );
    console.log(surahs);
    res.json(surahs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSurahsNames = async (req, res) => {
  try {
    let surahs = await Surah.find({}, { number: 1, englishName: 1, _id: 0 });
    res.json(surahs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
