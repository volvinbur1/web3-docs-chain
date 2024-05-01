import IpfsHandler from "./ipfs-handler";

class DocsProcessor {
  #ipfsHandler;
  constructor(metaMaskWallet) {
    this.metaMaskWallet = metaMaskWallet;
    this.#ipfsHandler = new IpfsHandler(metaMaskWallet);
  }

  uploadNewDoc(file) {
    this.#ipfsHandler.uploadFile(file);
  }
}

export default DocsProcessor;
