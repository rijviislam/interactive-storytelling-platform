import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPath() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePath, setSinglePath] = useState([]);
  const [defaultPath, setDefaultPath] = useState();
  const { _id } = singlePath;
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:5001/path/${id}`);
      setSinglePath(data);
    };
    getData();
  }, [id]);
  console.log(singlePath);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { title, initialContent, options } = data;
    fetch(`http://localhost:5001/path/${_id}`, {
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
    setDefaultPath(data);
  };
  return <div>EditPath</div>;
}
