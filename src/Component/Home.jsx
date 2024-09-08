import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    data: allStory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allStory"],
    queryFn: async () => {
      const result = await axios("http://localhost:5001/all-story");
      return result.data;
    },
  });
  const sortedStories = [...allStory].sort((a, b) => {
    const viewCountA = parseInt(a.viewCount, 10) || 0;
    const viewCountB = parseInt(b.viewCount, 10) || 0;
    return viewCountB - viewCountA;
  });

  if (isLoading)
    return <h2 className="flex items-center justify-center">Loading.....</h2>;
  if (isError)
    return (
      <h2 className="flex items-center justify-center">Error fetching data</h2>
    );

  return (
    <div>
      <h2 className="text-2xl ml-14 font-bold text-purple-500">
        Popular Story
      </h2>
      {sortedStories.length === 0 && (
        <h2 className="flex items-center justify-center mt-5">
          No Story Available
        </h2>
      )}
      <div className="flex flex-wrap gap-5 items-center justify-center my-5">
        {sortedStories.slice(0, 6).map((story, idx) => {
          return (
            <div
              key={idx}
              className="card border border-silver-500 w-96 shadow-xl "
            >
              <figure>
                <img src={story.image} className="w-full h-[300px]" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-purple-600">{story.title}</h2>
                <div className="card-actions justify-end mt-5">
                  <Link
                    to={`/story-details/${story._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
