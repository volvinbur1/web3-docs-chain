import DocsStorageAbi from "./../../web3-backend/solidity/contracts/storage/DocsStorage.json";
import Web3 from "web3";

const docsStorageAddress = "0xcbAE8011F1375532BA256c739964d5d8682c4282";

class Ethereum {
  constructor() {
    const web3Provider = new Web3('https://sepolia.infura.io/v3/02c9258170644763be0924b7daa954dc');
    this.docsStorageContract = new web3Provider.eth.Contract(
      DocsStorageAbi,
      docsStorageAddress
    );
  }

  storeNewPaper(ipfsFileHash, docInfo) {
    if (window.ethereum) {
        
    }
    docInfoData = abiCoder.encode(
      ["string", "string", "string", "string", "string"],
      [
        docInfo.topic,
        docInfo.description,
        docInfo.authorName,
        docInfo.authorSurname,
        docInfo.authorScienceDegree,
      ]
    );

    this.docsStorageContract.methods
      .registerNewDoc(ipfsFileHash, docInfoData)
      .send(
        { from: web3Provider.eth.getAccounts() }.then(function (reciept) {
          console.log(`'registerNewDoc call successful: '${reciept}`);
        })
      )
      .catch(function (error) {
        console.log(`'registerNewDoc' call failed: ${error}`);
      });
  }
}

export default Ethereum;
