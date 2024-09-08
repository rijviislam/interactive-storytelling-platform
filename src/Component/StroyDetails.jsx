import React, { useEffect, useRef } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const pathData = useLoaderData();
  const timeoutRef = useRef(null);

  const { image, title, initialContent, options, viewCount } = data || {};
  const { _id } = pathData || {};
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const updateViewCount = async () => {
        try {
          const response = await fetch(
            `https://interactive-storytelling-platform-server.vercel.app/story-viewcount/${id}`,
            { method: "PATCH" }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const updatedStory = await response.json();
          console.log("Updated Story:", updatedStory);
        } catch (error) {
          console.error("Failed to update view count", error);
        }
      };

      updateViewCount();
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [id]);

  const handleOptionClick = (optionId) => {
    navigate(`/path/${optionId}`);

    const updateOptionViewCount = async () => {
      try {
        const response = await fetch(
          `https://interactive-storytelling-platform-server.vercel.app/option-viewcount/${optionId}`,
          { method: "PATCH" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedOption = await response.json();
        console.log("Updated Option:", updatedOption);
      } catch (error) {
        console.error("Failed to update option view count", error);
      }
    };

    updateOptionViewCount();
  };

  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-white">
      <div className="border-2 border-red-600 w-2/3 h-screen">
        <div className="flex justify-between m-5">
          <button
            className="btn text-white bg-indigo-600 btn-xs"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button className="btn text-white btn-xs bg-indigo-800">
            Analytics {viewCount}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img src={image} alt="" className="w-[400px] h-[300px] rounded-2xl" />
        </div>
        <div className="flex flex-col mx-10">
          <h2 className="text-3xl text-white">{title}</h2>
          <p className="text-white">{initialContent}</p>
          <div className="flex flex-wrap gap-5">
            {options?.map((option, idx) => (
              <span
                key={option._id}
                className="cursor-pointer underline text-white"
                onClick={() => handleOptionClick(option._id)}
              >
                Option {idx + 1}: {option.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
