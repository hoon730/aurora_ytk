import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Review from "./components/Review";
import Videos from "./components/Videos";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import PreLoading from "./pages/Pre-Loading";
import WrongAddress from "./pages/WrongAddress";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "pre-loading",
        element: <PreLoading />,
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
      {
        path: "*",
        element: <WrongAddress />,
      },
    ],
  },
]);

export default router;
