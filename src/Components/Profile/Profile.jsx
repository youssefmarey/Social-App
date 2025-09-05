import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage/LoadingPage";
import Posts from "../Posts/Posts";
import AddPost from "../AddPost/AddPost";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user: loggedUserId } = jwtDecode(localStorage.getItem("token"));

  function getUserPosts() {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${loggedUserId}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const { isLoading, data } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5">
      <Helmet>
                <title>Porfile - {data?.data.posts[0].user.name}</title>
            </Helmet>
        <div className="mb-5 text-center">
          <AddPost />
        </div>
        {data?.data?.posts.map(function (post, idx) {
          return <Posts key={idx} post={post} />;
        })}
      </section>
    </>
  );
};

export default Profile;
