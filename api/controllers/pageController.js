import Page from "../models/page.js";

export const getSurahInPages = async (req, res) => {
  try {
    const surahs = await Page.find({});
    res.json(surahs);
  } catch (err) {
    res.status(404).json({ message: "error" });
  }
};

export const getSurahPage = async (req, res) => {
  let pageNumber = parseInt(req.params.number, 10);

  try {
    const surahs = await Page.find({ page: pageNumber });
    res.json(surahs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
