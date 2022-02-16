import React from 'react';
import ReactJson from 'react-json-view';

import './results.scss';

function Results(props){
    return (
      <section>
        <pre style={{ "height": "400px", "display": "flex", "justifyContent": "space-around"}} >{props.data ? <ReactJson style={{"width": "35%", "display": "flex", "justifyContent": "space-around"}} name="data" src={props.data} theme="monokai" /> : null}</pre>
      </section>
    );
}

export default Results;
