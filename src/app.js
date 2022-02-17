import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function App() {

    let [isFirstMount, setIsFirstMount] = useState(true);

    let [data, setData] = useState(null);
    let [requestParams, setRequestParams] = useState({});
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isFirstMount || isEmpty(requestParams)) {
      console.log('No Request Called');
      setIsFirstMount(false);
    } else {
      axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.data
      }).then((res) => {
        dataSetter(res.data);
        reqParamsSetter(requestParams);
        loadingSetter(false);
      });
    }
  }, [requestParams])


  

  const dataSetter = (data) => {
    setData(data)
  }

  const reqParamsSetter = (obj) => {
    setRequestParams(obj);
  }

  const loadingSetter = (bool) => {
    setLoading(bool)
  }

  const callApi = (requestData) => {
    loadingSetter(true);
    setRequestParams(requestData);
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
