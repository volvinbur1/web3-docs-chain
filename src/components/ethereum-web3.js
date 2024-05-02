import DocsStorageAbi from "./../../web3-backend/solidity/DocsStorage/DocsStorage.json";

const docsStorageAddress = "0xcbAE8011F1375532BA256c739964d5d8682c4282";

class Ethereum {
  #metaMaskWallet;
  #docsStorageContract;
  #web3;
  constructor(web3, metaMaskWallet) {
    this.#web3 = web3;
    this.#docsStorageContract = new this.#web3.eth.Contract(
      DocsStorageAbi,
      docsStorageAddress
    );
    this.#metaMaskWallet = metaMaskWallet;
  }

  storeNewPaper(ipfsFileHash, docInfo) {
    const docInfoData = this.#web3.eth.abi.encodeParameters(
      ["string", "string", "string", "string", "string"],
      [
        docInfo.topic,
        docInfo.description,
        docInfo.authorName,
        docInfo.authorSurname,
        docInfo.authorScienceDegree,
      ]
    );

    this.#docsStorageContract.methods
      .registerNewDoc(ipfsFileHash, docInfoData)
      .send({ from: this.#metaMaskWallet.state.connectedAddress })
      .then(function (reciept) {
        console.log(`'registerNewDoc call successful: '${reciept}`);
      })
      .catch(function (error) {
        console.log(`'registerNewDoc' call failed: ${error}`);
      });
  }
}

export default Ethereum;
