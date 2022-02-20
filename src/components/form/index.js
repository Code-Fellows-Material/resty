import React, { useReducer } from 'react';
import './form.scss';

//=================================================================================


// Defines reducer actions for consistency 
const ACTIONS = {
  SET_METHOD: 'set_method',
}

// Sets initial State
const initialState = {
  method: 'get',
}

//=================================================================================


//reducer function for useReducer hook
function reducer(state, action){
  switch (action.type) {
    case ACTIONS.SET_METHOD:
      return {...state, method: action.payload.method};
    default:
      return state;
  }
}

//=================================================================================


// Form Component 
function Form({handleApiCall}){

  //State
  const [state, dispatch] = useReducer(reducer, initialState)

  //handle submit of form 
  const handleSubmit = e => {
    e.preventDefault();
    if (!e.target.url.value) return console.log('URL cannot be empty')

    let requestData = {
      method: state.method,
      url: e.target.url.value,
      data: state.method === 'put' || state.method === 'post' ?  e.target.body ? e.target.body.value : {} : {},
    }
      
    handleApiCall(requestData);
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
