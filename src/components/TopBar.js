import { Link } from "react-router-dom";
import Identicon from "identicon.js";
const TopBar = ({ account }) => {
  return (
    <div className="top-bar">
      <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
        <p style={{ marginLeft: "20px", width: "fit-content" }}>DC Social</p>
        
      </Link>

      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <small id="account" style={{ color: "white", marginRight: "10px" }}>
              {account}
            </small>
            {account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                alt="post"
                style={{ marginRight: "20px", borderRadius: "50%" }}
                src={`data:image/png;base64,${new Identicon(
                  account,
                  30
                ).toString()}`}
              />
            ) : (
              <span>hai</span>
            )}
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default TopBar;
