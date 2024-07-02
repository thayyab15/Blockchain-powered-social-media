import React from "react";

export default function CommentForm({
  addComment,
  id,
  commentContent,
  setCommentContent,
  socialNetwork,
}) {
  const postContentRef = React.useRef(null);
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    addComment(id, commentContent);
  };
  return (
    <form className="post-form" onSubmit={handleCommentSubmit}>
      <div className="post-section">
        <input
          id="postContent"
          type="text"
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          className="for-post-content"
          placeholder="What's on your mind?"
          required
          autoFocus
        />
        <button type="submit" className="btn btn-primary btn-block">
          Share
        </button>
      </div>
    </form>
  );
}
