import React, {Component} from 'react';
import './App.css';

import DownloadForm from './components/DownloadForm'


import { createWorker } from 'tesseract.js';

/*
const worker = createWorker({
  logger: m => console.log(m)
});


(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(text);
  await worker.terminate();
})();
*/


function Loader(onSuccess) { 

  console.log("Loader constructor called"); 

  this.filereader = new FileReader(); 
  this.filereader.onload = (e) => { 
    console.log("Loader: onload called");
    const result = JSON.parse(this.filereader.result); 
    onSuccess(result); 
  }
  this.onImport = (file) => {
    console.log("Loader: onImport called");
    this.filereader.readAsText(file);     
  }
  


}


class App extends Component {
  

  state = {
    json : null,
  }


  jsonLoader = new Loader((result)=>{
    console.log("jsonLoader on Success: ");
    let newState = {... this.state};
    newState.json = result; 
    this.setState(newState ); 
  }); 

  
  render() {
    return (
      <div className="App">      
        <DownloadForm fileType="JSON" loader={this.jsonLoader} ></DownloadForm>
        <div>{this.state.counter}</div>
        <button onClick={()=>this.setState({counter: this.state.counter+1})}></button>
      </div>
    );
    
  }

}



export default App;
