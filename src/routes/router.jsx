import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GameDetailPage from "../pages/GameDetailPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/games/:slug",
        element: <GameDetailPage />,
        errorElement: <ErrorPage />,
    },
]);

export default router; 