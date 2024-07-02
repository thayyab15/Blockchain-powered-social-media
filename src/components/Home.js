import Main from "./Main";
const Home = ({
  posts,
  createPost,
  tipPost,
  loading,
  error,
  account,
  registered,
}) => {
  return (
    <>
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>{" "}
        </div>
      ) : error ? (
        <div className="text-center mt-5">{`${error} or connect manually and reload.`}</div>
      ) : (
        <Main
          posts={posts}
          createPost={createPost}
          tipPost={tipPost}
          account={account}
        />
      )}
    </>
  );
};

export default Home;
