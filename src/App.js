import React, {Component} from 'react';
import './App.css';

import DownloadForm, { PNGLoader, CSVLoader} from './components/DownloadForm'
import styled from '@emotion/styled';

import GenerateTSV from './DataProcessing/generatePositionsFromPng'; 
import CSVToArray from './DataProcessing/csvToArray'; 
import {csvArrayToObjArray, addIndexToArray } from './DataProcessing/mergePositionAndCSVData'; 

import DataTable, { createTheme } from 'react-data-table-component';
 
createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

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
    excel: [], 
    markers: [], 
    result: [], 
  };


  deleteCellGenerator = (stateProp, row) => {
    return (
      <span onClick={ () => {
        let data = this.state[stateProp];
        let i = data.indexOf(row);
        data.splice(i, 1); 
        let newState = { ...this.state };
        newState[stateProp] = data;
        this.setState(newState);
      }}>
        Delete
      </span> ); 
  }

  pngLoader = new PNGLoader((result) => {
    let newState = { ...this.state };
    newState.png = result;
    this.setState(newState);
  });

  csvLoader = new CSVLoader((result) => {
    let newState = { ...this.state };
    newState.excel = csvArrayToObjArray(result, 
      ["id", "length", "width", "lat", "long" ]); 
    this.setState(newState);
  })

  
  callGenerateTSV  = async () => {
    let tsv =  await GenerateTSV(this.state.png);
    let newState = { ...this.state };
    newState.markers = csvArrayToObjArray(CSVToArray(tsv, "\t"),
      ["h0", "h1", "h2", "h3", "h4", "h5", "x", "y", "dx", "dy", "h10", "value"]) ;
    addIndexToArray(newState.markers); 
    this.setState(newState);

  }


  markersColumns = [
    {
      name: 'i', 
      selector: 'i',
      sortable: true, 
    },
    {
      name: 'x',
      selector: 'x',
      sortable: true,
    },
    {
      name: 'y',
      selector: 'y',
      sortable: true,
    },
    {
      name: 'dx',
      selector: 'dx',
      sortable: true,
    },
    {
      name: 'dy',
      selector: 'dy',
      sortable: true,
    },
    {
      name: 'value',
      selector: 'value',
      sortable: true,
    },
    {
      name: "Delete",
      id:'delete',
      accessor: str => "delete",
      cell: (row) => ( this.deleteCellGenerator("markers", row) ),   
    }
  ]; 

  excelColumns = [
    {
      name: 'id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'length',
      selector: 'length',
      sortable: true,
    },
    {
      name: 'width',
      selector: 'width',
      sortable: true,
    },
    {
      name: 'lat',
      selector: 'lat',
      sortable: true,
    },
    {
      name: 'long',
      selector: 'long',
      sortable: true,
    },
    {
      name: "Delete",
      id:'delete',
      accessor: str => "delete",
      cell: (row) => ( this.deleteCellGenerator("excel", row) )  
    }
  ];
  render() {
    console.log("render called"); 

    return (
      <div className="App">

        
        {InputGenertator(
          "Jhon csv",
          this.csvLoader,
          this.state.csv,
        )}

          <DataTable
          key={this.state.excel.length} // to force update
          title="Excel"
          columns={this.excelColumns}
          data={this.state.excel}
          theme="solarized"
        />
        
        {InputGenertator(
          "Image marker",
          this.pngLoader,
          <SImg src={this.state.png} alt="no image loaded"></SImg>
        )}

        <button onClick={this.callGenerateTSV}>Generate TSV</button>
        <DataTable
          key={this.state.markers.length} // to force update
          title="Markers"
          columns={this.markersColumns}
          data={this.state.markers}
          theme="solarized"
        />

      </div>
    );
  }
}



export default App;
