import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function EditPath() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePath, setSinglePath] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { _id } = singlePath;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:5001/path/${id}`);
      setSinglePath(data);
      const defaultSelectedOptions = data.options.map((option) => ({
        value: option.title,
        label: option.title,
        object: option,
      }));
      setSelectedOptions(defaultSelectedOptions);
    };
    getData();
  }, [id]);
  console.log(singlePath);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { title, initialContent } = data;
    const updatedData = {
      title,
      initialContent,
      options: selectedOptions.map((option) => option.object),
    };
    fetch(`http://localhost:5001/path/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          navigate("/my-story");
        }
      });
  };

  const { data: allPath = [] } = useQuery({
    queryKey: ["allPath"],
    queryFn: async () => {
      const result = await axios.get("http://localhost:5001/get-path");
      return result.data;
    },
  });
  const handleSelect = (selectOption) => {
    setSelectedOptions(selectOption);
  };

  const pathOptions = allPath.map((path) => ({
    value: path.title,
    label: path.title,
    object: path,
  }));
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-screen-md shadow-2xl bg-base-100">
        <h2 className="text-2xl ml-14 font-bold text-purple-600 text-center mb-5">
          Edit Path
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body shadow-xl border border-silver rounded-lg"
        >
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-3 flex-col">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="input input-bordered"
                  defaultValue={singlePath.title}
                  {...register("title", { required: true })}
                />
              </div>

              <div className="w-full ">
                <div className="flex justify-between mb-2 ">
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
                  defaultValue={singlePath.initialContent}
                  placeholder="short description"
                  className="w-full h-[100px] px-3 py-2 border rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800 outline-none resize-none"
                  {...register("initialContent", { required: true })}
                />
              </div>
            </div>

            <Select
              options={pathOptions}
              value={selectedOptions}
              onChange={handleSelect}
              isMulti={true}
            />
          </div>
          <button className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-violet-600">
            Upadte Path
          </button>
        </form>
      </div>
    </div>
  );
}
