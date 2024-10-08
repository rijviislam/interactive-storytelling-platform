import { createBrowserRouter } from "react-router-dom";
import AddPath from "../Component/AddPath";
import AddStory from "../Component/AddStory";
import AllStory from "../Component/AllStory";
import EditPath from "../Component/EditPath";
import ErrorPage from "../Component/ErrorPage";
import Home from "../Component/Home";
import MyStory from "../Component/MyStory";
import Path from "../Component/Path";
import StoryDetails from "../Component/StroyDetails";
import UpdateStory from "../Component/UpdateStory";
import Layout from "../Layout/Layout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-story",
        element: (
          <PrivateRoute>
            <AddStory />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-path",
        element: (
          <PrivateRoute>
            <AddPath />
          </PrivateRoute>
        ),
      },
      {
        path: "/story-details/:id",
        element: <StoryDetails />,
        loader: async ({ params }) =>
          await fetch(`http://localhost:5001/story-details/${params.id}`),
      },

      {
        path: "/path/:id",
        element: <StoryDetails />,
        loader: async ({ params }) =>
          await fetch(`http://localhost:5001/path/${params.id}`),
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
        path: "/edit-path/:id",
        element: <EditPath />,
      },
      {
        path: "/path",
        element: <Path />,
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
