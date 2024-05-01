import MetaMaskConnector from "../../components/meta-mask-connector";
import DocsProcessor from "../../components/docs-processor";
import { useState } from "react";

function Upload(props) {
  const [file, setFile] = useState(null);
  const docProcessor = new DocsProcessor(props.metaMaskWallet);

  return (
    <>
      <h1>Upload Page</h1>
      <MetaMaskConnector metaMaskWallet={props.metaMaskWallet} />

      <div>
        <input type="file" onChange={(event) => {setFile(event.target.files[0])}} />
        <button onClick={() => {docProcessor.uploadNewDoc(file)}}>Upload!</button>
      </div>
    </>
  );
}

export default Upload;
