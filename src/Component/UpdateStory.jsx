import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState([]);
  const [defaultStory, setDefaultStory] = useState();
  const { _id } = story;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:5001/all-story/${id}`);
      setStory(data);
    };
    getData();
  }, [id]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { title, storyDescription } = data;
    fetch(`http://localhost:5001/all-story/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          navigate("/my-story");
        }
      });
    setDefaultStory(data);
  };
  console.log(story);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-screen-md shadow-2xl bg-base-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body shadow-xl border border-silver rounded-lg"
        >
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered"
                defaultValue={story.title}
                {...register("title", { required: true })}
              />
            </div>
            {/* <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text text-black">Story Description</span>
              </label>
              <input
                type="text"
                name="shortdescription"
                placeholder="Short Description"
                className="input input-bordered"
                  defaultValue={story.storyDescription}
                //   {...register("shortdescription", { required: true })}
              />
            </div> */}
            <div className="lg:w-1/2 ">
              <div className="flex justify-between mb-2 ">
                <label
                  htmlFor="storyDescription"
                  className="text-sm text-white"
                >
                  Story Description
                </label>
              </div>
              <textarea
                type="storyDescription"
                name="storyDescription"
                id="storyDescription"
                defaultValue={story.storyDescription}
                placeholder="short description"
                className="w-full h-[100px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none resize-none"
                {...register("storyDescription", { required: true })}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-sm text-black">Story Options</h2>
            <select
              id="fruits"
              defaultValue="Select Subcategory"
              name="category"
              className="bg-white p-2 outline-none rounded-md text-gray-500"
              // onChange={(e) => setSelectCategory(e.target.value)}
              // {...register("category", { required: true })}
            >
              <option value="Travel">Travel</option>
              <option value="Health and Fitness">Health and Fitness</option>
              <option value="Finance">Finance</option>
              <option value="Technology">Technology</option>
              <option value="Photography">Photography</option>
              <option value="Education and Learning">
                Education and Learning
              </option>
            </select>
          </div>

          <input
            type="submit"
            placeholder="Update Product"
            className="btn bg-cyan-900 w-full my-2"
          />
        </form>
      </div>
    </div>
  );
}
