import React, { useState, useEffect } from 'react';
import './form.scss';



function Form({handleApiCall}){

  let [isFirstMount, setIsFirstMount] = useState(true);
  
  const [method, setMethod] = useState('get');
  const [requestData, setRequestData] = useState({});

  const methodSetter = (method) => {
    setMethod(method);
  }

  useEffect(() => {

    if (isFirstMount) {
      console.log("first mount Form");
      setIsFirstMount(false);
    } else {    
      handleApiCall(requestData);
    }
  }, [requestData]);


  const handleSubmit = e => {
    e.preventDefault();

    setRequestData({
      method: method,
      url: e.target.url.value ? e.target.url.value : '',
      data: e.target.body ? e.target.body.value : {},
    });
  }



  const clickCheck = (spanMethod) => {
    return method === spanMethod ? "buttonTrue": "buttonFalse"
  }


  return (
    <>
      <form data-testid="test-form" onSubmit={handleSubmit}>
        <label method={method} className="methods">
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
        {(method === 'post' || method === 'put') && <label>
            <textarea name="body"></textarea>
          </label>}
      </form>
    </>
  );
}

export default Form;
