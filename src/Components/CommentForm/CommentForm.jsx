import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentForm = ({ id }) => {
  const [content, setContent] = useState("");

  const queryClient =  useQueryClient()

//   async function createComment() {
//     setIsloading(true);
//     const values = {
//       content: content,
//       post: id,
//     };
//     console.log(values);

//     try {
//       const { data } = await axios.post(
//         "https://linked-posts.routemisr.com/comments",
//         values,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );
//       toast.success(data.message);
//       setIsloading(false);
//     } catch (error) {
//       toast.error(error.response.data.error);
//       setIsloading(false);
//     }
//   }

function createComment() {
    const values = {
      content: content,
      post: id,
    };
    return axios.post("https://linked-posts.routemisr.com/comments" , values , {
        headers: {
            token: localStorage.getItem("token")
        }
    })
}

const {isPending , mutate} = useMutation({
    mutationFn: createComment,
    onSuccess: (data)=>{
        toast.success(data.data.message);
        queryClient.invalidateQueries({
            queryKey:["Post" , id],
        })

        setContent("")
        
    },
    onError: (error) => {
        toast.error(error.response.data.error);
        
    }
})

  return (
    <>
      <div className="join mt-4 !w-full  ">
        <div className="!w-full ">
          <label className="input !w-full  join-item">
            <input
              className="!w-full"
              type="text"
              placeholder="Your Comment...."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </label>
        </div>
        <button onClick={mutate} className="btn btn-primary join-item">
          {isPending ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
      </div>
    </>
  );
};

export default CommentForm;
