import React, { Component } from 'react';
import styled from '@emotion/styled';

const LinkS = styled.a`
    display: block;
    width: 100%; 
`

class DownloadableLink extends Component {
    constructor(props) {
        super(props);
        if(props.data === undefined) {
            console.warn("DownloadableLink must have data given as props");
        } 
    }

    render() {
        let dataAsString = JSON.stringify(this.props.data);  
        let url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataAsString);
        return(
            <LinkS download='data.json' href={url} >
               Download result
            </LinkS>
        )

    }


}

export default DownloadableLink;