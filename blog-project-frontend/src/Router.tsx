import { createBrowserRouter } from "react-router-dom";
import Blogs from "./components/template/Blogs";
import FavoriteBlogs from "./components/template/FavoriteBlogs";

const router = createBrowserRouter([
  { path: "/", element: <Blogs /> },
  { path: "favorite-blogs", element: <FavoriteBlogs /> },
]);

export { router };
