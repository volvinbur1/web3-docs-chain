import Ethereum from "./ethereum-web3";
import IpfsHandler from "./ipfs-handler";

class DocsProcessor {
  #ipfsHandler;
  #ethereum;

  constructor(web3, metaMaskWallet) {
    this.metaMaskWallet = metaMaskWallet;
    this.#ipfsHandler = new IpfsHandler(metaMaskWallet);
    this.#ethereum = new Ethereum(web3, metaMaskWallet);
  }

  async uploadNewDoc(file) {
    if (!this.metaMaskWallet.state.isMetaMaskConnected) {
      alert("Connect metamask first");
    }
    const uploadedFileIpfsHash = await this.#ipfsHandler.uploadFile(file);
    if (!uploadedFileIpfsHash) {
      console.log(`file ${file.name} not uploaded`);
      return;
    }

    this.#ethereum.storeNewPaper(uploadedFileIpfsHash, {
      topic: "test_topic",
      description: "test_description",
      authorName: "test_author_name",
      authorSurname: "test_author_surname",
      authorScienceDegree: "test_auhtor_science_degree",
    });
  }
}

export default DocsProcessor;
