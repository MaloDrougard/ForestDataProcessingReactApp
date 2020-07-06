import React, { Component } from 'react';
import styled from '@emotion/styled';

import CSVToArray from '../DataProcessing/csvToArray'; 


const Container = styled.div`
    display: block;
    width: 100%; 
`
const InputS = styled.input`
    display: block; 
    width: 100%;
`

const ButtonS = styled.button`
    display: block; 
    width: 50%;
`

/** 
* This class is a layout to load some data in the App.
* It works in collaboration with a loader (eg: JSONLoader, PNGLoader).
* This class take care of the view and call the loader onImport method once the import btn is clicked
*/
class DownloadForm extends Component {
    
      constructor(props) {
        super(props);
        if(props.loader === undefined) {
            console.warn("DownloadForm must have loader given as props, loader implement the onImport method to real import the data");
        } 
    }

        
    render() {
               
        return (
            <Container>
            <InputS type="file"  
                onChange={ (e) => {
                    if ( e.target.files[0]) {
                        this.props.loader.onImport(e.target.files[0])  
                    }else {
                        console.log("No file is present")
                    }
            }} />
            </Container>
        );
}
}


/**
 * Helper class for  DownloadForm class.
 * Take care of implementing the import and formating of JSON data.
 * @param {* called once once the the data is correctly loaded} onSuccess 
 */
function JSONLoader(onSuccess) { 

    console.log("Loader constructor called"); 
    this.data = null; 

    this.filereader = new FileReader(); 
    this.filereader.onload = (e) => { 
      console.log("Loader: onload called");
      this.data = JSON.parse(this.filereader.result); 
      onSuccess(this.data); 
    }
    this.onImport = (file) => {
      console.log("Loader: onImport called");
      this.data = null; 
      this.filereader.readAsText(file);     
    }
}
  

 /**
  * Helper class for  DownloadForm class.
  * Take care of implementing the import and formating of PNG data.
  * @param {*called once once the the data is correctly loaded} onSuccess 
  */ 
function PNGLoader(onSuccess) {
    console.log("Loader constructor called"); 
    this.data = null; 

    this.filereader = new FileReader(); 

    this.filereader.onload = (e) => { 
      console.log("Loader: onload called"); 
      this.data = this.filereader.result; 
      onSuccess(this.data); 
    }
    this.onImport = (file) => {
      console.log("Loader: onImport called");
      this.data = null; 
      this.filereader.readAsDataURL(file);     
    }
}

function CSVLoader(onSuccess) {
    console.log("Loader constructor called"); 
    this.data = null; 

    this.filereader = new FileReader(); 

    this.filereader.onload = (e) => { 
      console.log("Loader: onload called"); 
      this.data = CSVToArray(this.filereader.result); 
      onSuccess(this.data); 
    }
    this.onImport = (file) => {
      console.log("Loader: onImport called");
      this.data = null; 
      this.filereader.readAsText(file);     
    }

}
  




export {JSONLoader, PNGLoader, CSVLoader};
export default DownloadForm;