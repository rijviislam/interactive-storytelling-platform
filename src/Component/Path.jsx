import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Path() {
  const { data: allPath = [], isError } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get("http://localhost:5001/get-path");
      return result.data;
    },
  });
  console.log(allPath);
  if (isError) return <h2>Error occer!</h2>;
  return (
    <div className="w-2/2 h-screen m-10">
      <Link to="/add-path" className="btn btn-primary">
        Add Path
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {allPath.map((path, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-between w-1/2 border  py-1 px-5 border-gray-500"
            >
              <h2 className="text-xl ">{path.title}</h2>
              <Link to={`/edit-path/${path._id}`} className="btn btn-info">
                Edit Path
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
