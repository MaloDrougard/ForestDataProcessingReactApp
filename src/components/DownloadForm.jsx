import React, { Component } from 'react';
import styled from '@emotion/styled';

        /*
// function to import the json 
document.getElementById('importJSON').onclick = function() {

    let files = document.getElementById('selectedJSONFiles').files;
    console.log(files);

    if (files.length <= 0) {
        return false;
    }

    let fr = new FileReader();

    fr.onload = function(e) { 
    console.log(e);
        json = JSON.parse(e.target.result);
        document.getElementById('JSONView').value =  JSON.stringify(json, null, 2);
    }

    fr.readAsText(files.item(0));
};
*/


const Container = styled.div`
    display: block;
    width: 50vw; 
`
const InputS = styled.input`
    display: block; 
    width: 100%;
`

const ButtonS = styled.button`
    display: block; 
    width: 50%;
`

const TextAreaS = styled.textarea`
    display: block; 
    width: 100%;
`

class DownloadForm extends Component {

    state = {
        files: null,
    }; 

    constructor(props) {
        super(props);
        if(props.loader === undefined) {
            console.warn("DownloadForm must have a obj given as props");
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
            <TextAreaS id="view">
               
            </TextAreaS>
            </Container>
        );
}
}

export default DownloadForm;