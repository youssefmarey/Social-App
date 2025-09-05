// import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import UserInfo from "../UserInfo/UserInfo";
import Posts from "../Posts/Posts";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import AddPost from "../AddPost/AddPost";
import { Helmet } from "react-helmet";

const Home = () => {
  // const [allPosts, setAllPosts] = useState(null)

  // async function getAllPosts() {
  //   try {
  //     const {data} = await axios.get("https://linked-posts.routemisr.com/posts?limit=50" , {
  //     headers: {
  //       token : localStorage.getItem("token")
  //     }
  //   })
  //   // console.log(data.posts);
  //   setAllPosts(data.posts)

  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  // useEffect(function () {
  //   getAllPosts()
  // } , [])

  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { data , isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
    // gcTime:5000,
    // refetchInterval:3000,
    // refetchOnMount: false,
    // retry: 3,
    // retryDelay: 3000,

  });

  // console.log(data);
  // console.log(isError);
  // console.log(isLoading);
  // console.log(isFetching);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5">
       <Helmet>
                <title>Linked Post</title>
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

export default Home;
