import { version, Component } from 'inferno';
import Logo from './logo';
import './App.css';


class App extends Component {


  last_target = null;

  handleDragOn = (event) => {
    this.last_target = event.target;
    document.querySelector(".dropzone").style.visibility = "";
    document.querySelector(".dropzone").style.opacity = 1;
  }

  handleDragOff = (event) => {
    event.preventDefault();
    if(event.target === document || event.target === this.last_target) {
      document.querySelector(".dropzone").style.visibility = "hidden";
      document.querySelector(".dropzone").style.opacity = 0;
    }

  }

  uploadModel = (file) => {
    let url = 'http://127.0.0.1:5000/upload_model'
    let formData = new FormData()

    formData.append('file', file)

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(() => { 
      document.querySelector(".droptext").innerHTML += "<div style='color: green'> ✔️</div>";
    })
    .catch((error) => { 
      document.querySelector(".droptext").innerHTML += error;//"Error uploading - couldn't submit form.";
    })
  }

  handleDrop = (e) => {
    e.preventDefault();
    document.querySelector(".dropzone").style.visibility = "hidden";
    document.querySelector(".dropzone").style.opacity = 0;
    if(e.dataTransfer.files.length == 1) {
        document.querySelector(".droptext").innerHTML =
            "<b>Model: </b><div style='color:#CA6680'>" + e.dataTransfer.files[0].name + "</div>";
            this.uploadModel(e.dataTransfer.files[0]);
    } else {
      document.querySelector(".droptext").innerHTML =
            "Can only accept one file at a time right now!";
    }
  }

  componentDidMount() {
    window.addEventListener("dragenter", this.handleDragOn);
    window.addEventListener("dragover", (event) => event.preventDefault());
    window.addEventListener("drop", this.handleDrop);
    window.addEventListener("dragleave", this.handleDragOff);
  }

  render() {
    return (
      <div id="zone" className="App">
        <header className="App-header">
        <div class="inferno-logo">
        <h1 class="test-text test"><i class="fas test fa-fire-alt fa-2x"/> campfire.</h1>
        <p class="info-text">Quickly deploy and query a Torchscript model<br/></p>
        <b class="droptext">
        Drop your model <code>pt</code> file here.</b>
        <form style="visibility: hidden; opacity:0" class="file-form">
          <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
          <input type="file" id="fileElem" multiple accept="application/pt" onchange="handleFiles(this.files)"/>
          <label class="button" for="fileElem">Select some files</label>
        </form>
        <div style="visibility:hidden; opacity:0" class="dropzone"><h2>Run this model</h2></div>
        <sup className="App-bottom" style="font-size: 0.5em"><a class="inferno-logo" style="text-decoration: none" href="https://mirofurtado.com">created by miro furtado</a>
 </sup>
        </div>
        </header>
      </div>
    );
  }
}

export default App;
