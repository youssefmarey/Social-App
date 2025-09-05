import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from '../LoadingPage/LoadingPage'
import Posts from '../Posts/Posts'
import { Helmet } from 'react-helmet'

const PostDetails = () => {

    const {id} = useParams()

    function getSinglePost() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}` , {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    const {data , isLoading} = useQuery({
        queryKey:["Post" , id],
        queryFn:getSinglePost,
    })

     if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
    <section className="w-full md:w-2/3 lg:w-1/2 my-4 mx-auto p-5">

    <Helmet>
                <title>Post Details - {data?.data.post.user.name}</title>
            </Helmet>
        
           <Posts post={data?.data.post} isPostDetails={true}  />
    
      </section>
    </>
  )
}

export default PostDetails