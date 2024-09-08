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
      const result = await axios.get("http://localhost:5001/get-path");
      setMyPath(result.data);
      return result.data;
    },
  });

  const handleDeletePath = (id) => {
    fetch(`http://localhost:5001/path/${id}`)
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

        return fetch(`http://localhost:5001/path/${id}`, {
          method: "DELETE",
        });
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

  console.log(myPath);

  if (isError) return <h2>Error occer!</h2>;

  return (
    <div className="w-2/2 h-screen m-10">
      <Link to="/add-path" className="btn btn-primary">
        Add Path
      </Link>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {allPath?.map((path, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between w-1/2 border  py-1 px-5 border-gray-500"
              >
                <h2 className="text-xl ">{path.title}</h2>
                <div className="flex ">
                  <Link to={`/edit-path/${path._id}`} className="btn btn-info">
                    Edit Path
                  </Link>
                  <button
                    onClick={() => handleDeletePath(path._id)}
                    className="ml-5 btn btn-warning"
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
