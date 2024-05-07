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

  async handleNewDoc(file, docDesc) {
    if (!this.metaMaskWallet.state.isMetaMaskConnected) {
      alert("Connect metamask first");
    }
    

    this.#ethereum.storeNewPaper(uploadedFileIpfsHash, {
      topic: "test_topic",
      description: "test_description",
      authorsName: "test_authors_name",
      authorScienceDegree: "test_auhtor_science_degree",
    });
  }

  async #uploadDocToIpfs(file, docDesc) {
    const uploadedFileIpfsHash = await this.#ipfsHandler.uploadFile(file);
    if (!uploadedFileIpfsHash) {
      console.log(`file ${file.name} not uploaded`);
      return;
    }

    const metadata = {
        name: docDesc.topic,
        description: docDesc.description,
        image: import.meta.env.VITE_IMAGE_ICON,
        docFileIpfs: 
    }
  }
}

export default DocsProcessor;
