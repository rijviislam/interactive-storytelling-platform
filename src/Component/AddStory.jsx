import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useAuth from "../Hooks/useAuth";

export default function AddStory() {
  const { user, loader } = useAuth();
  const email = user?.email;
  // const [option, setOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (selectOption) => {
    setSelectedOptions(selectOption);
  };

  const { data: allPath = [], isError } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get("http://localhost:5001/get-path");
      return result.data;
    },
  });

  const pathOptions = allPath.map((path) => ({
    value: path.title,
    label: path.title,
    object: path,
  }));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { image, title, initialContent, email } = data;
    const postedTime = new Date();
    let viewCount = 0;
    const extractedObjects = selectedOptions.map((item) => item.object);
    const postData = {
      postedTime,
      image,
      title,
      initialContent,
      email,
      options: extractedObjects,
      viewCount,
    };

    fetch(`http://localhost:5001/add-story`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("post");
          reset();
          navigate("/");
        }
      });
    console.log("Options, data", extractedObjects);
    console.log("post", postData);
  };

  if (isError) return <h2>Error occer!</h2>;

  if (loader) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="flex bg-base-100 items-center justify-center lg:w-full">
      <div className="flex flex-col items-center lg:w-10/12  p-6 rounded-md sm:p-10  text-gray-100 dark:text-gray-800 w-[360px]">
        <div className="mb-8 text-center w-full">
          <h1 className="my-3 text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text font-bold lg:text-4xl md:text-2xl  text-3xl">
            Add your Story
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 rounded-lg p-5 lg:p-10 shadow-2xl border-2 border-sliver lg:w-[800px]  md:w-[600px] w-[360px]"
        >
          <div className=" flex items-start gap-5">
            <div className="w-full lg:gap-5 md:gap-3 gap-2 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
              <div>
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
              <div>
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
              <div>
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="initialContent"
                    className="text-sm text-white"
                  >
                    Initial Content
                  </label>
                </div>
                <textarea
                  type="initialContent"
                  name="initialContent"
                  id="initialContent"
                  placeholder="initial content"
                  className="w-full h-[100px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none resize-none"
                  {...register("initialContent", { required: true })}
                />
                {errors.initialContent && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <Select
                options={pathOptions}
                value={selectedOptions}
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
            Add Story
          </button>
        </form>
      </div>
    </div>
  );
}
