import React, { useState, useEffect } from 'react';


let [isFirstMount, setIsFirstMount] = useState(true);
  
const [method, setMethod] = useState('get');
const [requestData, setRequestData] = useState({});


useEffect(() => {
  
  if (isFirstMount) {
    console.log("first mount Form");
    setIsFirstMount(false);
  } else {    
    handleApiCall(requestData);
  }
}, [requestData]);
