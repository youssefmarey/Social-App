import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";

const AddPost = () => {
  const queryClient = useQueryClient();
  const [viewImg, setViewImg] = useState(null);
  const [img, setImg] = useState("");

  const postBody = useRef("");
  const postImage = useRef("");

  function addPost() {
    const formData = new FormData();
    if (postBody.current.value != "") {
      formData.append("body", postBody.current.value);
    }
    if (img != "") {
      formData.append("image", img);
    }

    return axios.post("https://linked-posts.routemisr.com/posts", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    // console.log(postBody.current.value);
    // console.log(postImage.current.files[0]);
  }

  function handelImg() {
    const src = URL.createObjectURL(postImage.current?.files[0]);
    setImg(postImage.current?.files[0]);
    setViewImg(src);
  }

  function handelClose() {
    setViewImg(null);
    postImage.current = "";
    setImg("");
  }

  const { isPending, mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      postBody.current.value = "";
      handelClose();
      document.getElementById("my_modal_1").close();
      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <input
        onClick={() => document.getElementById("my_modal_1").showModal()}
        type="text"
        placeholder="Add Post"
        className="input w-full input-primary"
      />

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Post</h3>

          {/* body Post */}

          <textarea
            ref={postBody}
            placeholder="Write your thoughts here..."
            className="textarea textarea-primary w-full mt-10 mb-4"
          ></textarea>

          {/* img post */}

          {viewImg ? (
            <div className="mt-5">
              <i
                onClick={handelClose}
                className="fa-solid cursor-pointer fa-xmark text-white !block mb-2 ms-auto "
              ></i>
              <img src={viewImg} className="w-full" alt="" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={handelImg}
                  ref={postImage}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          )}

          <button onClick={mutate} className="btn mt-5 btn-primary">
            {isPending ? (
              <i className="fa-solid fa-spinner fa-spin text-white"></i>
            ) : (
              "Add Post"
            )}
          </button>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddPost;
