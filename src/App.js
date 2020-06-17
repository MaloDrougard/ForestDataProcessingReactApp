import React, {Component} from 'react';
import './App.css';

import DownloadForm, {JSONLoader, PNGLoader} from './components/DownloadForm'
import styled from '@emotion/styled';





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





const Container = styled.div`
    display:inline-block;
    width: 100vw;
`

const SView = styled.div`
   display: block;
   width: 100%;
   margin:0px;
   border:0px;  
`

const SImg = styled.img`
  width:100%;
`

function InputGenertator(title,loader, view ) {
  return(
    <Container>
      <h4>{title}</h4>
      <DownloadForm loader={loader}>
      </DownloadForm>
      <SView>
        {view}
      </SView>
    </Container>
  ); 


}

class App extends Component {
  

  state = {
    json : null,
    png: null,
  }

  jsonLoader = new JSONLoader((result)=>{
    let newState = {... this.state};
    newState.json = result; 
    this.setState(newState ); 
  }); 
 
  pngLoader = new PNGLoader( (result)=>{
    let newState = {... this.state};
    newState.png = result; 
    this.setState(newState ); 
  }); 
  


  render() {
    return (
      <div className="App">      
        {InputGenertator("Jhon Json", this.jsonLoader, JSON.stringify(this.state.json))}
        {InputGenertator("Image marker", this.pngLoader, <SImg src={this.state.png} alt="no image loaded"></SImg>) }
        
      </div>
    );
    
  }

}



export default App;
