function App() {

  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: "POST",
        body: formData
      })
      console.log(await response.json());
    } catch(err) {
      console.log(err);
    }
    
  }

  //working as intended
  const helloWorldHandler = async (e) => {
    try {
      const response = await fetch('http://localhost:3001/hello', {
        method: "GET"
      })
      console.log( await response.json());
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <p>This is the index page</p>
      <button onClick={helloWorldHandler}>Hello World!</button>
      <input type="file" onChange={uploadHandler}/>
    </div>
  );
}

export default App;
