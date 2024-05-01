import { useState } from "react";

function MetaMaskConnector(props) {
  const [address, setAddress] = useState(
    props.metaMaskWallet.state.connectedAddress
  );
  return (
    <>
      <button
        onClick={async () => {
          await props.metaMaskWallet.connect().connectedAddress;
          setAddress(props.metaMaskWallet.state.connectedAddress);
        }}
      >
        Connect MetaMask
      </button>
      <p>ConnectedAccount: {address}</p>
    </>
  );
}

export default MetaMaskConnector;
