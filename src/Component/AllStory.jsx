import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function AllStory() {
  const { user } = useAuth();
  const {
    data: allStory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allStory"],
    queryFn: async () => {
      const result = await axios(
        "https://interactive-storytelling-platform-server.vercel.app/all-story"
      );
      return result.data;
    },
  });
  console.log(allStory);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error occer!</h2>;
  return (
    <div>
      <h2 className="text-2xl ml-14 font-bold">Popular Story</h2>
      <div className="flex gap-5 justify-around flex-wrap mx-10 my-5">
        {allStory?.map((item, idx) => {
          return (
            <div
              key={idx}
              className="card bg-base-100 w-96 shadow-xl border border-silver-500"
            >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.category}</p>
                <div className="card-actions justify-between">
                  {/* DETAILS  */}
                  <Link
                    to={`/story-details/${item._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                  {user?.email === item.email ? (
                    <Link
                      to={`/update-story/${item._id}`}
                      className="btn btn-primary"
                    >
                      Edit Story
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
