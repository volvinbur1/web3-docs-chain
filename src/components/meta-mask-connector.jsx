import { useState } from "react";

function ShowConnectedWallet({address}) {
  if (address != "none") {
    return <p>ConnectedAccount: {address}</p>
  }
  return <></>
}

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
      <ShowConnectedWallet address={address}/>
    </>
  );
}

export default MetaMaskConnector;
