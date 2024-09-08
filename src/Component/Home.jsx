import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [recentStory, setRecentStory] = useState([]);
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
  const sortedStories = [...allStory].sort((a, b) => {
    const viewCountA = parseInt(a.viewCount, 10) || 0;
    const viewCountB = parseInt(b.viewCount, 10) || 0;
    return viewCountB - viewCountA;
  });

  return (
    <div>
      <h2 className="text-2xl ml-14 font-bold">Popular Story</h2>
      <div className="flex flex-wrap gap-5 items-center justify-center my-5">
        {sortedStories.slice(0, 6).map((story, idx) => {
          return (
            <div key={idx} className="card  w-96 shadow-xl bg-white text-black">
              <figure>
                <img src={story.image} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{story.title}</h2>
                <p>{story.initialContent}</p>
                <div className="card-actions justify-end">
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
