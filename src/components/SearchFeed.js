import Identicon from 'identicon.js';
import { Link } from 'react-router-dom';

const SearchFeed = ({posts}) => {
    return(
        <div className="search-feed">
            {posts.map((post, key) => (
              <Link to={`/post/${post.id}`}>
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
                  <small>{(post.author).length <=25
                    ? post.author
                    : `${(post.author).slice(0, 25)}...`}</small>
                </div>

                <ul id="postList">
                  <li style={{ padding: "0px", "list-style-type": "none" }}>
                    <p style={{ margin: "5px 10px" }}>{(post.content).length <=25
                    ? post.content
                    : `${(post.content).slice(0, 25)}...`}</p>
                  </li>
                </ul>
              </div>
              </Link>
            ))}
        </div>
    )
}

export default SearchFeed