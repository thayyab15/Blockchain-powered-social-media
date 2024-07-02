import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import comment from "./Comment";
import Identicon from "identicon.js";
export default function Comments({
  post,
  addComment,
  id,
  commentContent,
  setCommentContent,
  socialNetwork,
  comments,
  cIdarr,
}) {
  return (
    <div className="commentSection">
      <h3 style={{ padding: "1rem", borderBottom: "1px solid gray" }}>
        comments
      </h3>
      <CommentForm
        id={id}
        addComment={addComment}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        socialNetwork={socialNetwork}
      ></CommentForm>
      <Comment comments={comments.filter((comment) => comment.postId == id)} />
    </div>
  );
}
