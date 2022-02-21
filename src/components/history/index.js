import React from 'react'
import './history.styles.scss'

export default function History({searchHistory, deleteHistory, showHistory}) {
  
  return (
    <>
      <div id='title'><p>History: </p></div>
      <div id='history-list'>
        <ul>
          {searchHistory.map(history => {
            return (
              <li key={history.id} onClick={() => showHistory(history.id)}>
                  <div id='method'>{history.request.method.toUpperCase()}</div> 
                  <span className='info' id='url'>{history.request.url} </span>
                  <span className='info' id='time'>Time: {history.date.getHours()}:{history.date.getMinutes()}:{history.date.getSeconds().toFixed(2)}</span>
                  <span className='info' id='date'>Date: {history.date.getMonth()}/{history.date.getDate()}/{history.date.getFullYear()}</span>
                  <button onClick={() => deleteHistory(history.id)}>
                    Delete
                  </button>
              </li>
            )
            })}
        </ul>
      </div>
    </>
  )
}

