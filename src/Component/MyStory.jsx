import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function MyStory() {
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: myStory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myStory", email],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:5001/my-story/${email}`);
      return result.data;
    },
  });
  console.log(myStory);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error fetching data</h2>;
  return (
    <div>
      <h2 className="text-2xl ml-14 font-bold text-purple-600">My Story</h2>

      {myStory.length === 0 && (
        <h2 className="flex items-center justify-center mt-5">
          You can't create any story
        </h2>
      )}
      <div className="flex gap-5 justify-around flex-wrap mx-10 my-5">
        {myStory?.map((item, idx) => {
          return (
            <div
              key={idx}
              className="card bg-base-100 w-96 shadow-xl border border-silver-500"
            >
              <figure>
                <img
                  src={item.image}
                  alt="Shoes"
                  className="w-full h-[300px]"
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
                  <Link
                    to={`/update-story/${item._id}`}
                    className="btn btn-primary"
                  >
                    Edit Story
                  </Link>
                  <button className="btn text-white btn-xs bg-indigo-800">
                    Analytics {item.viewCount}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
