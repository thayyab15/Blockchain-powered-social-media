import React from "react";
import Identicon from "identicon.js";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

export default function Post({
  posts,
  tipPost,
  addComment,
  commentContent,
  setCommentContent,
  socialNetwork,
  comments,
  cIdArr
}) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const keys = Object.values(post);
  
  return (
    <main className="postPage">
      <div className="post-box">
        <div>
          <img
            className="post-author-icon"
            width="35"
            height="35"
            src={`data:image/png;base64,${new Identicon(keys[5]).toString()}`}
            alt="Identicon"
          />
          <small>{post.name}</small>
        </div>

        <ul id="postList">
          <li style={{ padding: "0px", "list-style-type": "none" }}>
            <p style={{ margin: "5px 10px" }}>{keys[3]}</p>

            {post.hash !== " " ? (
              <img
                className="postImage"
                src={`https://gateway.pinata.cloud/ipfs/${keys[2]}`}
                style={{ maxWidth: "470px", margin: "0px" }}
                alt="h"
              />
            ) : (
              <p></p>
            )}
          </li>

          <li className="tip-section">
            <small>
              TIPS:{" "}
              {window.web3.utils.fromWei(post.tipAmount.toString(), "ether")}{" "}
              ETH
            </small>
            <button
              name={post.id}
              onClick={(event) => {
                let tipAmount = window.web3.utils.toWei("0.1", "ether");
                console.log(event.target.name, tipAmount);
                tipPost(event.target.name, tipAmount);
              }}
            >
              TIP 0.1 ETH
            </button>
          </li>
        </ul>
        <hr></hr>
      </div>
      <div className="commentSection">
        <Comments
          post={post}
          addComment={addComment}
          id={id}
          commentContent={commentContent}
          setCommentContent={setCommentContent}
          socialNetwork={socialNetwork}
          comments={comments}
          cIdArr={cIdArr}
        ></Comments>
      </div>
    </main>
  );
}
