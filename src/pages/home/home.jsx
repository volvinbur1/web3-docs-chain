import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/upload">Upload</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/search">Search</Link>
    </>
  );
}

export default Home;
