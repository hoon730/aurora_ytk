import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Review from "./components/Review";
import Videos from "./components/Videos";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/:movieId",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "/detail/:movieId",
        element: <Detail />,
      },
      {
        path: "search",
        element: <Search />,
        // children: [
        //   {
        //     path: "review",
        //     element: <Review />,
        //   },
        //   {
        //     path: "videos",
        //     element: <Videos />,
        //   },
        // ],
      },
    ],
  },
]);

export default router;
