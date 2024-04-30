import "./App.css";
import React, { Component } from "react";
import axios from "axios";

import Ethereum from "./ethereum-web3/ethereum-web3.mjs";

class App extends Component {
  constructor(props) {
    super(props);

    axios
      .get("https://api.pinata.cloud/data/testAuthentication", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      })
      .then(function (response) {
        if (response.status / 100 > 2) {
          console.log(
            `authentication test failed with status ${response.status}(${response.statusText})`
          );
        }
      })
      .catch(function (error) {
        console.log(`error occured on authentication test: ${error}`);
      });

    ethereum = new Ethereum();
  }

  state = {
    selectedFile: null,
  };

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onFileUpload = () => {
    if (!this.state.selectedFile) {
      alert("file is not selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append(
      "pinataMetadata",
      JSON.stringify({
        name: this.state.selectedFile.name,
      })
    );
    formData.append(
      "pinataOptions",
      JSON.stringify({
        cidVersion: 0,
      })
    );

    axios
      .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      })
      .then(function (response) {
        if (response.status / 100 > 2) {
          console.log(
            `pin file to IPFS failed with status ${response.status}(${response.statusText})`
          );
        } else if (response.data) {
        }
      })
      .catch(function (error) {
        console.log(`error occured on authentication test: ${error}`);
      });
    console.log(this.state.selectedFile);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;
