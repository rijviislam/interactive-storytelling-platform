import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuth from "../Hooks/useAuth";

export default function MyStory() {
  const { user } = useAuth();
  const { email } = user;

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
      <h2 className="text-3xl">My Story</h2>
      <div className="flex flex-col gap-5">
        {myStory.length > 0 ? (
          <ul>
            {myStory.map((story, index) => (
              <li key={index}>
                <h3>{story.title}</h3>
                <p>{story.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stories found!</p>
        )}
      </div>
    </div>
  );
}
