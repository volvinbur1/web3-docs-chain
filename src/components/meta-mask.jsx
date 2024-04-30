import { Component } from "react";
import { Web3 } from "web3";

class MetaMask extends Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
    this.loadAccoundAddress = this.loadAccoundAddress.bind(this);
    this.state = {
      isMetaMaskConnected: false,
      connectedAddress: "",
    };

    const web3 = new Web3(window.ethereum);
    this.loadAccoundAddress(web3)
  }


  async loadAccoundAddress(web3) {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
        this.setState({
          connectedAddress: accounts[0],
          isMetaMaskConnected: true,
        });
        console.log(`account ${this.state} connected`);
      } else {
        console.log("no account connected");
      }
  }

  async connect() {
    if (!window.ethereum) {
      alert("install MetaMask extension");
      return;
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    await this.loadAccoundAddress(web3)
  }

  render() {
    return (
      <>
        <button onClick={this.connect}>Connect MetaMask</button>
        <p>ConnectedAccount: {this.state.connectedAddress}</p>
      </>
    );
  }
}

export default MetaMask;
