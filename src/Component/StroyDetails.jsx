import React from "react";
import { useLoaderData } from "react-router-dom";

export default function StroyDetails() {
  const { category, image, title, storyDescription } = useLoaderData();
  return (
    <div className="flex items-center justify-center w-full h-full border-2 border-white">
      <div className="border-2 border-red-600 w-2/3">
        <img src={image} alt="" />
        <h2 className="text-3xl">{title}</h2>
        <h5 className="text-red-500">{category}</h5>
        <div>
          <h4 className="text-2xl">Overview</h4>
          <p>{storyDescription}</p>
        </div>
        {/* ROUTING CATEGORY BUTTON HERE  */}
      </div>
    </div>
  );
}
