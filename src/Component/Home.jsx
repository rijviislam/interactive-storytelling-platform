import React, { useState } from "react";

export default function Home() {
  const [recentStory, setRecentStory] = useState([]);

  return (
    <div>
      <h2 className="text-2xl ml-14 font-bold">Popular Story</h2>
    </div>
  );
}
