import React from 'react';
import ReactJson from 'react-json-view';

import './results.scss';

function Results({url, method, data}){
    return (
      <section id="result-container">
        <div id='title'><p>Results: </p></div>
        <div id="info">
          <div><span>Request Method:</span> {method}</div> 
          <div><span>URL:</span> {url}</div>
        </div>

        <pre id='results'>
          {data ? <ReactJson name="data" src={data} theme="monokai" collapseStringsAfterLength={30} /> : null}
        </pre>
      </section>
    );
}

export default Results;
