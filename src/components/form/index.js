import React, { useState } from 'react';

import './form.scss';

function Form(props){
  
  const [method, setMethod] = useState('get');

  const methodSetter = (method) => {
    setMethod(method);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: e.target.url.value,
      body: e.target.body ? e.target.body.value : '',
    };
    props.handleApiCall(formData);
  }

  const clickCheck = (spanMethod) => {
    return method === spanMethod ? "buttonTrue": "buttonFalse"
  }



    return (
      <>
        <form onSubmit={handleSubmit}>
          <label method={method} className="methods">
            <span id="get"    className={clickCheck('get')}    onClick={() => methodSetter('get')}>GET</span>
            <span id="post"   className={clickCheck('post')}   onClick={() => methodSetter('post')}>POST</span>
            <span id="put"    className={clickCheck('put')}    onClick={() => methodSetter('put')}>PUT</span>
            <span id="delete" className={clickCheck('delete')} onClick={() => methodSetter('delete')}>DELETE</span>
          </label>
          <label >
            <span>URL: </span>
            <input name='url' type='text' />
            <button type="submit">GO!</button>
          </label>
          {(method === 'post' || method === 'put') && <label>
              <textarea name="body"></textarea>
            </label>}
        </form>
      </>
    );
}

export default Form;
