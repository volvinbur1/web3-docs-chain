import axios from "axios";

class IpfsHandler {
  constructor() {
    axios
      .get("https://api.pinata.cloud/data/testAuthentication", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
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
  }

  uploadFile(file) {
    if (!file) {
      alert("file is not selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "pinataMetadata",
      JSON.stringify({
        name: file.name,
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
          authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
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
    console.log(file);
  }
}

export default IpfsHandler;
