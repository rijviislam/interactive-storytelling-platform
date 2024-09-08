import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../Hooks/useAuth";

export default function AddPath() {
  const { user, loader } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();
  const [selectedOptionsPath, setSelectedOptionsPath] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, initialContent } = data;
    const parentId = selectedOptionsPath.length > 0 ? uuidv4() : "";

    const optionTitles = selectedOptionsPath.map((item) => item.value);

    const checkResponse = await fetch(
      `https://interactive-storytelling-platform-server.vercel.app/check-options`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ titles: optionTitles }),
      }
    );

    const checkResult = await checkResponse.json();

    if (!checkResult.success) {
      console.error("Error checking options:", checkResult.message);
      return;
    }

    if (checkResult.existingTitles.length > 0) {
      console.error(
        "Some options are already assigned to other paths:",
        checkResult.existingTitles,
        "Please chose another options"
      );
      return;
    }
    let viewCount = 0;
    const postData = {
      title,
      initialContent,
      options: selectedOptionsPath.map((item) => ({
        ...item.object,
        parentId: parentId,
      })),
      postedTime: new Date(),
      parentId,
      email,
      viewCount,
    };

    const response = await fetch(
      `https://interactive-storytelling-platform-server.vercel.app/add-path`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Path added successfully");
      reset();
      navigate("/path");
    } else {
      console.error("Error adding path:", result.message);
    }
  };

  const { data: allPath = [] } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get(
        "https://interactive-storytelling-platform-server.vercel.app/get-path"
      );
      return result.data;
    },
  });

  const handleSelect = (selectOptions) => {
    setSelectedOptionsPath(selectOptions);
  };

  const pathOptions = allPath.map((path) => ({
    id: path._id,
    value: path.title,
    label: path.title,
    object: path,
  }));

  if (loader) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="flex bg-base-100 items-center justify-center lg:w-full">
      <div className="flex flex-col items-center lg:w-10/12  p-6 rounded-md sm:p-10  text-gray-100 dark:text-gray-800 w-[360px]">
        <div className="mb-8 text-center w-full">
          <h1 className="my-3 text-purple-600 font-bold  text-3xl">Add Path</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 rounded-lg p-5 lg:p-10 shadow-2xl border-2 border-sliver lg:w-[800px]  md:w-[600px] w-[360px]"
        >
          <div className=" flex items-start gap-5">
            <div className="w-full flex flex-col">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm text-white"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    placeholder="use image URL"
                    className="w-full h-[50px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="w-1/2">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="Item Name" className="text-sm text-white">
                      Title
                    </label>
                  </div>
                  <input
                    type="title"
                    name="title"
                    id="title"
                    placeholder="Title"
                    className="w-full h-[50px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="initialContent"
                    className="text-sm text-white"
                  >
                    Story Description
                  </label>
                </div>
                <textarea
                  type="initialContent"
                  name="initialContent"
                  id="initialContent"
                  placeholder="short description"
                  className="w-full h-[100px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none resize-none"
                  {...register("initialContent", { required: true })}
                />
                {errors.initialContent && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <Select
                options={pathOptions}
                value={selectedOptionsPath}
                onChange={handleSelect}
                isMulti={true}
              />
              <div className="flex items-center gap-2">
                <input
                  id="email"
                  type="hidden"
                  defaultValue={email}
                  name="email"
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          <button className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-violet-600">
            Add Path
          </button>
        </form>
      </div>
    </div>
  );
}
