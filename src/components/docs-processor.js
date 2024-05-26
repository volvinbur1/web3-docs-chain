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

  async handleNewDoc(formData) {
    console.log(formData);
    if (!this.metaMaskWallet.state.isMetaMaskConnected) {
      alert("Connect metamask first");
    }

    // const docIpfsHash = await this.#uploadDocToIpfs(formData);
    // if (!docIpfsHash) {
    //   return;
    // }

    const [docIpfsHash, fileIpfsHash] = [
      "TEST_DOC_IPFS_HASH",
      "TEST_FILE_IPFS_HASH",
    ];
    console.log(`A new doc uploaded to IPFS network: ${docIpfsHash}`);

    let tokenId;
    try {
      tokenId = await this.#ethereum.mintNewNft(docIpfsHash);
      console.log(`A new non-fungible token id minted: ${tokenId}`);
    } catch (error) {
      console.log(`mint of a new non-fungible token failed: ${error}`);
      return;
    }

    try {
      this.#ethereum.storeNewPaper(docIpfsHash, tokenId, {
        fileIpfsHash: fileIpfsHash,
        topic: formData.topic,
        description: formData.description,
        authors: formData.authors,
      });
    } catch (error) {
      console.log(`store of new paper failed: ${error}`);
      return;
    }
  }

  async #uploadDocToIpfs(formData) {
    const uploadedFileIpfsHash = await this.#ipfsHandler.uploadFile(
      formData.file
    );
    if (!uploadedFileIpfsHash) {
      console.log(`file ${formData.file.name} not uploaded`);
      return;
    }

    const metadata = {
      name: formData.topic,
      description: formData.description,
      authors: formData.authors,
      // image: import.meta.env.VITE_IMAGE_ICON,
      docFileIpfs: uploadedFileIpfsHash,
    };
    const metadataIpfsHash = await this.#ipfsHandler.uploadNftMetadata(
      formData.file.name,
      metadata
    );
    if (!metadataIpfsHash) {
      console.log(`metadata for ${formData.file.name} upload to IPFS failed.`);
      return;
    }

    return { metadataIpfsHash, uploadedFileIpfsHash };
  }
}

export default DocsProcessor;
