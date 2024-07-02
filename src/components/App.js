import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import "./App.css";
import SocialNetwork from "../abis/SocialNetwork.json";
import Home from "./Home";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import CreateProfile from "./CreateProfile";
import TopBar from "./TopBar";
import Post from "./Post";
import SearchPost from "./SearchPost";
function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialNetwork, setSocialNetwork] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState(" ");
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [cIdArr, setCIdArr] = useState([]);
  const [registered, setRgistered] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const loadBlockchainData = async () => {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      // Network ID
      const networkId = await web3.eth.net.getId();
      const networkData = SocialNetwork.networks[networkId];
      if (networkData) {
        const sn = new web3.eth.Contract(
          SocialNetwork.abi,
          networkData.address
        );
        setSocialNetwork(sn);
        if (sn !== null) {
          // use `sn` instead of `socialNetwork` dumbo
          const pc = await sn.methods.postCount().call();
          setPostCount(pc);

          // Fetch posts

          const fetchedPosts = [];
          for (let i = 1; i <= pc; i++) {
            const post = await sn.methods.posts(i).call();
            fetchedPosts.push(post);
          }
          const cCount = await sn.methods.allCommentCount().call();
          const fetchedComments = [];
          const fetchedCommentsid = [];
          for (let i = 1; i <= cCount; i++) {
            const comment = await sn.methods.comments(i).call();

            fetchedComments.push(comment);
            const id = await sn.methods.commentid(i - 1).call();
            fetchedCommentsid.push(id);
          }

          // setPosts(fetchedPosts)
          setPosts(fetchedPosts.reverse());
          setComments(fetchedComments);
          setCIdArr(fetchedCommentsid);

          const profileCount = await sn.methods.profilecount().call();
          if (profileCount == 0) {
            setRgistered(false);
          } else {
            for (let i = 0; i < profileCount; i++) {
              const validProfile = sn.methods.profilesValid(i).call();
              if (validProfile == accounts[0]) {
                setRgistered(true);
                return;
              }
            }
          }
        }
        setLoading(false);
      } else {
        window.alert(
          "SocialNetwork contract not deployed to detected network."
        );
      }
    };

    loadWeb3();
    loadBlockchainData();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      // Network ID
      const networkId = await web3.eth.net.getId();
      const networkData = SocialNetwork.networks[networkId];
      if (networkData) {
        //this is necessary cuz socialNetwork is sucker
        const sn = new web3.eth.Contract(
          SocialNetwork.abi,
          networkData.address
        );
        setSocialNetwork(sn);
        if (sn !== null) {
          // use `sn` instead of `socialNetwork` dumbo
          const pc = await sn.methods.postCount().call();
          setPostCount(pc);

          // Fetch posts
          const fetchedPosts = [];
          for (let i = 1; i <= pc; i++) {
            const post = await sn.methods.posts(i).call();
            fetchedPosts.push(post);
          }
          const cCount = await sn.methods.allCommentCount().call();

          const fetchedComments = [];
          const fetchedCommentsid = [];
          for (let i = 1; i <= cCount; i++) {
            const comment = await sn.methods.comments(i).call();
            fetchedComments.push(comment);
            const id = await sn.methods.commentid(i - 1).call();
            fetchedCommentsid.push(id);
          }
          // setPosts(fetchedPosts)
          setPosts(fetchedPosts.reverse());
          setComments(fetchedComments);
          setCIdArr(fetchedCommentsid);
          const profileCount = await sn.methods.profilecount().call();
          if (profileCount == 0) {
            setRgistered(false);
          } else {
            for (let i = 0; i < profileCount; i++) {
              const validProfile = sn.methods.profilesValid(i).call();
              if (validProfile == account) {
                setRgistered(true);
                return;
              }
            }
          }
        }
        setLoading(false);
      } else {
        window.alert(
          "SocialNetwork contract not deployed to detected network."
        );
      }
    };
    loadBlockchainData();
  }, [socialNetwork]);
  useEffect(() => {}, []);

  const createPost = (content, hash) => {
    setLoading(true);
    socialNetwork.methods
      .createPost(content, hash)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const tipPost = (id, tipAmount) => {
    setLoading(true);
    socialNetwork.methods
      .tipPost(id)
      .send({ from: account, value: tipAmount })
      .once("receipt", (receipt) => {
        setLoading(false);
      });
  };

  const createProfile = (name) => {
    socialNetwork.methods
      .createProfile(name)
      .send({ from: account })
      .once("receipt", (receipt) => {});
  };
  const addComment = (postid, content) => {
    console.log(14134);
    socialNetwork.methods
      .addComment(postid, content)
      .send({ from: account })
      .once("recipt", (receipt) => {});
  };

  return (
    <div className="whole">
      <TopBar account={account} />
      <div className="mr-main-guy-from-appjs">
        <div className="the-nav-bar">
          <Navbar />
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                account={account}
                posts={posts}
                createPost={createPost}
                tipPost={tipPost}
                loading={loading}
                error={error}
                registered={registered}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                posts={posts.filter((post) => post.author === account)}
              />
            }
          />
          <Route
            path="/CreateProfile"
            element={
              <CreateProfile createProfile={createProfile}></CreateProfile>
            }
          ></Route>
          <Route
            path="/post/:id"
            element={
              <Post
                posts={posts}
                tipPost={tipPost}
                addComment={addComment}
                commentContent={commentContent}
                setCommentContent={setCommentContent}
                socialNetwork={socialNetwork}
                comments={comments}
                cIdArr={cIdArr}
              ></Post>
            }
          ></Route>
        </Routes>
        <SearchPost
          search={search}
          setSearch={setSearch}
          posts={posts}
        />
      </div>
    </div>
  );
}

export default App;
