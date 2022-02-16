import React, { useState } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {


  let [data, setData] = useState(null);
  let [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false)

  const dataSetter = (data) => {
    setData(data)
  }

  const reqParamsSetter = (obj) => {
    setRequestParams(obj);
  }

  const loadingSetter = (bool) => {
    setLoading(bool)
  }

  const callApi = (reqParams) => {
    // mock output
    const data = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    loadingSetter(true);

    setTimeout( () => {
      loadingSetter(false);
    }, 2000);
    
    console.log(reqParams);
    dataSetter(data);
    reqParamsSetter(reqParams);
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method ? requestParams.method.toUpperCase() : ''}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {loading ?  "Loading...": <Results data={data} /> }
      <Footer />
    </React.Fragment>
  );
}

export default App;
