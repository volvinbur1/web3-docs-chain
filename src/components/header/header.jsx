import MetaMaskConnector from "../meta-mask-connector.jsx";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      <header>
        <nav>
          <ul className="header_menu">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <MetaMaskConnector metaMaskWallet={props.metaMaskWallet} />
        </nav>
      </header>
    </>
  );
}

export default Header;
