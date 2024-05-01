import { Link } from "react-router-dom";
import MetaMaskConnector from "../../components/meta-mask-connector.jsx";

function Home(props) {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/upload">Upload</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/search">Search</Link>
      <MetaMaskConnector metaMaskWallet={props.metaMaskWallet}/>
    </>
  );
}

export default Home;
