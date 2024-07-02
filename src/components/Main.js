import React, { useState } from "react";
import axios from "axios";
import Identicon from "identicon.js";
import { FaCamera } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
function Main(props) {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NmNjNjEwOS0xZmJhLTQwZDAtYjU2Ni0yOWM1YmJjZDU3ZjUiLCJlbWFpbCI6InRoYXl5YWIzMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjk0YzFlYjI4YWUzYTA5OWY2OTMiLCJzY29wZWRLZXlTZWNyZXQiOiJiNjYxYzgwMGEwOTAxNTM3YmQwODVmYzIwMzYxODY1YjdlNzg0YTkxMmJhMGNmZTJjNDk1MmQxMzVlZDI2MWU1IiwiaWF0IjoxNzExMjY5NDM4fQ.3F4VSVNfmCzuq_r7Shbsx1_zM3B_fnbbr9Um_BUUtZ0";

  const [selectedFile, setSelectedFile] = useState(null);

  var Hash = " ";
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const pinataMetadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      Hash = res.data.IpfsHash;
      console.log(res.data.IpfsHash);
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
    }
  };
  const clickTheButton = () => {
    const element = document.getElementById("getFile");
    element.click();
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      handleUpload();
    }

    setTimeout(function () {
      //do what you need hereconsole.log(Hash);

      const content = postContentRef.current.value;
      props.createPost(content, Hash);
    }, 5000);
  };

  const postContentRef = React.useRef(null);

  return (
    <main
      role="main"
      className="center-container"
      style={{ maxWidth: "600px" }}
    >
      {
        <div>
          <p>&nbsp;</p>
          <form className="post-form" onSubmit={handleFormSubmit}>
            <div className="post-section">
              <input
                id="postContent"
                type="text"
                ref={postContentRef}
                className="for-post-content"
                placeholder="What's on your mind?"
                required
                autoFocus
              />
              <div className="just-for-that-button">
                <IconContext.Provider value={{ color: "navy", size: 30 }}>
                  <FaCamera onClick={clickTheButton} />
                </IconContext.Provider>
              </div>
              <input
                type="file"
                id="getFile"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <button type="submit" className="btn btn-primary btn-block">
                Share
              </button>
            </div>
          </form>
          <hr></hr>
          <p>&nbsp;</p>
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
                <small>{post.name == " " ? post.author : post.name}</small>
              </div>

              <ul id="postList">
                <Link to={`/post/${post.id}`}>
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
                </Link>
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
      }
    </main>
  );
}

export default Main;
