import React, {Component} from 'react';
import './App.css';

import DownloadForm, { PNGLoader, CSVLoader} from './components/DownloadForm'
import styled from '@emotion/styled';

import GenerateTSV from './DataProcessing/generatePositionsFromPng'; 
import CSVToArray from './DataProcessing/csvToArray'; 
import {csvArrayToObjArray, merge} from './DataProcessing/mergePositionAndCSVData'; 

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
    png: null,
    csv: null, 
    tsv: null, 
    result: null, 
  };


  pngLoader = new PNGLoader((result) => {
    let newState = { ...this.state };
    newState.png = result;
    this.setState(newState);
  });

  csvLoader = new CSVLoader((result) => {
    let newState = { ...this.state };
    newState.csv = result;
    newState.result = csvArrayToObjArray(result); 
    this.setState(newState);
  })

  
  callGenerateTSV  = async () => {
    let tsv =  await GenerateTSV(this.state.png);
    let newState = { ...this.state };
    newState.tsv = CSVToArray(tsv, "\t") ;
    this.setState(newState);

  }

  render() {
    return (
      <div className="App">

        
        {InputGenertator(
          "Jhon csv",
          this.csvLoader,
          this.state.csv,
        )}
        
        {InputGenertator(
          "Image marker",
          this.pngLoader,
          <SImg src={this.state.png} alt="no image loaded"></SImg>
        )}

        <button onClick={this.callGenerateTSV}>Generate TSV</button>
      </div>
    );
  }
}



export default App;
