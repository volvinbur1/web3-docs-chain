import { Web3 } from "web3";

class MetaMaskWallet {
  constructor() {
    this.connect = this.connect.bind(this);
    this.loadAccoundAddress = this.loadAccoundAddress.bind(this);

    const web3 = new Web3(window.ethereum);
    this.loadAccoundAddress(web3);
  }

  state = {
    isMetaMaskConnected: false,
    connectedAddress: "none",
  };

  async loadAccoundAddress(web3) {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      this.state = {
        connectedAddress: accounts[0],
        isMetaMaskConnected: true,
      };
      console.log(`account ${JSON.stringify(this.state)} connected`);
    } else {
      console.log("no account connected");
    }
  }

  async connect() {
    if (!window.ethereum) {
      alert("install MetaMask extension");
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    await this.loadAccoundAddress(web3);
  }
}

export default MetaMaskWallet;
