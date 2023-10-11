import { useState } from 'react'


import './App.css'

function App() {

  const [file, setFile] = useState(null);

  async function handleSubmit(event) {
    fetchImageDesc(file);
    event.preventDefault();
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function fetchImageDesc(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: reader.result,
        }
      );
      const result = await response.json();
      console.log(result[0].generated_text);


    }
      
    }

    // async function fetchChatGPTResponse() {

    // }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    </>
  )
}

export default App
