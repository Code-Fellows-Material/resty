import React, { useReducer, useEffect } from 'react';
import './form.scss';

// Defines reducer actions for consistency 
const ACTIONS = {
  CHANGE_MOUNT_STATE: 'mount_state',
  SET_METHOD: 'set_method',
  SET_REQUEST_DATA: 'set_request_data'
}

// Sets initial State
const initialState = {
  isFirstMount: true,
  method: 'get',
  requestData: {}
}

//reducer function for useReducer hook
function reducer(state, action){
  switch (action.type) {
    case ACTIONS.CHANGE_MOUNT_STATE:
      return {...state, isFirstMount: action.payload.mountState};
    case ACTIONS.SET_METHOD:
      return {...state, method: action.payload.method};
    case ACTIONS.SET_REQUEST_DATA:
      return {...state, requestData: action.payload.requestData};
    default:
      return state;
  }
}

// Form Component 
function Form({handleApiCall}){
 
  //State
  const [state, dispatch] = useReducer(reducer, initialState)

  //Monitor the state variable, run cb if changes occur
  useEffect(() => {
    if (state.isFirstMount) {
      dispatch({type: ACTIONS.CHANGE_MOUNT_STATE, payload: {mountState: false}});
    } else {    
      handleApiCall(state.requestData);
    }
  }, [state]);

  //handle submit of form - set state.requestData
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ 
      type: ACTIONS.SET_REQUEST_DATA, 
      payload: { 
        requestData: {
          method: state.method,
          url: e.target.url.value ? e.target.url.value : '',
          data: e.target.body ? e.target.body.value : {},
        }
    }});  
  }
  
  //set state.method
  const methodSetter = (method) => {
    dispatch({ 
      type: ACTIONS.SET_METHOD, 
      payload: { 
        method: method
    }});
  }
    
  //check method, returning name of class for styling purposes
  const clickCheck = (spanMethod) => {
    return state.method === spanMethod ? "buttonTrue": "buttonFalse"
  }


  return (
    <>
      <form data-testid="test-form" onSubmit={handleSubmit}>
        <label method={state.method} className="methods">
          <span id="get"  data-testid="get-form"  className={clickCheck('get')}    onClick={() => methodSetter('get')}>GET</span>
          <span id="post"  data-testid="post-form" className={clickCheck('post')}   onClick={() => methodSetter('post')}>POST</span>
          <span id="put"    className={clickCheck('put')}    onClick={() => methodSetter('put')}>PUT</span>
          <span id="delete" className={clickCheck('delete')} onClick={() => methodSetter('delete')}>DELETE</span>
        </label>
        <label >
          <span>URL: </span>
          <input  name='url' type='text' />
          <button data-testid="button" type="submit">GO!</button>
        </label>
        {(state.method === 'post' || state.method === 'put') && <label>
            <textarea name="body"></textarea>
          </label>}
      </form>
    </>
  );
}

export default Form;
