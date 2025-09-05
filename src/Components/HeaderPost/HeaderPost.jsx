import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React from "react";

const HeaderPost = ({ UserName, UserImage, CreateAt, userPostId, postId }) => {
  const { user: loggedUserId } = jwtDecode(localStorage.getItem("token"));

  const queryClient = useQueryClient();

  function deletePost() {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
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
      <div className="flex justify-between items-center">
        <div className="flex">
          {/* avatar */}
          <div className="avatar me-4">
            <div className="w-12 rounded-full">
              <img src={UserImage} />
            </div>
            {/* name , date */}
          </div>
          <div>
            <h2> {UserName} </h2>
            <p> {CreateAt} </p>
          </div>
        </div>
        {/* icons */}

        {loggedUserId == userPostId ? (
          <details className="dropdown dropdown-left">
            <summary className="btn m-1">
              <i className="fa-solid fa-ellipsis"></i>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <button onClick={mutate}>
                  {isPending ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Delete"
                  )}
                </button>
              </li>
              <li>
                <button>Update</button>
              </li>
            </ul>
          </details>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default HeaderPost;
