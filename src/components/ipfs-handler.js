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
        console.log(`error occurred on authentication test: ${error}`);
      });
  }

  async uploadFile(file) {
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

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );

      if (response.status / 100 > 2) {
        console.log(
          `pin file to IPFS failed with status ${response.status}(${response.statusText})`
        );
      } else if (response.data) {
        console.log(
          `file ${file.name} uploaded to IPFS ${response.data.IpfsHash}`
        );
        return response.data.IpfsHash;
      }
    } catch (error) {
      console.log(`file ${file.name} upload failed: ${error}`);
    }
  }

  async uploadNftMetadata(fileName, metadata) {
    const file = new File(
      [JSON.stringify(metadata, null, 2)],
      `${fileName}_metadata.json`,
      {
        type: "application/json",
      }
    );

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "pinataMetadata",
      JSON.stringify({
        name: `${fileName}_metadata.json`,
      })
    );
    formData.append(
      "pinataOptions",
      JSON.stringify({
        cidVersion: 0,
      })
    );

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );

      if (response.status / 100 > 2) {
        console.log(
          `pin metadata file to IPFS failed with status ${response.status}(${response.statusText})`
        );
      } else if (response.data) {
        console.log(
          `file ${fileName} metadata uploaded to IPFS ${response.data.IpfsHash}`
        );
        return response.data.IpfsHash;
      }
    } catch (error) {
      console.log(`file ${fileName} metadata upload failed: ${error}`);
    }
  }
}

export default IpfsHandler;
