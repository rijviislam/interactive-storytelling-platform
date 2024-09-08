import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function Path() {
  const { user } = useAuth();
  const email = user?.email;
  const [myPath, setMyPath] = useState([]);
  const {
    data: allPath = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get(
        "https://interactive-storytelling-platform-server.vercel.app/get-path"
      );
      setMyPath(result.data);
      return result.data;
    },
  });

  const handleDeletePath = (id) => {
    fetch(
      `https://interactive-storytelling-platform-server.vercel.app/path/${id}`
    )
      .then((res) => res.json())
      .then((path) => {
        const { parentId } = path;
        if (parentId) {
          const updatedItems = myPath.map((item) => {
            if (item.parentId === parentId) {
              return { ...item, parentId: "" };
            }
            return item;
          });

          setMyPath(updatedItems);
        }

        return fetch(
          `https://interactive-storytelling-platform-server.vercel.app/path/${id}`,
          {
            method: "DELETE",
          }
        );
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch();

          console.log("Path deleted and UI updated");
        } else {
          console.error("Error deleting path:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  if (isError) return <h2>Error occer!</h2>;

  return (
    <div className="w-2/2 min-h-screen m-10">
      <Link to="/add-path" className="btn btn-primary">
        Add Path
      </Link>
      {allPath.length === 0 && (
        <h2 className="flex items-center justify-center mt-5">
          No Path Available
        </h2>
      )}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {allPath?.map((path, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between w-1/2 border  py-1 px-5 border-gray-500 rounded-lg"
              >
                <h2 className="text-xl ">{path.title}</h2>
                <div className="flex ">
                  {email === path.email && (
                    <Link
                      to={`/edit-path/${path._id}`}
                      className="btn-sm bg-purple-500 text-white flex items-center justify-center rounded-md"
                    >
                      Edit Path
                    </Link>
                  )}
                  <button
                    onClick={() => handleDeletePath(path._id)}
                    className="ml-5 btn-sm bg-red-800 rounded-md text-white"
                  >
                    Delete Path
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
