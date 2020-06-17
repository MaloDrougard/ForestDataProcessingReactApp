import React, { Component } from 'react';
import styled from '@emotion/styled';




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
    
    state = {
        files: null,
    }; 

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
                    this.setState({files: e.target.files}); }} />
            <ButtonS id="importBtn" 
                onClick={ () => {
                    console.log("Import clicked");
                    if (this.state.files && this.state.files[0]) {
                        this.props.loader.onImport(this.state.files[0])  
                    }else {
                        console.log("No file is present")
                    }
                }
            }>
                Import 
            </ButtonS>
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
  




export {JSONLoader, PNGLoader};
export default DownloadForm;