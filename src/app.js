import React, { useReducer } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

//=================================================================================

// Set actions
const ACTIONS = {
  SET_LOADING_STATE: 'loading',
  SET_REQUEST_PARAMS: 'request',
  SET_RESPONSE_DATA: 'response'
}

//set initial state
const initialState = {
  isLoading: false,
  requestParams: {},
  resData: {}
}

//=================================================================================

//reducer function for useReducer hook
function reducer(state, action){
  console.log('s', state, 'a', action);
  switch (action.type) {

    case ACTIONS.SET_LOADING_STATE:
      return {...state, isLoading: action.payload.loading}

    case ACTIONS.SET_REQUEST_PARAMS:
      return {...state, requestParams: action.payload.reqParams}

    case ACTIONS.SET_RESPONSE_DATA:
      return {...state, resData: action.payload.resData}
  
    default:
      return state;
  }
}

//=================================================================================

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const resDataSetter = (data) => {
    dispatch({type: ACTIONS.SET_RESPONSE_DATA, payload: {resData: data}})
  }

  const reqParamsSetter = (data) => {
    dispatch({type: ACTIONS.SET_REQUEST_PARAMS, payload: {reqParams: data}})
  }

  const loadingSetter = (bool) => {
    dispatch({type: ACTIONS.SET_LOADING_STATE, payload: {loading: bool}})
  }

  function makeRequest(reqParams){
    axios({
      method: reqParams.method,
      url: reqParams.url,
      data: reqParams.data,
    }).then((res) => {
      resDataSetter(res.data);
      loadingSetter(false)
    });
  }

  const callApi = (requestData) => {
    loadingSetter(true);
    reqParamsSetter(requestData);
    makeRequest(requestData);
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method ? state.requestParams.method.toUpperCase() : ''}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {state.isLoading ?  "Loading...": <Results data={state.resData} /> }
      <Footer />
    </React.Fragment>
  );
}

export default App;
