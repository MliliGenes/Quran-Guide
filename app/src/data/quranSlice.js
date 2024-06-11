import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSurahs = createAsyncThunk("quran/getSurahs", async () => {
  const res = await axios.get("http://localhost:3000/api/quran/surahs");
  return res.data;
});

export const searchSurah = createAsyncThunk(
  "quran/searchSurah",
  async (searchQuery) => {
    const res = await axios.get(
      `http://localhost:3000/api/quran/surahs/search/${searchQuery}`
    );
    return res.data;
  }
);

export const getSurah = createAsyncThunk("quran/getSurah", async (number) => {
  const res = await axios.get(
    `http://localhost:3000/api/quran/surahs/${number}`
  );
  return res.data;
});

export const getTafseer = createAsyncThunk(
  "quran/getTafseer",
  async (query) => {
    const res = await axios.get(
      `http://localhost:3000/api/quran/tafser/${query.surahNumber}/${query.ayahNumber}`
    );
    return res.data;
  }
);

export const register = createAsyncThunk("quran/register", async (formData) => {
  console.log(formData);
  const res = await axios.post(
    "http://localhost:3000/api/quran/users/register",
    formData
  );
  return res.data;
});

export const login = createAsyncThunk("quran/login", async (formData) => {
  const res = await axios.post(
    "http://localhost:3000/api/quran/users/login",
    formData
  );
  return res.data;
});

export const createCollection = createAsyncThunk(
  "quran/createCollection",
  async (collection) => {
    const res = await axios.post(
      "http://localhost:3000/api/quran/collections/create",
      collection
    );
    return res.data;
  }
);

export const getCollections = createAsyncThunk(
  "quran/getCollections",
  async ({ userID, token }) => {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      `http://localhost:3000/api/quran/collections/${userID}`,
      { headers }
    );
    return res.data;
  }
);

export const getCollection = createAsyncThunk(
  "quran/getCollection",
  async ({ id, token }) => {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      `http://localhost:3000/api/quran/collection/${id}`,
      { headers }
    );
    return res.data;
  }
);

export const deleteCollection = createAsyncThunk(
  "quran/deleteCollection",
  async ({ id, token }) => {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
    const res = await axios.delete(
      `http://localhost:3000/api/quran/collection/delete/${id}`,
      { headers }
    );
    return res.data;
  }
);

export const updateCollection = createAsyncThunk(
  "quran/updateCollection",
  async ({ id, collection, token }) => {
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };

    const res = await axios.put(
      `http://localhost:3000/api/quran/collection/update/${id}`,
      collection,
      { headers }
    );
    return res.data;
  }
);

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

let initTheme = localStorage.getItem("theme") || "light";
const Quran = createSlice({
  name: "quran",
  initialState: {
    isAuthenticated: getLocalStorage("isAuthenticated") || false,
    loginLoading: false,
    loginError: "",
    isRegistered: false,
    registerLoading: false,
    registerError: "",
    user: JSON.parse(getLocalStorage("user")) || {},
    userLoading: true,
    surahs: [],
    surahsLoading: true,
    surah: {},
    surahLoading: true,
    tafseer: {},
    tafseerLoading: true,
    collections: [],
    collectionsLoading: true,
    collection: {},
    collectionLoading: true,
    theme: initTheme,
    searchQuery: "",
    surahsNumber: 12,
  },
  reducers: {
    setSurahs: (state, action) => {
      state.surahs = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addMoreSurahs: (state, action) => {
      state.surahsNumber += 12;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      loginError: "";
      registerError: "";
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
    resetRegister: (state) => {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurahs.fulfilled, (state, action) => {
        state.surahs = action.payload;
        state.surahsLoading = false;
      })
      .addCase(getSurahs.rejected, (state, action) => {
        state.surahsLoading = false;
      })
      .addCase(getSurah.fulfilled, (state, action) => {
        state.surah = action.payload;
        state.surahLoading = false;
      })
      .addCase(getSurah.rejected, (state, action) => {
        state.surahLoading = false;
      })
      .addCase(searchSurah.fulfilled, (state, action) => {
        state.surahs = action.payload;
        state.surahLoading = false;
      })
      .addCase(searchSurah.rejected, (state, action) => {
        state.surahLoading = false;
      })
      .addCase(getTafseer.fulfilled, (state, action) => {
        state.tafseer = action.payload;
        state.tafseerLoading = false;
      })
      .addCase(getTafseer.rejected, (state, action) => {
        state.tafseerLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.registerError = action.payload.message;
          state.isRegistered = false;
          state.registerLoading = false;
          return;
        }
        state.isRegistered = true;
        state.registerLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegistered = false;
        state.registerLoading = false;
        state.registerError = "Something went wrong. Please try again.";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.loginError = action.payload.message;
          state.isAuthenticated = false;
          setLocalStorage("isAuthenticated", false);
          state.loginLoading = false;
          return;
        }
        state.user = action.payload;
        setLocalStorage("user", JSON.stringify(action.payload));
        state.isAuthenticated = true;
        setLocalStorage("isAuthenticated", true);
        state.loginLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = "Wrong email or password";
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.collectionsLoading = false;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.collectionsLoading = false;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.collection = action.payload;
        state.collectionLoading = false;
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.collectionLoading = false;
      });
  },
});
export const {
  setSurahs,
  toggleTheme,
  setSearchQuery,
  addMoreSurahs,
  logOut,
  resetRegister,
} = Quran.actions;
export default Quran.reducer;
