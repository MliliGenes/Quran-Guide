import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/home";
import Surah from "./pages/surah";
import Tafseer from "./pages/tafseer";
import Register from "./pages/register";
import Login from "./pages/login";
import { logOut } from "./data/quranSlice";
import CreateCollection from "./pages/createCollection";
import Collection from "./pages/collection";
import UpdateCollection from "./pages/updateCollection";

const router = createBrowserRouter([
  {
    path: "/surahs/:number",
    element: <Surah />,
  },
  {
    path: "/tafseer/:surahNumber/:ayahNumber",
    element: <Tafseer />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-collection",
    element: <CreateCollection />,
  },
  {
    path: "/collection/:id",
    element: <Collection />,
  },
  {
    path: "/collection/edit/:id",
    element: <UpdateCollection />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.quran.user);
  const theme = useSelector((state) => state.quran.theme);

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logOut());
    } else {
      console.log("Token is valid");
    }
  }, []);

  return (
    <div className={theme + " antialiased"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
