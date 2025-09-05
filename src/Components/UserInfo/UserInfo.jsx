import React from "react";

const UserInfo = ({UserName , UserImage , CreateAt}) => {
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
        <div>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
