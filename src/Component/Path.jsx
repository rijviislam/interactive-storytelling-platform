import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function Path() {
  const { user } = useAuth();
  const email = user?.email;
  console.log(email);
  const [myPath, setMyPath] = useState([]);
  const { data: allPath = [], isError } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get("http://localhost:5001/get-path");
      setMyPath(allPath);
      return result.data;
    },
  });
  console.log(myPath);
  const handleDeletePath = (id) => {
    fetch(`http://localhost:5001/path/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const afterRemove = allPath.filter((path) => path._id !== id);
          setMyPath(afterRemove);
        }
      });
    console.log("Delete", id);
  };
  if (isError) return <h2>Error occer!</h2>;
  return (
    <div className="w-2/2 h-screen m-10">
      <Link to="/add-path" className="btn btn-primary">
        Add Path
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {myPath.map((path, idx) => {
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
    </div>
  );
}
