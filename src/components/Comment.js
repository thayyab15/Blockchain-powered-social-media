import { dblClick } from "@testing-library/user-event/dist/click";
import React from "react";
import Identicon from "identicon.js";

export default function comment({ comments }) {
  return (
    <div>
      {comments.map((comment, key) => {
        return (
          <div className="commentBox" key={key}>
            <div className="commentHeader">
              <img
                className="post-author-icon"
                width="35"
                height="35"
                src={`data:image/png;base64,${new Identicon(
                  comment.aurthor
                ).toString()}`}
                alt="Identicon"
              />
              <small>{comment.aurthor}</small>
            </div>
            <div className="commentContent">
              <p>{comment.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// const values = Object.values(comment);
// <div className="commentBox" key={key}>
//   <div className="commentHeader">
//     <img
//         className="post-author-icon"
//         width="35"
//         height="35"
//         src={`data:image/png;base64,${new Identicon(
//           comment.author
//         ).toString()}`}
//         alt="Identicon"
//       />
//     <p>{values[2]}</p>
//   </div>
// </div>;
