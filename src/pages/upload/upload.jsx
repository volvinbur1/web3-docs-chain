import DocsProcessor from "../../components/docs-processor";
import { useState } from "react";

function Upload(props) {
  const [formData, setFormData] = useState({
    file: null,
    topic: "",
    description: "",
    authors: "",
  });

  const docProcessor = new DocsProcessor(props.web3, props.metaMaskWallet);

  return (
    <>
      <h1>Upload Page</h1>
      <div className="upload-form">
        <form
          className="upload-form"
          method="post"
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
            docProcessor.handleNewDoc(formData);
          }}
        >
          <div className="upload-form">
            <label htmlFor="target-doc">Doc to upload:</label>
            <input
              type="file"
              name="target-doc"
              onChange={(event) => {
                setFormData({ ...formData, file: event.target.files[0] });
              }}
              required
            />
          </div>
          <div className="upload-form">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              name="topic"
              onChange={(event) => {
                setFormData({ ...formData, topic: event.target.value });
              }}
              required
            />
          </div>
          <div className="upload-form">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              onChange={(event) => {
                setFormData({ ...formData, description: event.target.value });
              }}
              required
            />
          </div>
          <div className="upload-form">
            <label htmlFor="authors">Authors:</label>
            <input
              type="text"
              name="authors"
              onChange={(event) => {
                setFormData({ ...formData, authors: event.target.value });
              }}
              required
            />
          </div>
          <div className="upload-form">
            <input type="submit" value="Upload!" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Upload;
