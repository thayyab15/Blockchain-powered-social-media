import { Link } from 'react-router-dom'
const Navbar = () => {

    return (
      <nav>
        <Link to="/" style={{textDecoration:"none"}}>
        <p
          style={{marginLeft:"20px"}}>
          Home
        </p>
        </Link>
        <Link to="/profile" style={{textDecoration:"none"}}>
        <p
          style={{marginLeft:"20px"}}>
          Profile
        </p>
        </Link>

        <Link to="/CreateProfile"style= {{textDecoration:"none"}}>
        <p
          style={{marginLeft:"20px"}}>
          Create profile
        </p>
        </Link>
      </nav>
    );
}

export default Navbar;
