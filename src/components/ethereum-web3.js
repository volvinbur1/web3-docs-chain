import DocsStorageAbi from "./../../web3-backend/abi/DocsStorage.json";
import DocsChainNftAbi from "./../../web3-backend/abi/DocsChainNft.json";
import MarketPlaceAbi from "./../../web3-backend/abi/MarketPlace.json";

// mint price in WEI
const mintPrice = 1000000000000000;

class Ethereum {
  #web3;
  #metaMaskWallet;

  #docsStorageContract;
  #docsChainNftContract;
  #marketPlaceContract;

  constructor(web3, metaMaskWallet) {
    this.#web3 = web3;
    this.#metaMaskWallet = metaMaskWallet;

    try {
      this.#docsStorageContract = new this.#web3.eth.Contract(
        DocsStorageAbi,
        import.meta.env.VITE_DOCS_STORAGE_ADDRESS
      );
      this.#docsChainNftContract = new this.#web3.eth.Contract(
        DocsChainNftAbi,
        import.meta.env.VITE_DOCS_CHAIN_NFT_ADDRESS
      );
      this.#marketPlaceContract = new this.#web3.eth.Contract(
        MarketPlaceAbi,
        import.meta.env.VITE_MARKET_PLACE_ADDRESS
      );
    } catch (error) {
      console.log(`contract instantiation failed: ${error}`);
    }
  }

  storeNewPaper(docIpfsHash, tokenId, docInfo) {
    const docInfoData = this.#web3.eth.abi.encodeParameters(
      ["string", "string", "string", "string"],
      [
        docInfo.fileIpfsHash,
        docInfo.topic,
        docInfo.description,
        docInfo.authorsName,
      ]
    );

    this.#docsStorageContract.methods
      .registerNewDoc(docIpfsHash, tokenId, docInfoData)
      .send({ from: this.#metaMaskWallet.state.connectedAddress })
      .then(function (receipt) {
        console.log(
          `'registerNewDoc call successful under transaction ${receipt.transactionHash}`
        );
      })
      .catch(function (error) {
        console.log(`'registerNewDoc' call for doc ipfs ${docIpfsHash} failed: ${error}`);
      });
  }

  async mintNewNft(docIpfs) {
    return new Promise((resolve, reject) => {
      const transferEvent = this.#docsChainNftContract.events.Transfer({
        filter: { from: "0x0000000000000000000000000000000000000000" },
        fromBlock: "latest",
      });
      transferEvent.once("data", (event) => {
        resolve(event.returnValues.tokenId);
      });
      transferEvent.once("error", (error) => {
        reject(
          `'Transfer' event for doc ipfs ${docIpfs} triggered error: ${error}`
        );
      });

      this.#docsChainNftContract.methods
        .safeMint(docIpfs)
        .send({
          from: this.#metaMaskWallet.state.connectedAddress,
          value: mintPrice,
        })
        .then(function (receipt) {
          console.log(
            `'safeMint' call successful under transaction ${receipt.transactionHash}`
          );
        })
        .catch(function (error) {
          console.log(`mint nft for doc ipfs ${docIpfs} failed: ${error}`);
        });
    });
  }
}

export default Ethereum;
