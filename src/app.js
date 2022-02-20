import React, { useReducer } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

//=================================================================================

class searchHistory{
  constructor(req, res){
    this.request = req;
    this.response = res;
    this.date = new Date();
    this.id = Date.now();
  }
}

// Set actions
const ACTIONS = {
  SET_LOADING_STATE: 'loading',
  SET_REQUEST_PARAMS: 'request',
  SET_RESPONSE_DATA: 'response',
  SET_HISTORY: 'history'
}

//set initial state
const initialState = {
  isLoading: false,
  requestParams: {},
  resData: {},
  history: []
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

    case ACTIONS.SET_HISTORY:
      return {...state, history: action.payload.history}

    case ACTIONS.ADD_HISTORY:
      return {...state, history: [...state.history, action.payload.history]}

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

  const historyAdder = (req, res) => {
    dispatch({type: ACTIONS.ADD_HISTORY, payload: {history: new searchHistory(req, res)}})
  }
  
  const historySetter = (history) => {
    dispatch({type: ACTIONS.SET_HISTORY, payload: {history: history}})
  }


  function makeRequest(reqParams){
    axios({
      method: reqParams.method,
      url: reqParams.url,
      data: reqParams.data,
    }).then((res) => {
      historyAdder(reqParams, res.data);
      resDataSetter(res.data);
      loadingSetter(false)
    });
  }

  const callApi = (requestData) => {
    loadingSetter(true);
    reqParamsSetter(requestData);
    makeRequest(requestData);
  }


  function deleteHistory(id){
    let newHistory = state.history.filter( history => history.id !== id);
    historySetter(newHistory);
  }

  return (
    <React.Fragment>
      <Header />
      <Form handleApiCall={callApi} />
      <div>URL: {state.requestParams.url}</div>
      <div>Request Method: {state.requestParams.method ? state.requestParams.method.toUpperCase() : ''}</div>
      <History searchHistory={state.history} deleteHistory={deleteHistory}/>
      {state.isLoading ?  "Loading...": <Results data={state.resData} /> }
      <Footer />
    </React.Fragment>
  );
}

export default App;
