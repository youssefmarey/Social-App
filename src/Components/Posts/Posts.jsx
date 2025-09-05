import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import Image from "./../../assets/images.jpg"
import { Link } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";
import HeaderPost from "../HeaderPost/HeaderPost";

const Posts = ({ post , isPostDetails }) => {

   
    
  return (
    <>
       
      <div className="p-5 bg-slate-700 rounded-lg mb-4">
        {/* header */}
        <HeaderPost
          UserName={post?.user?.name}
          CreateAt={post?.createdAt}
          UserImage={post?.user?.photo}
          userPostId={post?.user?._id}
          postId={post?.id}
        />

        {/* body */}
        <div className="body my-4">
          <p className="text-center">{post?.body}</p>
          <p className="text-center">{post?.id}</p>
          <img className="w-full mt-4 rounded-lg" src={post?.image} alt="" />
        </div>

        {/* comments */}
        {post?.comments.length == 0 ? <h1>No Comments</h1> : "" }
        {post?.comments.length > 0 && !isPostDetails ? <div className="comments bg-slate-600 p-5 rounded-lg border-2 border-slate-200/20">
        <Link to={`/postdetails/${post.id}`} className="text-center text-blue-500 block mb-4">View All Comments </Link>
          <UserInfo
            UserName={post?.comments?.[0]?.commentCreator?.name}
            CreateAt={post?.comments?.[0]?.createdAt}
            UserImage={
              post?.comments?.[0]?.commentCreator?.photo.includes("undefined") ? Image : post?.comments?.[0]?.commentCreator?.photo
            }
          />
          <p className="mt-4"> {post?.comments?.[0]?.content} </p>
        </div> : 
        <>
        {post?.comments && (
            <>
            {post?.comments.map(function(post , idx) {return(
                <div key={idx}  className="comments mb-4 bg-slate-600 p-5 rounded-lg border-2 border-slate-200/20">
          <UserInfo
            UserName={post?.commentCreator?.name}
            CreateAt={post?.createdAt}
            UserImage={
              post?.commentCreator?.photo.includes("undefined") ? Image : post?.commentCreator?.photo
            }
          />
          <p className="mt-4"> {post?.content} </p>
        </div>
            )})}
            </>
        )}
        </>
        }

        <CommentForm id={post?.id} />
      </div>
    </>
  );
};

export default Posts;
