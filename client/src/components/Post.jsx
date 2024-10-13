import React, { useState } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { BiRepost } from "react-icons/bi";
import { BiComment } from "react-icons/bi";

export default function Post({ content }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isShared, setIsShared] = useState(false)

  function likePost(){
    setIsLiked(prev => !prev)
  }

  function sharePost(){
    setIsShared(prev => !prev)
  }

  return (
    <div
      className="border border-2 border-info shadow rounded p-3 d-flex flex-column gap-2 w-100 mb-2"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center gap-1">
        <img
          className="rounded"
          src="https://i.pinimg.com/564x/6f/bc/73/6fbc7357f2418d7fe36b0b523006f450.jpg"
          style={{ width: "30px" }}
          alt="sds"
          srcset=""
        />
        <div className="text-bold">jmpollock56</div>
      </div>
      <div>
        {content}
      </div>
      <div className="d-flex gap-1">
        <button type="button" className="btn border-0 p-0" onClick={likePost}>
          { isLiked ? <TiHeartFullOutline color="red" size={28}/> : <TiHeartFullOutline size={28}/>}
        </button>
        <button type="button" className="btn border-0 p-0" onClick={sharePost}>
          {isShared ? <BiRepost size={28} color="green"/> : <BiRepost size={28}/>}
        </button>
        <button type="button" className="btn border-0 p-0">
          <BiComment size={24} />
        </button>
      </div>

      <div>
        <div>Comments</div>
      </div>
    </div>
  );
}
