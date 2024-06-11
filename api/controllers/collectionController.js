import SurahsCollection from "../models/surahsCollection.js";

export const createCollection = async (req, res) => {
  const { name, description, userID, surahs } = req.body;

  try {
    const collection = await SurahsCollection.create({
      name,
      description,
      userID,
      surahs,
    });
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserCollections = async (req, res) => {
  const { userID } = req.params;
  console.log(userID);
  try {
    const collections = await SurahsCollection.find({ userID });
    res.json(collections);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCollection = async (req, res) => {
  const { collectionID } = req.params;
  try {
    const collection = await SurahsCollection.findById(collectionID);
    res.json(collection);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteCollection = async (req, res) => {
  const { collectionID } = req.params;
  try {
    const collection = await SurahsCollection.findByIdAndDelete(collectionID);
    res.json(collection);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateCollection = async (req, res) => {
  const { collectionID } = req.params;
  const { name, description, surahs } = req.body;
  try {
    const collection = await SurahsCollection.findByIdAndUpdate(
      collectionID,
      {
        name,
        description,
        surahs,
      },
      { new: true }
    );
    res.json(collection);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
