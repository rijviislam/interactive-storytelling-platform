// import React, { useState } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";

// export default function StoryDetails() {
//   const { category, image, title, storyDescription, options } = useLoaderData();
//   const [selectedOption, setSelectedOption] = useState(null);
//   const navigate = useNavigate();

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   const handleBackClick = () => {
//     if (selectedOption) {
//       setSelectedOption(null);
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full h-full border-2 border-white">
//       <div className="border-2 border-red-600 w-2/3">
//         {selectedOption ? (
//           // Render option details
//           <div className="flex flex-col mx-10">
//             <div className="flex justify-between m-5">
//               <button
//                 className="btn text-white bg-indigo-600 btn-xs"
//                 onClick={handleBackClick}
//               >
//                 Back
//               </button>
//               <button className="btn text-white btn-xs bg-indigo-800">
//                 Ananlyties
//               </button>
//             </div>
//             <h4 className="text-2xl">Option Details</h4>
//             <p className="text-lg font-semibold">
//               Title: {selectedOption.title}
//             </p>
//             <p>Initial Content: {selectedOption.initialContent}</p>
//             <p>
//               Posted Time:{" "}
//               {new Date(selectedOption.postedTime).toLocaleString()}
//             </p>
//             {/* Render more details from the option object */}
//             {selectedOption.options && selectedOption.options.length > 0 && (
//               <div>
//                 <h5 className="text-lg">Sub-options:</h5>
//                 {selectedOption.options.map((subOption, idx) => (
//                   <p key={idx}>- {subOption}</p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           // Render story details
//           <div className="flex flex-col mx-10">
//             <div className="flex justify-between m-5">
//               <button
//                 className="btn text-white bg-indigo-600 btn-xs"
//                 onClick={handleBackClick}
//               >
//                 Back
//               </button>
//               <button className="btn text-white btn-xs bg-indigo-800">
//                 Ananlyties
//               </button>
//             </div>
//             <div className="flex items-center justify-center">
//               <img src={image} alt="" className="w-[500px] rounded-2xl" />
//             </div>
//             <h2 className="text-3xl">{title}</h2>
//             <h5 className="text-red-500">{category}</h5>
//             <h4 className="text-2xl">Overview</h4>
//             <p>{storyDescription}</p>
//             <div className="flex flex-wrap gap-5">
//               {options.map((option, idx) => (
//                 <span
//                   key={option._id}
//                   className="cursor-pointer underline"
//                   onClick={() => handleOptionClick(option)}
//                 >
//                    {option.title}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();
  const pathData = useLoaderData();
  console.log(data, id);
  console.log("data", data);
  const { image, title, initialContent, options } = data || {};
  const { _id } = pathData || {};

  const handleOptionClick = (optionId) => {
    navigate(`/path/${optionId}`);
  };
  console.log(pathData);
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
            Analytics
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
