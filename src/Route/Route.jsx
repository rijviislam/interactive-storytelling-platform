import { createBrowserRouter } from "react-router-dom";
import AddPath from "../Component/AddPath";
import AddStory from "../Component/AddStory";
import AllStory from "../Component/AllStory";
import Home from "../Component/Home";
import MyStory from "../Component/MyStory";
import StroyDetails from "../Component/StroyDetails";
import UpdateStory from "../Component/UpdateStory";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-story",
        element: <AddStory />,
      },
      {
        path: "/add-path",
        element: <AddPath />,
      },
      {
        path: "/story-details/:id",
        element: <StroyDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/story-details/${params.id}`),
      },
      {
        path: "/all-story",
        element: <AllStory />,
      },
      {
        path: "/my-story",
        element: <MyStory />,
      },
      {
        path: "/update-story/:id",
        element: <UpdateStory />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
