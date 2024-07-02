import Identicon from "identicon.js";

const Profile = (props) => {
  return (
    <main
      role="main"
      className="center-container"
      style={{ maxWidth: "600px" }}
    >
      <h3 style={{ marginLeft: "10px", marginTop: "2rem" }}>User Profile</h3>
      <div>
        {props.posts.map((post, key) => (
          <div className="post-box" key={key}>
            <div>
              <img
                className="post-author-icon"
                width="35"
                height="35"
                src={`data:image/png;base64,${new Identicon(
                  post.author
                ).toString()}`}
                alt="Identicon"
              />
              <small>{post.author}</small>
            </div>

            <ul id="postList">
              <li style={{ padding: "0px", "list-style-type": "none" }}>
                <p style={{ margin: "5px 10px" }}>{post.content}</p>

                {post.hash !== " " ? (
                  <img
                    className="postImage"
                    src={`https://gateway.pinata.cloud/ipfs/${post.hash}`}
                    style={{ maxWidth: "470px", margin: "0px" }}
                    alt="h"
                  />
                ) : (
                  <p></p>
                )}
              </li>
              <li className="tip-section" key={key}>
                <small>
                  TIPS:{" "}
                  {window.web3.utils.fromWei(
                    post.tipAmount.toString(),
                    "ether"
                  )}{" "}
                  ETH
                </small>
                <button
                  name={post.id}
                  onClick={(event) => {
                    let tipAmount = window.web3.utils.toWei("0.1", "ether");
                    console.log(event.target.name, tipAmount);
                    props.tipPost(event.target.name, tipAmount);
                  }}
                >
                  TIP 0.1 ETH
                </button>
              </li>
            </ul>
            <hr></hr>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Profile;
