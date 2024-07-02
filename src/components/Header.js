import { Link } from 'react-router-dom'
import Identicon from 'identicon.js';

const Header = ({account}) => {
    return(
        <Header>
            <p>hasi</p>
            {/* <Link to="/" style={{textDecoration:"none"}}>
                <p
                style={{marginLeft:"20px"}}>
                Homies
                </p>
            </Link> */}
            <Link to="/profile" style={{textDecoration:"none"}}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <small id="account" style={{color:"white", marginRight:"10px"}}>{account}</small>
                        { account
                        ? <img
                            className='ml-2'
                            width='30'
                            height='30'
                            style={{marginRight:"20px", borderRadius:"50%"}}
                            src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                        />
                        : <span>hai</span>
                        }
                    </li>
                </ul>
            </Link>
        </Header>
    )
}
export default Header