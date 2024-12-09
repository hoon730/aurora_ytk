import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import PreLoading from "./pages/Pre-Loading";
import WrongAddress from "./pages/WrongAddress";
import ProtectedPage from "./components/ProtectedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        ),
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
        element: (
          <ProtectedPage>
            <Detail />
          </ProtectedPage>
        ),
      },
      {
        path: "search",
        element: (
          <ProtectedPage>
            <Search />
          </ProtectedPage>
        ),
      },
      {
        path: "*",
        element: <WrongAddress />,
      },
    ],
  },
]);

export default router;
